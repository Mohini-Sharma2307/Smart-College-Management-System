Smart College Management System

A full-stack college management platform built with React, Node.js, Express, MongoDB, FastAPI, and Machine Learning.

The system provides separate student and admin workflows for academics, examinations, fees, attendance, assignments, placements, and AI-powered career recommendations.

🚀 Live Services

Backend API

https://smart-college-management-backend.onrender.com

AI Career Recommendation API

https://smart-college-management-system-ai.onrender.com

GitHub Repository

https://github.com/Mohini-Sharma2307/Smart-College-Management-System

The frontend is deployed separately as a Render Static Site.

✨ Main Features

🔐 Authentication & Authorization

Student registration

Student login

Admin login

JWT authentication

Password hashing with bcrypt

Protected routes

Role-based access

👨‍🎓 Student Module

Student dashboard

Student profile

Admission details

Subjects

Examination timetable

Results

PDF marksheet

Fees

Fee receipts

Notices

Admit card

Admit card PDF download

Admit card verification

Attendance

Assignments

Assignment submissions

Placement jobs

Job applications

Interviews

Offer letters

Placement records

Career profile

AI career recommendation

👨‍💼 Admin Module

Admin dashboard

Student management

Admission management

Subject management

Examination management

Result management

Fee management

Fee receipt management

Notice management

Admit card management

Attendance management

Assignment management

Assignment submission evaluation

Company management

Job management

Application management

Interview management

Offer letter management

Placement record management

Placement analytics

🤖 AI Career Recommendation

The project includes a separate FastAPI-based ML service.

The service accepts:

Skills

Interests

CGPA

Experience

Career goal

It returns:

Predicted career

Career recommendations

Confidence percentages

Example prediction:

{
  "predictedCareer": "AI / ML Engineer",
  "recommendations": [
    {
      "career": "AI / ML Engineer",
      "confidence": 69.5
    }
  ]
}

🛠️ Technology Stack

Frontend

React.js

Vite

JavaScript

HTML5

CSS3

React Router

Context API

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcryptjs

CORS

dotenv

AI Service

Python

FastAPI

Uvicorn

Pandas

Scikit-learn

Joblib

Trained ML model

Deployment

Render

MongoDB Atlas

GitHub

📁 Project Structure

Smart College Management System/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── config/
│   │   └── api.js
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── ai-service/
│   ├── career_model.pkl
│   ├── main.py
│   ├── train_model.py
│   ├── requirements.txt
│   └── venv/
│
├── .gitignore
└── README.md

⚙️ Local Setup

1. Clone Repository

git clone https://github.com/Mohini-Sharma2307/Smart-College-Management-System.git
cd Smart-College-Management-System

🔵 Backend Setup

cd backend
npm install

Create:

backend/.env

Add your own MongoDB and JWT configuration.

Example:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Start backend:

node server.js

Backend:

http://localhost:5000

🟢 Frontend Setup

Open another terminal:

cd frontend
npm install

Create:

frontend/.env

For local development:

VITE_API_URL=http://localhost:5000

For production:

VITE_API_URL=https://smart-college-management-backend.onrender.com

Start frontend:

npm run dev

Frontend:

http://localhost:5173

🤖 AI Service Setup

Open another terminal:

cd ai-service

Create and activate virtual environment:

Windows

python -m venv venv
.\venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start AI service:

python -m uvicorn main:app --reload --port 8000

AI service:

http://127.0.0.1:8000

🔌 AI API

Home

GET /

Response:

{
  "message": "Smart College AI Career Service is running"
}

Career Prediction

POST /predict

Request:

{
  "skills": [
    "Python",
    "Machine Learning"
  ],
  "interests": [
    "Artificial Intelligence",
    "Data Science"
  ],
  "cgpa": 8.12,
  "experience": "Fresher",
  "career_goal": "AI Engineer"
}

🌐 Production Architecture

                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      Render         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node + Express API  │
                    │      Render         │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌─────────────────┐       ┌─────────────────────┐
        │ MongoDB Atlas   │       │ FastAPI AI Service  │
        │    Database     │       │       Render        │
        └─────────────────┘       └─────────────────────┘

☁️ Render Deployment

Backend

Root Directory: backend
Build Command: npm install
Start Command: node server.js

Frontend

Root Directory: frontend
Build Command: npm run build
Publish Directory: dist

Production environment variable:

VITE_API_URL=https://smart-college-management-backend.onrender.com

AI Service

Root Directory: ai-service
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT

AI production URL:

https://smart-college-management-system-ai.onrender.com

Render Free services can spin down after inactivity, so the first request after inactivity may take longer.

🔒 Security

Sensitive configuration files are excluded from Git using .gitignore.

Do not commit:

.env
.env.*
venv/
.venv/
node_modules/
__pycache__/

Never publish:

MongoDB passwords

JWT secrets

API keys

Private credentials

📄 PDF Features

The system supports PDF generation for:

Results / marksheets

Admit cards

Fee receipts

📊 Placement Management

The placement module supports:

Companies
    ↓
Jobs
    ↓
Student Applications
    ↓
Interviews
    ↓
Offer Letters
    ↓
Placement Records
    ↓
Placement Analytics

🎯 Project Goals

The system is designed to bring common college activities into one platform:

Academic management

Student management

Examination management

Fee management

Attendance management

Assignment management

Notice management

Placement management

AI-based career guidance

👩‍💻 Author

Mohini Sharma

Bachelor of Engineering
Artificial Intelligence & Machine Learning

GitHub:
https://github.com/Mohini-Sharma2307

📌 Project Status

Production deployment completed for:

Frontend ✅

Backend ✅

MongoDB Atlas ✅

AI Career Recommendation Service ✅

