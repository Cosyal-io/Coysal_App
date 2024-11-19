import streamlit as st
from langchain_community.chat_models import ChatPerplexity
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import  TavilySearchResults
from pydantic import BaseModel

from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from transformers import AutoTokenizer, AutoModel, pipeline
import random
from langchain.agents import AgentExecutor, Tool
from langgraph.graph import StateGraph, MessageGraph, END, START

import os
import jwt
# from supabase import create_client, Client

load_dotenv('.env')
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
#supabase: Client = create_client(url, key)

from fastapi import HTTPException, FastAPI
from supabase import create_client, Client
from langchain.output_parsers.boolean import BooleanOutputParser

import resend

load_dotenv()

class UserBiodiversityClassificationRequest(BaseModel):
    pdf_file_tokenized: any
    username: str
    class Config:
        arbitrary_types_allowed = True
    

class UserBiodiversityScoreResponse(BaseModel):
    score: int
    jwt_token: str
    boolean_response: bool
    
class UserSessionRequest(BaseModel):
    username: str
    email: str

class UserSessionResponse(BaseModel):
    random_number: int
    jwt_token: str = None
    message: str



fastapi = FastAPI()
openai_api_key = os.getenv("OPENAI_API_KEY")
chatperplexity_api_key = os.getenv("PERPLEXITY_API_KEY")
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
jwt_secret = os.getenv("JWT_SECRET")

# tokenizer = AutoTokenizer.from_pretrained("vikp/surya_rec2")
##model = AutoModel.from_pretrained("vikp/surya_rec2")  

# Initialize  client
client: Client = create_client(supabase_url, supabase_key)

# Initialize Perplexity model
perplexity_model = ChatPerplexity(api_key=chatperplexity_api_key, model="llama-3.1-sonar-small-128k-online")

## openai for the analysis of the given standard models 

## define the agent models 
model = ChatOpenAI(api_key=openai_api_key, model="gpt-4o-mini")


# def extract_descriptions_from_pdf_surya(pdf_file_path, project_name):
#     #fetch the path of the files 
#     temp_file_path = f"/tmp/{pdf_file_path.name}"
#     try:
#         with open(temp_file_path, "wb") as f:
#             f.write(pdf_file_path.getbuffer())
#            # ocr_pipeline = pipeline("pdf-parsing-pipeline", model=model, tokenizer=tokenizer)
#         # Extract text from the PDF using PyPDF2
#         pdf_reader = PyPDF2.PdfReader(temp_file_path)
#         extracted_text = ""
#         for page_num in range(len(pdf_reader.pages)):
#             page = pdf_reader.pages[page_num]
#             page_text = page.extract_text()
#             extracted_text += page_text
#         # Use the OCR pipeline to process the extracted text
#         ocr_results = ocr_pipeline(extracted_text)
#         # Format the OCR results
#         formatted_results = {
#             "project_name": project_name,
#             "ocr_results": ocr_results
#         }
#         # Save the results to a JSON file
#         result_file_path = f"resulting_pdf/{project_name}.json"
#         with open(result_file_path, "w") as f:
#             json.dump(formatted_results, f)

#         return formatted_results
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error extracting descriptions from PDF using Surya OCR: {e}")
            


def generate_jwt_token(username):
    payload = {"username": username}
    token = jwt.encode(payload, jwt_secret, algorithm="HS256")
    return token

def send_email(email, subject, message):
    try:
        # Send an email using the Resend API
        resend.send_email(email, subject, message)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending email: {e}")
    

@fastapi.post("/classify", response_model=UserBiodiversityScoreResponse)
def search_on_perplexity(project_name, pdf_overall_classification, selected_certifications):

    system_prompt = f"""
    You are a Biodiversity expert who is trying to classify whether the investor defined by {project_name} with its proof of biodiversity contributions file with following text: {pdf_overall_classification} (showcasing the companies proof that it is certified from {selected_certifications}) is credible enough for the investment in our project by creating the index (out of 10).
    you will be using also the perplexity tool to fetch the information from the internet to determine whether the company's report information is credible enough , and then compare it with the benchmarks of the given standards in the industry in order to generate the index score

    Your result should be evaluated in order to determine that the 
    Provide only the single numerical score as (result out of 10) , generated as the average of the indivial scores corresponding to the {selected_certifications}.
    """

    human_prompt = f"i need you to generate the biodiversity impact index of the project  {project_name}. (being a number from 1 to 10) , and then generate the output as boolean {False} if the score is less than 5 and {True} if the score is greater than 5"

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

# def classify_biodiversity_impact(project_name, uploaded_file, selected_certifications):
#     st.info("🔍 Fetching simple text details from the PDF")
#     pdf_text_data = extract_text_from_pdf(uploaded_file)
#     if pdf_text_data is None:
#         return 0
    
#     st.info("🔍 Fetching extensive PDF details using Surya OCR")
#     pdf_overall_classification = extract_descriptions_from_pdf_surya(uploaded_file, project_name)
#     if pdf_overall_classification is None:
#         return 0
    
#     # Create a placeholder for streaming updates
#     progress_placeholder = st.empty()
#     progress_placeholder.info("🔍 Starting classification using Perplexity...")

#     score_response = search_on_perplexity(project_name, pdf_overall_classification, selected_certifications)
    
#     if score_response:
#         try:
#             score = int(score_response.strip())
#         except ValueError:
#             st.error("Error parsing the score response from Perplexity.")
#             score = 0
#     else:
#         score = 0
    
#     # Update the placeholder with the final result
#     progress_placeholder.success("✅ Classification completed.")
    
#     return score

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


@fastapi.get("/")
def read_root():
    return {"message": "Welcome to the Biodiversity Impact Classification API"}


@fastapi.post("/generate_session", response_model=UserSessionResponse)
async def generate_session(request: UserSessionRequest):
    # Generate a random number modulo 10
    random_number = random.randint(0, 9)

    if random_number > 6:
        # Generate JWT token
        jwt_token = generate_jwt_token(request.username)

        # Store session in Supabase
        # response = supabase.from_("sessions").insert({
        #     "username": request.username,
        #     "email": request.email,
        #     "jwt_token": jwt_token
        # }).execute()

        # if response.error:
        #     raise HTTPException(status_code=500, detail="Error storing session in Supabase")

        return UserSessionResponse(
            random_number=random_number,
            jwt_token=jwt_token,
            message="User session approved"
        )
    else:
        return UserSessionResponse(
            random_number=random_number,
            message="User session not approved"
        )

# def main():
#     st.title("🌿 Biodiversity Impact Classification 🌿")
#     st.write("Welcome to the Biodiversity Impact Classification tool! 🌍")
#     st.write("Please enter the project name and upload the biodiversity impact report in PDF format. 📄")

#     project_name = st.text_input("Enter Project Name")
#     username = st.text_input("Enter Username")
#     uploaded_file = st.file_uploader("Upload Biodiversity Impact Report (PDF)", type="pdf")
#     ## provide the various certifications defined as the links: 
#     ## EU-CSRD , Science-Based Targets Network (SBTN), Task Force on Climate-related Financial Disclosures (TCFD), 
#     ## Global Reporting Initiative (GRI), Sustainability Accounting Standards Board (SASB),
#     ## International Integrated Reporting Council (IIRC), 
#     ## United Nations Global Compact (UNGC), International Organization for Standardization (ISO).
#     ## global reporting initiative (GRI), International sustainability standards board (ISSB),
#     ## sustainalytics, international financial reporting standards (IFRS), European ESG template (EET), EU taxonomy,
#     ## Dow jones sustainability index (DJSI),  ISO 14001. 
#     certifications = [
#     "EU-CSRD",
#     "Science-Based Targets Network (SBTN)",
#     "Task Force on Climate-related Financial Disclosures (TCFD)",
#     "Global Reporting Initiative (GRI)",
#     "Sustainability Accounting Standards Board (SASB)",
#     "International Integrated Reporting Council (IIRC)",
#     "United Nations Global Compact (UNGC)",
#     "International Organization for Standardization (ISO)",
#     "International Sustainability Standards Board (ISSB)",
#     "Sustainalytics",
#     "International Financial Reporting Standards (IFRS)",
#     "European ESG Template (EET)",
#     "EU Taxonomy",
#     "Dow Jones Sustainability Index (DJSI)",
#     "ISO 14001"
#     ]

#     selected_certifications = st.multiselect("Select Certifications", certifications)
    
#     if st.button("Classify") and project_name and uploaded_file and username:
#         st.info("📄 Extracting text from the uploaded PDF...")
#         pdf_text = extract_text_from_pdf(uploaded_file)
        
#         st.info("🔍 Classifying biodiversity impact...")
#         score = random.randint(1, 10)  # Randomly generate a score for demonstration

#         if score > 5:
#             jwt_token = authenticate_user(username, score)
#             st.success(f"Classification Score of Company Biodiversity: {score} 🎉")
#             st.success(f"JWT Token: {jwt_token}")
#         else:
#             st.error(f"Classification Score of Company Biodiversity: {score} ❌")
#             st.error("Authentication Rejected")

       

#         st.write("Thank you for using the Biodiversity Impact Classification tool! 🌱")

if __name__ == "__main__":
   ## main()
   import uvicorn
   uvicorn.run(fastapi, host="0.0.0.0", port=8000)
   