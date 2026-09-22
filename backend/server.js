const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");
const feeRoutes = require("./routes/feeRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const admitCardRoutes = require("./routes/admitCardRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const assignmentSubmissionRoutes = require("./routes/assignmentSubmissionRoutes");
const feeReceiptRoutes = require("./routes/feeReceiptRoutes");

const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const offerLetterRoutes = require("./routes/offerLetterRoutes");
const placementRecordRoutes = require("./routes/placementRecordRoutes");
const placementAnalyticsRoutes =
    require("./routes/placementAnalyticsRoutes");
const careerProfileRoutes =
    require("./routes/careerProfileRoutes");
const careerRecommendationRoutes =
    require("./routes/careerRecommendationRoutes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// Uploaded assignment files ko browser se access karne ke liye
app.use("/uploads", express.static("uploads"));

// ==========================================
// AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

// ==========================================
// STUDENT ROUTES
// ==========================================

app.use("/api/students", studentRoutes);

// ==========================================
// ADMISSION ROUTES
// ==========================================

app.use("/api/admissions", admissionRoutes);

// ==========================================
// SUBJECT ROUTES
// ==========================================

app.use("/api/subjects", subjectRoutes);

// ==========================================
// EXAM ROUTES
// ==========================================

app.use("/api/exams", examRoutes);

// ==========================================
// RESULT ROUTES
// ==========================================

app.use("/api/results", resultRoutes);

// ==========================================
// FEE ROUTES
// ==========================================

app.use("/api/fees", feeRoutes);

// ==========================================
// NOTICE ROUTES
// ==========================================

app.use("/api/notices", noticeRoutes);

// ==========================================
// ADMIT CARD ROUTES
// ==========================================

app.use("/api/admit-cards", admitCardRoutes);

// ==========================================
// ATTENDANCE ROUTES
// ==========================================

app.use("/api/attendance", attendanceRoutes);

// ==========================================
// ASSIGNMENT ROUTES
// ==========================================

app.use("/api/assignments", assignmentRoutes);

// ==========================================
// ASSIGNMENT SUBMISSION ROUTES
// ==========================================

app.use("/api/assignment-submissions", assignmentSubmissionRoutes);

app.use("/api/fee-receipts", feeReceiptRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/offer-letters", offerLetterRoutes);

app.use("/api/placement-records", placementRecordRoutes);
app.use(
    "/api/placement-analytics",
    placementAnalyticsRoutes
);
app.use(
    "/api/career-profile",
    careerProfileRoutes
);
app.use(
    "/api/career-recommendations",
    careerRecommendationRoutes
);


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.send("Smart College Management System API is running...");
});

// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
