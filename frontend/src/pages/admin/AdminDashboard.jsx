// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";

// // =========================
// // Student Components
// // =========================

// function AdminDashboard() {
//   const navigate = useNavigate();

//   const [students, setStudents] = useState([]);
//   const [admissions, setAdmissions] = useState([]);
//   const [notices, setNotices] = useState([]);

//   const [loading, setLoading] = useState(true);

//   // =========================
//   // LOGOUT
//   // =========================

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/admin-login");
//   };

//   // =========================
//   // FETCH DASHBOARD DATA
//   // =========================

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const [studentsResponse, admissionsResponse, noticesResponse] =
//           await Promise.all([
//             fetch("http://localhost:5000/api/students", { headers }),

//             fetch("http://localhost:5000/api/admissions", { headers }),

//             fetch("http://localhost:5000/api/notices", { headers }),
//           ]);

//         const studentsData = await studentsResponse.json();

//         const admissionsData = await admissionsResponse.json();

//         const noticesData = await noticesResponse.json();

//         if (studentsResponse.ok) {
//           setStudents(studentsData.students);
//         }

//         if (admissionsResponse.ok) {
//           setAdmissions(admissionsData.admissions);
//         }

//         if (noticesResponse.ok) {
//           setNotices(noticesData.notices);
//         }
//       } catch (error) {
//         console.log("Dashboard data fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // =========================
//   // PENDING ADMISSIONS
//   // =========================

//   const pendingAdmissions = admissions.filter(
//     (admission) => admission.status === "pending",
//   );

//   // =========================
//   // RECENT ADMISSIONS
//   // =========================

//   const recentAdmissions = admissions.slice(0, 3);

//   // =========================
//   // FORMAT DATE
//   // =========================

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   // =========================
//   // LOADING
//   // =========================

//   if (loading) {
//     return (
//       <div className="admin-dashboard">
//         <main className="admin-main">
//           <p>Loading dashboard...</p>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-dashboard">
//       {/* =========================
//                 SIDEBAR
//             ========================= */}

//       <aside className="admin-sidebar">
//         <div className="admin-logo">
//           <div className="admin-logo-icon">SC</div>

//           <div>
//             <h2>Smart College</h2>
//             <span>Admin Panel</span>
//           </div>
//         </div>

//         <nav className="admin-menu">
//           <button
//             className="active"
//             onClick={() => navigate("/admin-dashboard")}
//           >
//             🏠 Dashboard
//           </button>

//           <button onClick={() => navigate("/students")}>👨‍🎓 Students</button>

//           <button onClick={() => navigate("/admissions")}>📝 Admissions</button>

//           <button onClick={() => navigate("/fee-management")}>💰 Fees</button>

//           <button onClick={() => navigate("/result-management")}>
//             📊 Results
//           </button>

//           <button onClick={() => navigate("/exam-management")}>
//             📝 Exam Timetable
//           </button>

//           <button onClick={() => navigate("/notice-management")}>
//             📢 Notices
//           </button>

//           {/* =========================
//                         ADMIT CARD MANAGEMENT
//                     ========================= */}

//           <button onClick={() => navigate("/admit-card-management")}>
//             🎫 Admit Cards
//           </button>

//           {/* =========================
//                         ATTENDANCE MANAGEMENT
//                     ========================= */}

//           <button onClick={() => navigate("/attendance-management")}>
//             📋 Attendance
//           </button>

//           <button onClick={() => navigate("/assignment-management")}>
//             📝 Assignments
//           </button>

//           <button onClick={() => navigate("/assignment-submissions")}>
//             📤Assignment Submissions
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/fee-receipt-management")}
//           >
//             <span>🧾</span>
//             Fee Receipts
//           </button>

//           <button onClick={() => navigate("/company-management")}>
//             🏢 Companies
//           </button>

//           <button onClick={() => navigate("/job-management")}>💼 Jobs</button>

//           <button onClick={() => navigate("/application-management")}>
//             <span>📋</span>
//             Jon Applications
//           </button>

//           <button onClick={() => navigate("/interview-management")}>
//     <span>🎤</span>
//     Interviews
// </button>
// <button onClick={() => navigate("/offer-letter-management")}>
//     <span>📄</span>
//     Offer Letters
// </button>

// <button onClick={() => navigate("/placement-record-management")}>
//     <span>🎓</span>
//     Placement Records
// </button>

// <button onClick={() => navigate("/placement-analytics")}>
//     <span>📊</span>
//     Placement Analytics
// </button>



//         </nav>

//         <button className="admin-logout" onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </aside>

//       {/* =========================
//                 MAIN CONTENT
//             ========================= */}

//       <main className="admin-main">
//         {/* HEADER */}

//         <div className="admin-header">
//           <div>
//             <h1>Admin Dashboard</h1>

//             <p>Manage your college system</p>
//           </div>

//           <div className="admin-profile">
//             <div className="admin-avatar">A</div>

//             <div>
//               <strong>College Admin</strong>

//               <span>Administrator</span>
//             </div>
//           </div>
//         </div>

//         {/* WELCOME */}

//         <div className="admin-welcome">
//           <h2>Welcome, Admin 👋</h2>

//           <p>
//             Manage students, admissions, fees, results and college activities
//             from here.
//           </p>
//         </div>

//         {/* =========================
//                     STATISTICS
//                 ========================= */}

//         <div className="admin-stats">
//           <div className="admin-stat-card">
//             <span>👨‍🎓</span>

//             <div>
//               <p>Total Students</p>

//               <h3>{students.length}</h3>
//             </div>
//           </div>

//           <div className="admin-stat-card">
//             <span>📝</span>

//             <div>
//               <p>Pending Admissions</p>

//               <h3>{pendingAdmissions.length}</h3>
//             </div>
//           </div>

//           <div className="admin-stat-card">
//             <span>💰</span>

//             <div>
//               <p>Fees Collected</p>

//               <h3>—</h3>
//             </div>
//           </div>

//           <div className="admin-stat-card">
//             <span>📢</span>

//             <div>
//               <p>Total Notices</p>

//               <h3>{notices.length}</h3>
//             </div>
//           </div>
//         </div>

//         {/* =========================
//                     RECENT ADMISSIONS
//                 ========================= */}

//         <div className="recent-admissions">
//           <div className="section-header">
//             <div>
//               <h2>Recent Admissions</h2>

//               <p>Recently registered students</p>
//             </div>

//             <button onClick={() => navigate("/admissions")}>View All</button>
//           </div>

//           <div className="admission-table">
//             <div className="admission-row admission-heading">
//               <span>Student</span>
//               <span>Email</span>
//               <span>Course</span>
//               <span>Status</span>
//               <span>Action</span>
//             </div>

//             {recentAdmissions.length === 0 ? (
//               <div className="admission-row">
//                 <span>No admissions found</span>
//               </div>
//             ) : (
//               recentAdmissions.map((admission) => (
//                 <div className="admission-row" key={admission._id}>
//                   <div>
//                     <strong>{admission.student?.fullName}</strong>

//                     <small>Student</small>
//                   </div>

//                   <span>{admission.student?.email}</span>

//                   <span>{admission.course}</span>

//                   <strong
//                     className={
//                       admission.status === "approved"
//                         ? "status-approved"
//                         : admission.status === "pending"
//                           ? "status-pending"
//                           : "status-rejected"
//                     }
//                   >
//                     {admission.status}
//                   </strong>

//                   <button
//                     className="view-btn"
//                     onClick={() => navigate("/admissions")}
//                   >
//                     View
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* =========================
//                     RECENT NOTICES
//                 ========================= */}

//         <div className="recent-notices">
//           <div className="section-header">
//             <div>
//               <h2>Recent Notices</h2>

//               <p>Latest college announcements</p>
//             </div>

//             <button onClick={() => navigate("/notice-management")}>
//               View All
//             </button>
//           </div>

//           <div className="notice-list">
//             {notices.length === 0 ? (
//               <div className="admin-notice">
//                 <div className="notice-icon">📢</div>

//                 <div>
//                   <strong>No notices available</strong>

//                   <p>There are currently no college notices.</p>
//                 </div>
//               </div>
//             ) : (
//               notices.slice(0, 3).map((notice) => (
//                 <div className="admin-notice" key={notice._id}>
//                   <div className="notice-icon">📢</div>

//                   <div>
//                     <strong>{notice.title}</strong>

//                     <p>{notice.description}</p>

//                     <small>{formatDate(notice.publishDate)}</small>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// =========================
// Admin Dashboard
// =========================

function AdminDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to landing page
    navigate("/");
  };

  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          studentsResponse,
          admissionsResponse,
          noticesResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/students", {
            headers,
          }),

          fetch("http://localhost:5000/api/admissions", {
            headers,
          }),

          fetch("http://localhost:5000/api/notices", {
            headers,
          }),
        ]);

        const studentsData = await studentsResponse.json();
        const admissionsData = await admissionsResponse.json();
        const noticesData = await noticesResponse.json();

        if (studentsResponse.ok) {
          setStudents(studentsData.students || []);
        }

        if (admissionsResponse.ok) {
          setAdmissions(admissionsData.admissions || []);
        }

        if (noticesResponse.ok) {
          setNotices(noticesData.notices || []);
        }
      } catch (error) {
        console.log(
          "Dashboard data fetch error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =========================
  // PENDING ADMISSIONS
  // =========================

  const pendingAdmissions = admissions.filter(
    (admission) =>
      admission.status === "pending"
  );

  // =========================
  // RECENT ADMISSIONS
  // =========================

  const recentAdmissions = admissions.slice(0, 3);

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-dashboard">
        <main className="admin-main">
          <p>Loading dashboard...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <div className="admin-logo-icon">
            {/* SC */}

            <img src="https://play-lh.googleusercontent.com/v5K9HtnaVZmvH-iSr6jvmitTFbIFgiVnRus46PBU8iY8v3GSm9LweehYHea8oQ4wA39JXyF6LBxEcCPO7gC_pQ" alt="logo" />

          </div>

          <div>
            <h2>Smart College</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-menu">

          <button
            className="active"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/students")
            }
          >
            👨‍🎓 Students
          </button>

          <button
            onClick={() =>
              navigate("/admissions")
            }
          >
            📝 Admissions
          </button>

          <button
            onClick={() =>
              navigate("/fee-management")
            }
          >
            💰 Fees
          </button>

          <button
            onClick={() =>
              navigate("/result-management")
            }
          >
            📊 Results
          </button>

          <button
            onClick={() =>
              navigate("/exam-management")
            }
          >
            📝 Exam Timetable
          </button>

          <button
            onClick={() =>
              navigate("/notice-management")
            }
          >
            📢 Notices
          </button>

          {/* Admit Card Management */}

          <button
            onClick={() =>
              navigate(
                "/admit-card-management"
              )
            }
          >
            🎫 Admit Cards
          </button>

          {/* Attendance Management */}

          <button
            onClick={() =>
              navigate(
                "/attendance-management"
              )
            }
          >
            📋 Attendance
          </button>

          {/* Assignments */}

          <button
            onClick={() =>
              navigate(
                "/assignment-management"
              )
            }
          >
            📝 Assignments
          </button>

          {/* Assignment Submissions */}

          <button
            onClick={() =>
              navigate(
                "/assignment-submissions"
              )
            }
          >
            📤 Assignment Submissions
          </button>

          {/* Fee Receipts */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/fee-receipt-management"
              )
            }
          >
            <span>🧾</span>
            Fee Receipts
          </button>

          {/* Companies */}

          <button
            onClick={() =>
              navigate(
                "/company-management"
              )
            }
          >
            🏢 Companies
          </button>

          {/* Jobs */}

          <button
            onClick={() =>
              navigate("/job-management")
            }
          >
            💼 Jobs
          </button>

          {/* Applications */}

          <button
            onClick={() =>
              navigate(
                "/application-management"
              )
            }
          >
            <span>📋</span>
            Job Applications
          </button>

          {/* Interviews */}

          <button
            onClick={() =>
              navigate(
                "/interview-management"
              )
            }
          >
            <span>🎤</span>
            Interviews
          </button>

          {/* Offer Letters */}

          <button
            onClick={() =>
              navigate(
                "/offer-letter-management"
              )
            }
          >
            <span>📄</span>
            Offer Letters
          </button>

          {/* Placement Records */}

          <button
            onClick={() =>
              navigate(
                "/placement-record-management"
              )
            }
          >
            <span>🎓</span>
            Placement Records
          </button>

          {/* Placement Analytics */}

          <button
            onClick={() =>
              navigate(
                "/placement-analytics"
              )
            }
          >
            <span>📊</span>
            Placement Analytics
          </button>

        </nav>

        {/* =========================
            LOGOUT
        ========================= */}

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="admin-main">

        {/* HEADER */}

        <div className="admin-header">

          <div>
            <h1>Admin Dashboard</h1>

            <p>
              Manage your college system
            </p>
          </div>

          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>
                College Admin
              </strong>

              <span>
                Administrator
              </span>
            </div>

          </div>

        </div>

        {/* WELCOME */}

        <div className="admin-welcome">

          <h2>
            Welcome, Admin 👋
          </h2>

          <p>
            Manage students, admissions,
            fees, results and college
            activities from here.
          </p>

        </div>

        {/* =========================
            STATISTICS
        ========================= */}

        <div className="admin-stats">

          <div className="admin-stat-card">

            <span>👨‍🎓</span>

            <div>
              <p>
                Total Students
              </p>

              <h3>
                {students.length}
              </h3>
            </div>

          </div>

          <div className="admin-stat-card">

            <span>📝</span>

            <div>
              <p>
                Pending Admissions
              </p>

              <h3>
                {pendingAdmissions.length}
              </h3>
            </div>

          </div>

          <div className="admin-stat-card">

            <span>💰</span>

            <div>
              <p>
                Fees Collected
              </p>

              <h3>
                —
              </h3>
            </div>

          </div>

          <div className="admin-stat-card">

            <span>📢</span>

            <div>
              <p>
                Total Notices
              </p>

              <h3>
                {notices.length}
              </h3>
            </div>

          </div>

        </div>

        {/* =========================
            RECENT ADMISSIONS
        ========================= */}

        <div className="recent-admissions">

          <div className="section-header">

            <div>
              <h2>
                Recent Admissions
              </h2>

              <p>
                Recently registered students
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/admissions")
              }
            >
              View All
            </button>

          </div>

          <div className="admission-table">

            <div className="admission-row admission-heading">

              <span>Student</span>

              <span>Email</span>

              <span>Course</span>

              <span>Status</span>

              <span>Action</span>

            </div>

            {recentAdmissions.length === 0 ? (

              <div className="admission-row">

                <span>
                  No admissions found
                </span>

              </div>

            ) : (

              recentAdmissions.map(
                (admission) => (

                  <div
                    className="admission-row"
                    key={admission._id}
                  >

                    <div>

                      <strong>
                        {
                          admission.student
                            ?.fullName
                        }
                      </strong>

                      <small>
                        Student
                      </small>

                    </div>

                    <span>
                      {
                        admission.student
                          ?.email
                      }
                    </span>

                    <span>
                      {admission.course}
                    </span>

                    <strong
                      className={
                        admission.status ===
                        "approved"
                          ? "status-approved"
                          : admission.status ===
                            "pending"
                          ? "status-pending"
                          : "status-rejected"
                      }
                    >
                      {admission.status}
                    </strong>

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(
                          "/admissions"
                        )
                      }
                    >
                      View
                    </button>

                  </div>

                )
              )

            )}

          </div>

        </div>

        {/* =========================
            RECENT NOTICES
        ========================= */}

        <div className="recent-notices">

          <div className="section-header">

            <div>
              <h2>
                Recent Notices
              </h2>

              <p>
                Latest college announcements
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/notice-management"
                )
              }
            >
              View All
            </button>

          </div>

          <div className="notice-list">

            {notices.length === 0 ? (

              <div className="admin-notice">

                <div className="notice-icon">
                  📢
                </div>

                <div>

                  <strong>
                    No notices available
                  </strong>

                  <p>
                    There are currently no
                    college notices.
                  </p>

                </div>

              </div>

            ) : (

              notices
                .slice(0, 3)
                .map((notice) => (

                  <div
                    className="admin-notice"
                    key={notice._id}
                  >

                    <div className="notice-icon">
                      📢
                    </div>

                    <div>

                      <strong>
                        {notice.title}
                      </strong>

                      <p>
                        {notice.description}
                      </p>

                      <small>
                        {formatDate(
                          notice.publishDate
                        )}
                      </small>

                    </div>

                  </div>

                ))

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;