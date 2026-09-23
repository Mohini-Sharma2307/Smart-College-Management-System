import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================
// Common Components
// =========================

import LoginSelection from "./components/LoginSelection";
import StudentLogin from "./components/StudentLogin";
import StudentRegistration from "./components/StudentRegistration";
import ProtectedRoute from "./routes/ProtectedRoute";

// =========================
// Student Components
// =========================

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import AdmissionDetails from "./pages/student/AdmissionDetails";
import Subjects from "./pages/student/Subjects";
import ExamTimetable from "./pages/student/ExamTimetable";
import Results from "./pages/student/Results";
import Fees from "./pages/student/Fees";
import Notices from "./pages/student/Notices";
import AdmitCard from "./pages/student/AdmitCard";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentJobs from "./pages/student/StudentJobs";
import MyApplications from "./pages/student/MyApplications";
import CareerProfile from "./pages/student/CareerProfile";
import CareerRecommendation from "./pages/student/CareerRecommendation";

// =========================
// Placement Components
// =========================

import PlacementDashboard from "./pages/placement/PlacementDashboard";
import Companies from "./pages/placement/Companies";
import StudentInterviews from "./pages/placement/StudentInterviews";
import MyOfferLetters from "./pages/placement/MyOfferLetters";
import PlacementRecords from "./pages/placement/PlacementRecords";
import PlacementAnalytics from "./pages/placement/PlacementAnalytics";

// =========================
// Admin Components
// =========================

import AdminLogin from "./components/AdminLogin";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Admissions from "./pages/admin/Admissions";
import FeeManagement from "./pages/admin/FeeManagement";
import ResultManagement from "./pages/admin/ResultManagement";
import ExamManagement from "./pages/admin/ExamManagement";
import NoticeManagement from "./pages/admin/NoticeManagement";
import AdmitCardManagement from "./pages/admin/AdmitCardManagement";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import AssignmentManagement from "./pages/admin/AssignmentManagement";
import AssignmentSubmissions from "./pages/admin/AssignmentSubmissions";
import FeeReceiptManagement from "./pages/admin/FeeReceiptManagement";
import CompanyManagement from "./pages/admin/CompanyManagement";
import JobManagement from "./pages/admin/JobManagement";
import ApplicationManagement from "./pages/admin/ApplicationManagement";
import InterviewManagement from "./pages/admin/InterviewManagement";
import OfferLetterManagement from "./pages/admin/OfferLetterManagement";
import PlacementRecordManagement from "./pages/admin/PlacementRecordManagement";

// IMPORTANT:
// Admin and Student have different PlacementAnalytics components.
// So we use different import names.

import AdminPlacementAnalytics from "./pages/admin/PlacementAnalytics";

// =========================
// Public Components
// =========================

import VerifyAdmitCard from "./pages/VerifyAdmitCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
                    LOGIN SELECTION
                ========================= */}

        <Route path="/" element={<LoginSelection />} />

        {/* =========================
                    STUDENT LOGIN
                ========================= */}

        <Route path="/student-login" element={<StudentLogin />} />

        {/* =========================
                    STUDENT REGISTRATION
                ========================= */}

        <Route path="/register" element={<StudentRegistration />} />

        {/* =========================
                    STUDENT DASHBOARD
                ========================= */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    STUDENT PROFILE
                ========================= */}

        <Route
          path="/student-profile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    ADMISSION DETAILS
                ========================= */}

        <Route
          path="/admission-details"
          element={
            <ProtectedRoute>
              <AdmissionDetails />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    SUBJECTS
                ========================= */}

        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    EXAM TIMETABLE
                ========================= */}

        <Route
          path="/exam-timetable"
          element={
            <ProtectedRoute>
              <ExamTimetable />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    RESULTS
                ========================= */}

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    FEES
                ========================= */}

        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    NOTICES
                ========================= */}

        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <Notices />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    ADMIT CARD
                ========================= */}

        <Route
          path="/admit-card"
          element={
            <ProtectedRoute>
              <AdmitCard />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    STUDENT ATTENDANCE
                ========================= */}

        <Route
          path="/student-attendance"
          element={
            <ProtectedRoute>
              <StudentAttendance />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    STUDENT ASSIGNMENTS
                ========================= */}

        <Route
          path="/student-assignments"
          element={
            <ProtectedRoute>
              <StudentAssignments />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    PLACEMENT PORTAL
                ================================================= */}

        <Route
          path="/placement-dashboard"
          element={
            <ProtectedRoute role="student">
              <PlacementDashboard />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    STUDENT JOBS
                ========================= */}

        <Route
          path="/student-jobs"
          element={
            <ProtectedRoute role="student">
              <StudentJobs />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    MY APPLICATIONS
                ========================= */}

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute role="student">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    CAREER PROFILE
                ========================= */}

        <Route
          path="/career-profile"
          element={
            <ProtectedRoute role="student">
              <CareerProfile />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    CAREER RECOMMENDATION
                ========================= */}

        <Route
          path="/career-recommendation"
          element={
            <ProtectedRoute role="student">
              <CareerRecommendation />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    PLACEMENT COMPANIES
                ========================= */}

        <Route
          path="/placement-companies"
          element={
            <ProtectedRoute role="student">
              <Companies />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    STUDENT INTERVIEWS
                ========================= */}

        <Route
          path="/student-interviews"
          element={
            <ProtectedRoute role="student">
              <StudentInterviews />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    MY OFFER LETTERS
                ========================= */}

        <Route
          path="/my-offer-letters"
          element={
            <ProtectedRoute role="student">
              <MyOfferLetters />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    PLACEMENT RECORDS
                ========================= */}

        <Route
          path="/placement-records"
          element={
            <ProtectedRoute role="student">
              <PlacementRecords />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    STUDENT PLACEMENT ANALYTICS
                ========================= */}

        <Route
          path="/placement-analytics"
          element={
            <ProtectedRoute role="student">
              <PlacementAnalytics />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    ADMIN LOGIN
                ========================= */}

        <Route path="/admin-login" element={<AdminLogin />} />

        {/* =========================
                    ADMIN DASHBOARD
                ========================= */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    STUDENT MANAGEMENT
                ========================= */}

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    ADMISSION MANAGEMENT
                ========================= */}

        <Route
          path="/admissions"
          element={
            <ProtectedRoute>
              <Admissions />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    FEE MANAGEMENT
                ========================= */}

        <Route
          path="/fee-management"
          element={
            <ProtectedRoute>
              <FeeManagement />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    RESULT MANAGEMENT
                ========================= */}

        <Route
          path="/result-management"
          element={
            <ProtectedRoute>
              <ResultManagement />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    EXAM MANAGEMENT
                ========================= */}

        <Route
          path="/exam-management"
          element={
            <ProtectedRoute>
              <ExamManagement />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    NOTICE MANAGEMENT
                ========================= */}

        <Route
          path="/notice-management"
          element={
            <ProtectedRoute>
              <NoticeManagement />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    ADMIT CARD MANAGEMENT
                ========================= */}

        <Route
          path="/admit-card-management"
          element={
            <ProtectedRoute>
              <AdmitCardManagement />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    ATTENDANCE MANAGEMENT
                ========================= */}

        <Route
          path="/attendance-management"
          element={
            <ProtectedRoute>
              <AttendanceManagement />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    ASSIGNMENT MANAGEMENT
                ========================= */}

        <Route
          path="/assignment-management"
          element={
            <ProtectedRoute>
              <AssignmentManagement />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    ASSIGNMENT SUBMISSIONS
                ========================= */}

        <Route
          path="/assignment-submissions"
          element={
            <ProtectedRoute>
              <AssignmentSubmissions />
            </ProtectedRoute>
          }
        />

        {/* =========================
                    FEE RECEIPT MANAGEMENT
                ========================= */}

        <Route
          path="/fee-receipt-management"
          element={
            <ProtectedRoute>
              <FeeReceiptManagement />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    COMPANY MANAGEMENT
                ================================================= */}

        <Route
          path="/company-management"
          element={
            <ProtectedRoute role="admin">
              <CompanyManagement />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    JOB MANAGEMENT
                ================================================= */}

        <Route
          path="/job-management"
          element={
            <ProtectedRoute role="admin">
              <JobManagement />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    APPLICATION MANAGEMENT
                ================================================= */}

        <Route
          path="/application-management"
          element={
            <ProtectedRoute role="admin">
              <ApplicationManagement />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    INTERVIEW MANAGEMENT
                ================================================= */}

        <Route
          path="/interview-management"
          element={
            <ProtectedRoute role="admin">
              <InterviewManagement />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    OFFER LETTER MANAGEMENT
                ================================================= */}

        <Route
          path="/offer-letter-management"
          element={
            <ProtectedRoute role="admin">
              <OfferLetterManagement />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    PLACEMENT RECORD MANAGEMENT
                ================================================= */}

        <Route
          path="/placement-record-management"
          element={
            <ProtectedRoute role="admin">
              <PlacementRecordManagement />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    ADMIN PLACEMENT ANALYTICS
                ================================================= */}

        <Route
          path="/admin-placement-analytics"
          element={
            <ProtectedRoute role="admin">
              <AdminPlacementAnalytics />
            </ProtectedRoute>
          }
        />

        {/* =================================================
                    PUBLIC ADMIT CARD VERIFICATION
                ================================================= */}

        <Route
          path="/verify-admit-card/:verificationCode"
          element={<VerifyAdmitCard />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
