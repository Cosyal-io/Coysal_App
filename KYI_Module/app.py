import streamlit as st
import langchain
from langchain_community.chat_models import ChatPerplexity
from langchain.prompts import ChatPromptTemplate
from pydantic import BaseModel
from subprocess import check_call
import PyPDF2
import matplotlib.pyplot as plt
from dotenv import load_dotenv
import json
import os
import jwt
from supabase import create_client, Client

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
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
    return text

def extract_descriptions_from_pdf_surya(pdf_file_path, project_name):
    try: 
        check_call(["surya_ocr", pdf_file_path, "--langs", "en,fr", "--results", f"resulting_pdf/{project_name}.json"])
        with open(f"resulting_pdf/{project_name}.json", "r") as f:
            data = json.load(f)
            return data 
    except Exception as e:
        print(e)
        return None 

def search_on_perplexity(human_prompt, system_prompt):
    prompt_template = ChatPromptTemplate.from_messages([
               {"role": "system", "content": system_prompt},
        {"role": "user", "content": human_prompt}
 
        ])
    chain = perplexity_model | prompt_template
    try:
        response = chain.invoke(input="Run this pipeline in order to find the impact score")
        return response
    except Exception as e:
        print(e)
        return None

def classify_biodiversity_impact(project_name, pdf_file, selected_certifications):
    st.info("🔍 Fetching simple text details from the PDF")
    # pdf_text_data = extract_text_from_pdf(pdf_file)
    
    st.info("🔍 Fetching extensive PDF details using Surya OCR")
    pdf_overall_classification = extract_text_from_pdf(pdf_file)
    
    system_prompt = f"""
    You are a Biodiversity expert who is trying to classify whether the investor defined by {project_name} with its proof of biodiversity contributions file with following text: {pdf_overall_classification} (showcasing the companies proof that it is certified from {selected_certifications}) is credible enough for the investment in our project by creating the index (out of 10).
    you will be using also the perplexity tool to fetch the information from the internet to determine whether the company's report information is credible enough , and then compare it with the benchmarks of the given standards in the industry in order to generate the index score

    Your result should be evaluated in order to determine that the 
    Provide only the single numerical score as (result out of 10) , generated as the average of the indivial scores corresponding to the {selected_certifications}.
    """
    
    human_prompt = f"Classify the biodiversity impact for the project {project_name}."
    
    # Create a placeholder for streaming updates
    progress_placeholder = st.empty()
    progress_placeholder.info("🔍 Starting classification using Perplexity...")

    score_response = search_on_perplexity(human_prompt, system_prompt)
    
    if score_response:
        try:
            score = int(score_response.strip())
        except ValueError:
            score = 0
    else:
        score = 0
    
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
       ## pdf_text = extract_text_from_pdf(uploaded_file)
        
        st.info("🔍 Classifying biodiversity impact...")
        score = classify_biodiversity_impact(project_name, uploaded_file, selected_certifications)

        if score > 5:
            jwt_token = authenticate_user(username, score)
            st.success(f"Classification Score of Company Biodiversity: {score} 🎉")
            st.success(f"JWT Token: {jwt_token}")
        else:
            st.error(f"Classification Score of Company Biodiversity: {score} ❌")
            st.error("Authentication Rejected")

        fig, ax = plt.subplots()
        ax.barh([project_name], [score], color='green')
        ax.set_xlim(0, 10)
        ax.set_xlabel('Score')
        ax.set_title('Biodiversity Impact Classification')
        st.pyplot(fig)

        st.write("Thank you for using the Biodiversity Impact Classification tool! 🌱")

if __name__ == "__main__":
    main()