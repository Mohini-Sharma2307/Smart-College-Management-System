import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier

import joblib


# ==========================================
# LOAD DATASET
# ==========================================

data = pd.read_csv("data/career_data.csv")

print("Dataset loaded successfully.")
print("Total records:", len(data))


# ==========================================
# PREPARE TEXT DATA
# ==========================================

data["profile_text"] = (
    data["skills"].fillna("")
    + " "
    + data["interests"].fillna("")
    + " "
    + data["career_goal"].fillna("")
)


# ==========================================
# FEATURES
# ==========================================

X = data[
    [
        "profile_text",
        "cgpa",
        "experience"
    ]
]

y = data["career_role"]


# ==========================================
# PREPROCESSING
# ==========================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "text",
            TfidfVectorizer(
                lowercase=True,
                ngram_range=(1, 2)
            ),
            "profile_text"
        ),

        (
            "experience",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            ["experience"]
        )
    ],
    remainder="passthrough"
)


# ==========================================
# ML MODEL
# ==========================================

model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),

        (
            "classifier",
            RandomForestClassifier(
                n_estimators=200,
                random_state=42
            )
        )
    ]
)


# ==========================================
# TRAIN MODEL
# ==========================================

model.fit(X, y)

print("ML model trained successfully.")


# ==========================================
# SAVE MODEL
# ==========================================

joblib.dump(
    model,
    "career_model.pkl"
)

print("Model saved as career_model.pkl")