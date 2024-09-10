from fastapi import FastAPI, File, UploadFile, HTTPException, Request, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
import json


app = FastAPI()
size_chart_data = {}
prediction = {}

class FormData(BaseModel):
    age_group: str = "N/A"
    gender: str= "N/A"
    product_type: str =  "N/A"
    product_subtype: str =  "N/A"
    additional_info: str =  "N/A"
    available_sizes: List[str]
    composition: str =  "N/A"
    cut_style: str =  "N/A"
    description: str =  "N/A"
    fabric_type: str =  "N/A"
    fit_type: str =  "N/A"
    season: str =  "N/A"
    stretchable: str =  "N/A"
    collar_type: str =  "N/A"
    sleeve_type: str =  "N/A"
    waist_type: str =  "N/A"
    waterproof: str =  "N/A"

stored_description: Optional[str] = None

# Define the request body schema
class DescriptionRequest(BaseModel):
    regenerate_description: str

orig_prefix = "http://localhost:3000" 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[orig_prefix],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/size_chart")
async def receive_size_chart(request: Request):
    global size_chart_data
    try:
        
        size_chart_data = await request.json()
        print("Received size chart data:", size_chart_data)  # Debug statement
        return {"message": "Size chart received", "data": size_chart_data}
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format"}

@app.post("/predict/form")
async def predict(data: FormData):
    global prediction
    print(data)
    prediction = {
        "age_group": data.age_group,
        "gender": data.gender,
        "product_type": data.product_type,
        "product_subtype": data.product_subtype,
        "additional_info": data.additional_info,
        "available_sizes": data.available_sizes,
        "composition": data.composition,
        "cut_style": data.cut_style,
        "description": data.description,
        "fabric_type": data.fabric_type,
        "fit_type": data.fit_type,
        "season": data.season,
        "stretchable": data.stretchable,
        "collar_type": data.collar_type,
        "sleeve_type": data.sleeve_type,
        "waist_type": data.waist_type,
        "waterproof": data.waterproof
    }
    return {"prediction": prediction}

@app.get("/size_chart")
async def get_size_chart():
    if size_chart_data:
        return size_chart_data
    else:
        return {"error": "No size chart available"}

@app.get("/form_data")
async def get_form_data():
    if prediction:
        return prediction
    else:
        raise HTTPException(status_code=404, detail="No prediction data found")

@app.post("/predict/modify")
async def modify_description(request: DescriptionRequest):
    global stored_description
    try:
        # Extracting the description from the request body
        stored_description = request.regenerate_description
        # Returning the description as response
        return {"modified_description": stored_description}
    except Exception as e:
        # Handling potential errors
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/predict/modify")
async def modify_description_get():
    if stored_description is not None:
        return {"modified_description": stored_description}
    else:
        raise HTTPException(status_code=404, detail="No description found")