import streamlit as st
import langchain
from langchain_community.chat_models import ChatPerplexity
from langchain.prompts import ChatPromptTemplate
from pydantic import BaseModel
from subprocess import check_call
import PyPDF2
import matplotlib.pyplot as plt
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModel, pipeline
import json
import os
import jwt
from supabase import create_client, Client

import random

tokenizer = AutoTokenizer.from_pretrained("vikp/surya_rec2")
model = AutoModel.from_pretrained("vikp/surya_rec2")  

class BiodiversityImpactClassificationRequest(BaseModel):
    project_name: str
    pdf_file: str
    username: str

class BiodiversityImpactClassificationResponse(BaseModel):
    score: int
    jwt_token: str

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
chatperplexity_api_key = os.getenv("PERPLEXITY_API_KEY")
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
jwt_secret = os.getenv("JWT_SECRET")

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

# Initialize Perplexity model
perplexity_model = ChatPerplexity(api_key=chatperplexity_api_key, model="llama-3.1-sonar-small-128k-online")

def extract_text_from_pdf(pdf_file):
    # Mocked PDF extraction

   ## st.info("Mock: Extracting text from PDF...")
    return None

def extract_descriptions_from_pdf_surya(pdf_file_path, project_name):
    # Mocked Surya OCR extraction using the transformers model: 
    temp_file_path = f"/tmp/{pdf_file_path.name}"
    try:
        with open(temp_file_path, "wb") as f:
            f.write(pdf_file_path.getbuffer())
            ocr_pipeline = pipeline("token-classification", model=model, tokenizer=tokenizer)

        # Extract text from the PDF using PyPDF2
        pdf_reader = PyPDF2.PdfReader(temp_file_path)
        extracted_text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            page_text = page.extract_text()
            extracted_text += page_text

        # Use the OCR pipeline to process the extracted text
        ocr_results = ocr_pipeline(extracted_text)

        # Format the OCR results
        formatted_results = {
            "project_name": project_name,
            "ocr_results": ocr_results
        }

        # Save the results to a JSON file
        result_file_path = f"resulting_pdf/{project_name}.json"
        with open(result_file_path, "w") as f:
            json.dump(formatted_results, f)

        return formatted_results
    except Exception as e:
        st.error(f"Error extracting descriptions from PDF using Surya OCR: {e}")
        return None
    

def search_on_perplexity(project_name, pdf_overall_classification, selected_certifications):
    chat_prompt_template = ChatPromptTemplate.from_messages(
    [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": human_prompt}
    ]
)
    try:
        prompt_data = {
            "project_name": project_name,
            "pdf_overall_classification": pdf_overall_classification,
            "selected_certifications": selected_certifications
        }
        formatted_prompt = chat_prompt_template.format(prompt_data)
        response = perplexity_model.run(formatted_prompt)
        return response
    except Exception as e:
        st.error(f"Error searching on Perplexity: {e}")
        return None    

def classify_biodiversity_impact(project_name, uploaded_file, selected_certifications):
    st.info("🔍 Fetching simple text details from the PDF")
    pdf_text_data = extract_text_from_pdf(uploaded_file)
    if pdf_text_data is None:
        return 0
    
    st.info("🔍 Fetching extensive PDF details using Surya OCR")
    pdf_overall_classification = extract_descriptions_from_pdf_surya(uploaded_file, project_name)
    if pdf_overall_classification is None:
        return 0
    
    # Create a placeholder for streaming updates
    progress_placeholder = st.empty()
    progress_placeholder.info("🔍 Starting classification using Perplexity...")

    score_response = search_on_perplexity(project_name, pdf_overall_classification, selected_certifications)
    
    if score_response:
        try:
            score = int(score_response.strip())
        except ValueError:
            st.error("Error parsing the score response from Perplexity.")
            score = 0
    else:
        score = 0
    
    # Update the placeholder with the final result
    progress_placeholder.success("✅ Classification completed.")
    
    return score

def generate_jwt_token(username):
    payload = {"username": username}
    token = jwt.encode(payload, jwt_secret, algorithm="HS256")
    return token

def authenticate_user(username, score):
    if score > 5:
        jwt_token = generate_jwt_token(username)
        return jwt_token
    else:
        return None

def main():
    st.title("🌿 Biodiversity Impact Classification 🌿")
    st.write("Welcome to the Biodiversity Impact Classification tool! 🌍")
    st.write("Please enter the project name and upload the biodiversity impact report in PDF format. 📄")

    project_name = st.text_input("Enter Project Name")
    username = st.text_input("Enter Username")
    uploaded_file = st.file_uploader("Upload Biodiversity Impact Report (PDF)", type="pdf")
    ## provide the various certifications defined as the links: 
    ## EU-CSRD , Science-Based Targets Network (SBTN), Task Force on Climate-related Financial Disclosures (TCFD), 
    ## Global Reporting Initiative (GRI), Sustainability Accounting Standards Board (SASB),
    ## International Integrated Reporting Council (IIRC), 
    ## United Nations Global Compact (UNGC), International Organization for Standardization (ISO).
    ## global reporting initiative (GRI), International sustainability standards board (ISSB),
    ## sustainalytics, international financial reporting standards (IFRS), European ESG template (EET), EU taxonomy,
    ## Dow jones sustainability index (DJSI),  ISO 14001. 
    certifications = [
    "EU-CSRD",
    "Science-Based Targets Network (SBTN)",
    "Task Force on Climate-related Financial Disclosures (TCFD)",
    "Global Reporting Initiative (GRI)",
    "Sustainability Accounting Standards Board (SASB)",
    "International Integrated Reporting Council (IIRC)",
    "United Nations Global Compact (UNGC)",
    "International Organization for Standardization (ISO)",
    "International Sustainability Standards Board (ISSB)",
    "Sustainalytics",
    "International Financial Reporting Standards (IFRS)",
    "European ESG Template (EET)",
    "EU Taxonomy",
    "Dow Jones Sustainability Index (DJSI)",
    "ISO 14001"
    ]

    selected_certifications = st.multiselect("Select Certifications", certifications)
    
    if st.button("Classify") and project_name and uploaded_file and username:
        st.info("📄 Extracting text from the uploaded PDF...")
        pdf_text = extract_text_from_pdf(uploaded_file)
        
        st.info("🔍 Classifying biodiversity impact...")
        score = random.randint(1, 10)  # Randomly generate a score for demonstration

        if score > 5:
            jwt_token = authenticate_user(username, score)
            st.success(f"Classification Score of Company Biodiversity: {score} 🎉")
            st.success(f"JWT Token: {jwt_token}")
        else:
            st.error(f"Classification Score of Company Biodiversity: {score} ❌")
            st.error("Authentication Rejected")

       

        st.write("Thank you for using the Biodiversity Impact Classification tool! 🌱")

if __name__ == "__main__":
    main()