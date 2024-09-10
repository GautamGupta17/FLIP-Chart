import pandas as pd
import os
import hashlib
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OllamaEmbeddings
from langchain_core.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate
from langchain_groq import ChatGroq
import pickle
import requests
import json
import time

def process_output_to_json(raw_output):
    output = raw_output.replace("'", "\"")
    try:
        return json.loads(output)
    except json.JSONDecodeError as e:
        print("Error decoding JSON:", e)
        return None

load_dotenv()
data = pd.read_csv('Database/combined.csv')
embedding = OllamaEmbeddings(model='mxbai-embed-large', show_progress=True)
vectorstore = FAISS.load_local("faiss_vectorstore", embedding, allow_dangerous_deserialization=True)

get_form_url = "http://127.0.0.1:8000/form_data"
get_modify_url = "http://127.0.0.1:8000/predict/modify"
post_url = "http://127.0.0.1:8000/size_chart"


llm = ChatGroq(model="llama-3.1-70b-versatile", temperature=0)

example_prompt = ChatPromptTemplate.from_messages(
    [
        ("human", "{description}"),
        ("ai", "{chart}"),
    ]
)

system = """You are an expert at generating size chart for a json which inlcudes product details.

Respond only as JSON based on size chart schema mentioned in examples below,, while enclosing key and value in double quotes "". 
Follow JSON schema but for the sizes and do not add extra fields. 
"""

conversation_history = []

def hash_data(data):
    """Generate an MD5 hash for the given data."""
    return hashlib.md5(json.dumps(data, sort_keys=True).encode()).hexdigest()

# Initial data hash
last_form_data_hash = None
last_modified_description_hash = None

# Main loop to continuously process data
while True:
    response = requests.get(get_form_url)
    if response.status_code == 200:
        form_data = response.json()
        current_form_data_hash = hash_data(form_data)

        # Get modified description from another endpoint
        modify_response = requests.get(get_modify_url)
        modified_description = ""
        if modify_response.status_code == 200:
            modified_description = modify_response.json().get("modified_description", "")
        current_modified_description_hash = hash_data(modified_description)
        
        # Combine both hashes for comparison
        combined_hash = hashlib.md5((current_form_data_hash + current_modified_description_hash).encode()).hexdigest()

        # Skip processing if the combined hash hasn't changed
        if (last_form_data_hash == current_form_data_hash and
            last_modified_description_hash == current_modified_description_hash):
            print("No new form data or modifications. Skipping processing.")
        else:
            # Update the last hashes
            last_form_data_hash = current_form_data_hash
            last_modified_description_hash = current_modified_description_hash

            query = json.dumps(form_data) + " " + modified_description
        
        # Perform similarity search using vectorstore
        res = vectorstore.similarity_search(query, k=10)

        routing_examples = []

        for i in res:
            var = i.metadata['id']
            routing_examples.append({
                "description": data[['product_description', 'rating', 'rating_count', 'review_inference', 'brand_name']].iloc[var].to_dict(),
                "chart": data['size_chart'].iloc[var]
            })

        few_shot_prompt = FewShotChatMessagePromptTemplate(
            example_prompt=example_prompt,
            examples=routing_examples,
        )

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system),
                few_shot_prompt,
                ("human", "{description}"),
            ]
        )

        question_router = prompt | llm

        response = question_router.invoke({"description": query})

        # Process the LLM response

        generated_size_chart = process_output_to_json(response.content)
        if generated_size_chart:
            chart_data = json.dumps(generated_size_chart, indent=4)
            print("Generated Size Chart:", chart_data)

            # Send the generated size chart to the POST endpoint
            post_response = requests.post(post_url, json=generated_size_chart)
            print("POST Response:", post_response.json())

    # Wait before fetching new data
    time.sleep(30)