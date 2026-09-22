# 🎓 Smart College Management System

A full-stack college management platform built with **React, Node.js, Express, MongoDB, FastAPI, and Machine Learning**.

The system provides separate **Student** and **Admin** workflows for academics, examinations, fees, attendance, assignments, placements, and AI-powered career recommendations.

---

## 🌐 Live Demo

### Frontend

[Smart College Management System](https://smart-college-management-frontend.onrender.com)

### Backend API

https://smart-college-management-backend.onrender.com

### AI Career Recommendation API

https://smart-college-management-system-ai.onrender.com

### GitHub Repository

[Smart College Management System](https://github.com/Mohini-Sharma2307/Smart-College-Management-System)

---

## ✨ Features

### 🔐 Authentication & Authorization

* Student Registration
* Student Login
* Admin Login
* JWT-based Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access Control

---

### 👨‍🎓 Student Module

The student portal provides a centralized dashboard for managing academic and career-related activities.

* Student Dashboard
* Student Profile
* Admission Details
* Subjects
* Examination Timetable
* Examination Results
* PDF Marksheet
* Fee Details
* Fee Receipts
* Notices
* Admit Card
* Admit Card PDF Download
* Admit Card Verification
* Attendance
* Assignments
* Assignment Submission
* Placement Jobs
* Job Applications
* Interviews
* Offer Letters
* Placement Records
* Career Profile
* AI Career Recommendation

---

### 👨‍💼 Admin Module

The admin portal allows administrators to manage students, academics, examinations, fees, assignments, and placements.

* Admin Dashboard
* Student Management
* Admission Management
* Subject Management
* Examination Management
* Result Management
* Fee Management
* Fee Receipt Management
* Notice Management
* Admit Card Management
* Attendance Management
* Assignment Management
* Assignment Submission Evaluation
* Company Management
* Job Management
* Application Management
* Interview Management
* Offer Letter Management
* Placement Record Management
* Placement Analytics

---

## 🤖 AI Career Recommendation

The project includes a separate **FastAPI-based Machine Learning service** for career recommendations.

The AI service accepts student information such as:

* Skills
* Interests
* CGPA
* Experience
* Career Goal

It returns:

* Predicted Career
* Career Recommendations
* Confidence Percentage

### Example Response

```json
{
  "predictedCareer": "AI / ML Engineer",
  "recommendations": [
    {
      "career": "AI / ML Engineer",
      "confidence": 69.5
    }
  ]
}
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* React Router
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

### AI / Machine Learning

* Python
* FastAPI
* Uvicorn
* Pandas
* Scikit-learn
* Joblib
* Trained Machine Learning Model

### Deployment

* Render
* MongoDB Atlas
* GitHub

---

## 📁 Project Structure

```text
Smart-College-Management-System/
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
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
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
```

---

## 🔄 Application Flow

```text
                    Student / Admin
                           │
                           ▼
                  ┌─────────────────┐
                  │ React Frontend  │
                  └────────┬────────┘
                           │
                           │ HTTP Requests
                           ▼
                  ┌─────────────────┐
                  │ Node + Express  │
                  │    Backend API  │
                  └───────┬─────────┘
                          │
                 ┌────────┴─────────┐
                 ▼                  ▼
        ┌─────────────────┐   ┌──────────────────┐
        │  MongoDB Atlas  │   │ FastAPI AI       │
        │    Database     │   │ Career Service   │
        └─────────────────┘   └──────────────────┘
```

---

## 🔐 Authentication Flow

The application uses **JWT-based authentication** with role-based access.

```text
Student / Admin Login
        ↓
Backend validates credentials
        ↓
JWT token generated
        ↓
Token stored on client
        ↓
Protected API request
        ↓
JWT verification middleware
        ↓
Role verification
        ↓
Authorized data returned
```

---

## 🎓 Student Workflow

```text
Student Registration
        ↓
Student Login
        ↓
Student Dashboard
        ↓
Profile / Admission
        ↓
Subjects & Academics
        ↓
Examination
        ↓
Results / Marksheet
        ↓
Fees / Fee Receipt
        ↓
Attendance
        ↓
Assignments
        ↓
Placements
        ↓
AI Career Recommendation
```

---

## 👨‍💼 Admin Workflow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Student Management
     ↓
Academic Management
     ↓
Examination Management
     ↓
Result Management
     ↓
Fee Management
     ↓
Attendance Management
     ↓
Assignment Management
     ↓
Placement Management
     ↓
Placement Analytics
```

---

## 💼 Placement Management Flow

The placement module manages the complete student placement lifecycle.

```text
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
```

---

## 📄 PDF Features

The system supports PDF generation for important college documents:

* Results / Marksheets
* Admit Cards
* Fee Receipts

---

## 🔌 AI API

### Home

```http
GET /
```

Example response:

```json
{
  "message": "Smart College AI Career Service is running"
}
```

### Career Prediction

```http
POST /predict
```

### Request

```json
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
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Mohini-Sharma2307/Smart-College-Management-System.git

cd Smart-College-Management-System
```

---

### 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend

npm install
```

Create:

```text
frontend/.env
```

For local development:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://smart-college-management-backend.onrender.com
```

Start frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

### 4. AI Service Setup

Open another terminal:

```bash
cd ai-service
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
.\venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the AI service:

```bash
python -m uvicorn main:app --reload --port 8000
```

AI Service:

```text
http://127.0.0.1:8000
```

---

## ☁️ Production Deployment

The project is deployed using **Render** and **MongoDB Atlas**.

### Backend

```text
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

### Frontend

```text
Root Directory: frontend
Build Command: npm run build
Publish Directory: dist
```

Production environment variable:

```env
VITE_API_URL=https://smart-college-management-backend.onrender.com
```

### AI Service

```text
Root Directory: ai-service
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

AI Production URL:

```text
https://smart-college-management-system-ai.onrender.com
```

> **Note:** Render Free services can spin down after inactivity. Because of this, the first request after a period of inactivity may take longer.

---

## 🔒 Security

The application implements several security practices:

* JWT Authentication
* Protected API Routes
* Role-Based Access Control
* Password Hashing using bcrypt
* Environment Variables
* User-specific Database Queries
* Sensitive Configuration Exclusion through `.gitignore`

### Never Commit

```text
.env
.env.*
venv/
.venv/
node_modules/
**/__pycache__/
```

Never publish:

* MongoDB passwords
* JWT secrets
* API keys
* Private credentials

---

## 🗄️ Database

The system uses **MongoDB Atlas** as the cloud database.

The backend uses **Mongoose** for database interaction and schema management.

Application data includes areas such as:

* Students
* Admissions
* Subjects
* Examinations
* Results
* Fees
* Attendance
* Assignments
* Notices
* Companies
* Jobs
* Applications
* Interviews
* Offer Letters
* Placement Records

---

## 📊 Dashboard Highlights

### Student Dashboard

The student dashboard provides access to:

* Profile
* Admission Details
* Subjects
* Examination Timetable
* Results
* Fees
* Attendance
* Assignments
* Notices
* Admit Card
* Placements
* Career Profile
* AI Career Recommendation

### Admin Dashboard

The admin dashboard provides management capabilities for:

* Students
* Admissions
* Subjects
* Examinations
* Results
* Fees
* Attendance
* Assignments
* Notices
* Placements
* Analytics

---

## 🎯 Project Goals

The main goal of the project is to bring common college activities into a centralized digital platform.

The system covers:

* Academic Management
* Student Management
* Examination Management
* Fee Management
* Attendance Management
* Assignment Management
* Notice Management
* Placement Management
* PDF Document Generation
* AI-Based Career Guidance

---

## 🚀 Future Improvements

Planned improvements include:

* Real-time notifications
* Email notifications
* Advanced student analytics
* Advanced placement analytics
* More AI-based recommendations
* Improved search and filtering
* Mobile-friendly improvements
* Additional academic reports
* Advanced admin analytics
* More career prediction models

---

## 🎓 Skills Demonstrated

This project demonstrates practical experience in:

* Full-Stack Web Development
* React Component Architecture
* REST API Development
* JWT Authentication
* Role-Based Authorization
* MongoDB Database Design
* CRUD Operations
* API Integration
* PDF Generation
* Placement Management
* Machine Learning Integration
* FastAPI Development
* Cloud Deployment
* Responsive UI Development

---

## 👩‍💻 Author

**Mohini Sharma**

Bachelor of Engineering
Artificial Intelligence & Machine Learning

### GitHub

https://github.com/Mohini-Sharma2307

### Interests

* MERN Stack Development
* Full Stack Web Development
* Software Engineering
* Artificial Intelligence & Machine Learning

---

## 📌 Project Status

### Production Deployment

* Frontend — ✅ Deployed
* Backend API — ✅ Deployed
* MongoDB Atlas — ✅ Configured
* AI Career Recommendation Service — ✅ Deployed
* Student Module — ✅ Implemented
* Admin Module — ✅ Implemented
* Placement Module — ✅ Implemented
* PDF Features — ✅ Implemented

---

## 📜 Disclaimer

Smart College Management System is an educational and portfolio project developed to demonstrate full-stack web development, database management, machine learning integration, and cloud deployment.

The AI career recommendation feature is intended for educational guidance and should not be considered professional career counseling.


