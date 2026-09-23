# 🎓 Smart College Management System

A full-stack **Smart College Management System** built using **React.js, Node.js, Express.js, MongoDB, FastAPI, and Machine Learning**.

The platform provides separate **Student** and **Admin** workflows for managing academics, examinations, fees, attendance, assignments, placements, notices, documents, and AI-powered career recommendations.

---

## 🌐 Live Demo

### Frontend

👉 https://smart-college-management-frontend.onrender.com/

### Backend API

👉 https://smart-college-management-backend.onrender.com/

### AI Career Recommendation API

👉 https://smart-college-management-system-ai.onrender.com/

### GitHub Repository

👉 https://github.com/Mohini-Sharma2307/Smart-College-Management-System

---

# ✨ Features

## 🔐 Authentication & Authorization

* Student Registration
* Student Login
* Admin Login
* JWT-based Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access Control
* Secure API Authorization

---

# 👨‍🎓 Student Module

The Student Portal provides a centralized dashboard for accessing academic, financial, examination, assignment, placement, and career-related information.

### Academic

* Student Dashboard
* Student Profile
* Admission Details
* Subjects
* Examination Timetable
* Examination Results
* PDF Marksheet

### Fees & Documents

* Fee Details
* Fee Receipts
* Admit Card
* Admit Card PDF Download
* Admit Card Verification

### Attendance & Assignments

* Attendance
* Assignments
* Assignment Submission

### Placement

* Placement Jobs
* Job Applications
* Interviews
* Offer Letters
* Placement Records

### Career

* Career Profile
* AI Career Recommendation

---

# 👨‍💼 Admin Module

The Admin Portal provides centralized management of students, academics, examinations, fees, assignments, and placements.

### Student & Academic Management

* Admin Dashboard
* Student Management
* Admission Management
* Subject Management
* Examination Management
* Result Management

### Fee & Documents

* Fee Management
* Fee Receipt Management
* Admit Card Management

### Academic Activities

* Attendance Management
* Assignment Management
* Assignment Submission Evaluation
* Notice Management

### Placement Management

* Company Management
* Job Management
* Application Management
* Interview Management
* Offer Letter Management
* Placement Record Management
* Placement Analytics

---

# 🤖 AI Career Recommendation

The project includes a separate **FastAPI-based Machine Learning service** for providing career recommendations to students.

The AI service uses student information such as:

* Skills
* Interests
* CGPA
* Experience
* Career Goal

### AI Output

The service provides:

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

# 🛠️ Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* React Router
* Context API

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

## AI / Machine Learning

* Python
* FastAPI
* Uvicorn
* Pandas
* Scikit-learn
* Joblib
* Trained Machine Learning Model

## Database & Deployment

* MongoDB Atlas
* Render
* GitHub

---

# 📁 Project Structure

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

# 🔄 Application Architecture

```text
                 Student / Admin
                       │
                       ▼
              ┌─────────────────┐
              │ React Frontend  │
              └────────┬────────┘
                       │
                  HTTP Requests
                       │
                       ▼
              ┌─────────────────┐
              │ Node + Express  │
              │   Backend API   │
              └───────┬─────────┘
                      │
             ┌────────┴─────────┐
             ▼                  ▼
     ┌─────────────────┐  ┌──────────────────┐
     │  MongoDB Atlas  │  │   FastAPI AI     │
     │    Database     │  │ Career Service   │
     └─────────────────┘  └──────────────────┘
```

---

# 🔐 Authentication Flow

The application uses **JWT-based authentication** and role-based authorization.

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

# 🎓 Student Workflow

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

# 👨‍💼 Admin Workflow

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

# 💼 Placement Management

The placement module manages the student placement lifecycle from companies and jobs to applications, interviews, and offers.

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

# 📄 PDF Features

The system supports PDF generation for important college documents:

* Result / Marksheet
* Admit Card
* Fee Receipt

---

# 🔌 AI API

## Health Check

```http
GET /
```

Example response:

```json
{
  "message": "Smart College AI Career Service is running"
}
```

## Career Prediction

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

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Mohini-Sharma2307/Smart-College-Management-System.git

cd Smart-College-Management-System
```

---

## 2. Backend Setup

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

## 3. Frontend Setup

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

## 4. AI Service Setup

Open another terminal:

```bash
cd ai-service
```

### Create Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate:

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

# ☁️ Production Deployment

The project is deployed using **Render** with **MongoDB Atlas**.

## Backend

```text
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

## Frontend

```text
Root Directory: frontend
Build Command: npm run build
Publish Directory: dist
```

Production environment variable:

```env
VITE_API_URL=https://smart-college-management-backend.onrender.com
```

## AI Service

```text
Root Directory: ai-service
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

AI Production URL:

```text
https://smart-college-management-system-ai.onrender.com
```

> **Note:** Render Free services can spin down after inactivity, so the first request after a period of inactivity may take longer.

---

# 🔒 Security

The application implements several security practices:

* JWT Authentication
* Protected API Routes
* Role-Based Access Control
* Password Hashing using bcrypt
* Environment Variables
* User-specific Database Queries
* Sensitive Configuration excluded through `.gitignore`

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

# 🗄️ Database

The system uses **MongoDB Atlas** as the cloud database.

The backend uses **Mongoose** for database interaction and schema management.

Application data includes:

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

# 📊 Dashboard Highlights

## Student Dashboard

Students can access:

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

## Admin Dashboard

Administrators can manage:

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

# 🎯 Project Goals

The main goal of this project is to bring common college activities into a centralized digital platform.

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

# 🚀 Future Improvements

Planned improvements include:

* Real-time Notifications
* Email Notifications
* Advanced Student Analytics
* Advanced Placement Analytics
* More AI-based Recommendations
* Improved Search and Filtering
* Mobile-Friendly Improvements
* Additional Academic Reports
* Advanced Admin Analytics
* Additional Career Prediction Models

---

# 🎓 Skills Demonstrated

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

# 👩‍💻 Author

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

# 📌 Project Status

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

# 📜 Disclaimer

Smart College Management System is an educational and portfolio project developed to demonstrate full-stack web development, database management, machine learning integration, and cloud deployment.

The AI career recommendation feature is intended for educational guidance and should not be considered professional career counseling.
