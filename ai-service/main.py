from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib


# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI(
    title="Smart College AI Career Service",
    description="ML based career recommendation API",
    version="1.0.0"
)


# ==========================================
# LOAD TRAINED MODEL
# ==========================================

model = joblib.load("career_model.pkl")

print("Career ML model loaded successfully.")


# ==========================================
# REQUEST DATA
# ==========================================

class CareerRequest(BaseModel):
    skills: list[str] = []
    interests: list[str] = []
    cgpa: float = 0
    experience: str = "Fresher"
    career_goal: str = ""


# ==========================================
# HOME ROUTE
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Smart College AI Career Service is running"
    }


# ==========================================
# CAREER PREDICTION
# ==========================================

@app.post("/predict")
def predict_career(data: CareerRequest):

    profile_text = (
        " ".join(data.skills)
        + " "
        + " ".join(data.interests)
        + " "
        + data.career_goal
    )

    input_data = pd.DataFrame(
        [
            {
                "profile_text": profile_text,
                "cgpa": data.cgpa,
                "experience": data.experience
            }
        ]
    )

    prediction = model.predict(input_data)[0]

    # Get prediction probabilities
    probabilities = model.predict_proba(input_data)[0]

    classes = model.classes_

    recommendations = []

    for career, probability in zip(classes, probabilities):
        recommendations.append(
            {
                "career": career,
                "confidence": round(
                    float(probability) * 100,
                    2
                )
            }
        )

    recommendations.sort(
        key=lambda x: x["confidence"],
        reverse=True
    )

    return {
        "predictedCareer": prediction,
        "recommendations": recommendations
    }