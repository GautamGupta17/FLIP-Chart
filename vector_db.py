import os
import pandas as pd
from langchain.vectorstores import FAISS
from langchain.embeddings import OllamaEmbeddings
from langchain.documents import Document
from dotenv import load_dotenv

def main():
    # Load environment variables
    load_dotenv()

    # Load and prepare the data
    data = pd.read_csv('Data/combined.csv')
    text = data['product_description'] + data['article_attributes']
    documents = [Document(page_content=tex, metadata={"id": i}) for i, tex in enumerate(text.to_list())]

    # Generate embeddings
    embedding = OllamaEmbeddings(model='mxbai-embed-large', show_progress=True)

    # Create FAISS vectorstore
    vectorstore = FAISS.from_documents(documents, embedding)

    # Save vectorstore locally
    vectorstore.save_local("faiss_vectorstore")

if __name__ == "__main__":
    main()