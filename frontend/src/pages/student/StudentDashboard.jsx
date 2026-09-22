
import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [attendance, setAttendance] = useState(null);

  // =========================
  // Fetch Attendance
  // =========================
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/attendance/my-attendance/summary",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (response.ok) {
          setAttendance(data.overall);
        }
      } catch (error) {
        console.error("Attendance fetch error:", error);
      }
    };

    if (token) {
      fetchAttendance();
    }
  }, [token]);

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      {/* =========================
          Sidebar
      ========================= */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-box">
            {/* SC */}
            <img
              src="https://play-lh.googleusercontent.com/v5K9HtnaVZmvH-iSr6jvmitTFbIFgiVnRus46PBU8iY8v3GSm9LweehYHea8oQ4wA39JXyF6LBxEcCPO7gC_pQ"
              alt="logo"
            />
            </div>

          <div>
            <h2>Smart College</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <a className="active">
            <span>🏠</span>
            Dashboard
          </a>

          <a href="/student-profile">
            <span>👤</span>
            My Profile
          </a>

          <a href="/admission-details">
            <span>🎓</span>
            Admission Details
          </a>

          <a href="/subjects">
            <span>📚</span>
            Subjects
          </a>

          <a href="/exam-timetable">
            <span>📝</span>
            Exam Timetable
          </a>

          <a href="/results">
            <span>📊</span>
            Results
          </a>

          <a href="/fees">
            <span>💰</span>
            Fees
          </a>

          <a href="/notices">
            <span>📢</span>
            Notices
          </a>

          <a href="/admit-card">
            <span>🎫</span>
            Admit Card
          </a>

          {/* =========================
              Attendance
          ========================= */}
          <a href="/student-attendance">
            <span>📋</span>
            Attendance
          </a>

          {/* =========================
              Assignments
          ========================= */}
          <a href="/student-assignments">
            <span>📝</span>
            Assignments
          </a>

          {/* =========================
              PLACEMENT PORTAL
          ========================= */}

          <a href="/placement-dashboard">
            <span>🚀</span>
            Placement Portal
          </a>

        </nav>

        {/* =========================
            Logout
        ========================= */}
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* =========================
          Main Content
      ========================= */}
      <main className="dashboard-main">
        {/* =========================
            Header
        ========================= */}
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>

            <p>Welcome back to your student portal.</p>
          </div>

          <div className="student-info">
            <div className="student-avatar">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user?.fullName}</strong>

              <span>Student</span>
            </div>
          </div>
        </header>

        {/* =========================
            Welcome Card
        ========================= */}
        <section className="welcome-card">
          <div>
            <span className="welcome-label">STUDENT PORTAL</span>

            <h2>Hello, {user?.fullName} 👋</h2>

            <p>
              Manage your academic information, examination details and
              college activities from one place.
            </p>
          </div>

          <div className="welcome-icon">🎓</div>
        </section>

        {/* =========================
            Stats
        ========================= */}
        <section className="stats-grid">
          {/* Subjects */}
          <div className="stat-card">
            <div className="stat-icon blue">📚</div>

            <div>
              <span>Subjects</span>

              <h3>6</h3>
            </div>
          </div>

          {/* Attendance */}
          <div
            className="stat-card"
            onClick={() => {
              window.location.href = "/student-attendance";
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <div className="stat-icon green">📊</div>

            <div>
              <span>Attendance</span>

              <h3>
                {attendance
                  ? `${attendance.percentage}%`
                  : "--"}
              </h3>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="stat-card">
            <div className="stat-icon orange">📝</div>

            <div>
              <span>Upcoming Exams</span>

              <h3>2</h3>
            </div>
          </div>

          {/* Fee Status */}
          <div className="stat-card">
            <div className="stat-icon purple">💰</div>

            <div>
              <span>Fee Status</span>

              <h3>Paid</h3>
            </div>
          </div>
        </section>

        {/* =========================
            Bottom Cards
        ========================= */}
        <section className="dashboard-grid">
          {/* Exams */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Upcoming Exams</h3>

              <span>View All</span>
            </div>

            <div className="exam-item">
              <div>
                <strong>Data Structures</strong>

                <p>15 September 2026</p>
              </div>

              <span className="exam-badge">10:00 AM</span>
            </div>

            <div className="exam-item">
              <div>
                <strong>Machine Learning</strong>

                <p>18 September 2026</p>
              </div>

              <span className="exam-badge">10:00 AM</span>
            </div>
          </div>

          {/* Notices */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Latest Notices</h3>

              <span>View All</span>
            </div>

            <div className="notice-item">
              <span>📢</span>

              <div>
                <strong>Semester Examination Notice</strong>

                <p>
                  Examination schedule has been published.
                </p>
              </div>
            </div>

            <div className="notice-item">
              <span>📢</span>

              <div>
                <strong>Fee Payment Reminder</strong>

                <p>
                  Check your fee status before the deadline.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;

