from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from pathlib import Path


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

BASE_DIR = Path(__file__).resolve().parent

model = joblib.load(
    BASE_DIR / "career_model.pkl"
)

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

    # ==========================================
    # PREDICT CAREER
    # ==========================================

    prediction = model.predict(input_data)[0]

    # ==========================================
    # GET PREDICTION PROBABILITIES
    # ==========================================

    probabilities = model.predict_proba(input_data)[0]

    classes = model.classes_

    recommendations = []

    for career, probability in zip(
        classes,
        probabilities
    ):

        recommendations.append(
            {
                "career": career,
                "confidence": round(
                    float(probability) * 100,
                    2
                )
            }
        )

    # ==========================================
    # SORT RECOMMENDATIONS
    # ==========================================

    recommendations.sort(
        key=lambda x: x["confidence"],
        reverse=True
    )

    # ==========================================
    # RESPONSE
    # ==========================================

    return {
        "predictedCareer": prediction,
        "recommendations": recommendations
    }