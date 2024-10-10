import streamlit as st
import langchain
from langchain_community.chat_models import ChatPerplexity

import PyPDF2
import matplotlib.pyplot as plt
from dotenv import load_dotenv

import os
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
chatperplexity_api_key = os.getenv("PERPLEXITY_API_KEY")



# Initialize Perplexity model
perplexity_model = ChatPerplexity(api_key=chatperplexity_api_key)

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
    return text


def classify_biodiversity_impact(project_name, pdf_text):
    # Use Perplexity model to search and correlate information
    st.info("🔍 Searching for relevant information using Perplexity model...")
    search_results = perplexity_model.generate(project_name)
    
    # Log the search results
    st.write("Search Results:", search_results)
    
    # For simplicity, let's assume we get a score from 1 to 10
    # In a real scenario, you would process search_results and pdf_text to derive this score
    score = len(search_results) % 10 + 1
    
    # Log the derived score
    st.write("Derived Score:", score)
    
    return score

def main():
    st.title("🌿 Biodiversity Impact Classification 🌿")

    st.write("Welcome to the Biodiversity Impact Classification tool! 🌍")
    st.write("Please enter the project name and upload the biodiversity impact report in PDF format. 📄")

    project_name = st.text_input("Enter Project Name")
    uploaded_file = st.file_uploader("Upload Biodiversity Impact Report (PDF)", type="pdf")

    if st.button("Classify") and project_name and uploaded_file:
        st.info("📄 Extracting text from the uploaded PDF...")
        pdf_text = extract_text_from_pdf(uploaded_file)
        
        st.info("🔍 Classifying biodiversity impact...")
        score = classify_biodiversity_impact(project_name, pdf_text)

        st.success(f"Classification Score of Company Biodiversity: {score} 🎉")

        # Display bar chart
        fig, ax = plt.subplots()
        ax.barh([project_name], [score], color='green')
        ax.set_xlim(0, 10)
        ax.set_xlabel('Score')
        ax.set_title('Biodiversity Impact Classification')
        st.pyplot(fig)

        st.write("Thank you for using the Biodiversity Impact Classification tool! 🌱")

if __name__ == "__main__":
    main()
    
    