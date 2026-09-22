
// import { useEffect, useState } from "react";
// import "./ExamTimetable.css";

// function ExamTimetable() {
//     const [exams, setExams] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         const fetchExams = async () => {
//             try {
//                 const token = localStorage.getItem("token");

//                 const response = await fetch(
//                     "http://localhost:5000/api/exams",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );

//                 const data = await response.json();

//                 if (response.ok) {
//                     setExams(data.exams);
//                 } else {
//                     setMessage(data.message);
//                 }

//             } catch (error) {
//                 console.log(
//                     "Exam fetch error:",
//                     error
//                 );

//                 setMessage(
//                     "Unable to connect to server"
//                 );

//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchExams();
//     }, []);

//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString(
//             "en-IN",
//             {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric"
//             }
//         );
//     };

//     const getDay = (date) => {
//         return new Date(date).toLocaleDateString(
//             "en-IN",
//             {
//                 weekday: "long"
//             }
//         );
//     };

//     if (loading) {
//         return (
//             <div className="exam-page">
//                 <p>Loading exam timetable...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="exam-page">

//             <div className="exam-header">
//                 <h1>Exam Timetable</h1>
//                 <p>
//                     View your upcoming examination schedule
//                 </p>
//             </div>

//             <div className="exam-card">

//                 <div className="exam-card-header">
//                     <div>
//                         <h2>Semester Examination</h2>
//                         <p>Current Semester</p>
//                     </div>

//                     <span>2026</span>
//                 </div>

//                 {message && (
//                     <p>{message}</p>
//                 )}

//                 <div className="exam-table">

//                     <div className="exam-row exam-heading">
//                         <span>Code</span>
//                         <span>Subject</span>
//                         <span>Date</span>
//                         <span>Time</span>
//                         <span>Type</span>
//                     </div>

//                     {exams.length === 0 ? (

//                         <div className="exam-row">
//                             <span>
//                                 No exams scheduled
//                             </span>
//                         </div>

//                     ) : (

//                         exams.map((exam) => (

//                             <div
//                                 className="exam-row"
//                                 key={exam._id}
//                             >

//                                 <strong>
//                                     {exam.subjectCode}
//                                 </strong>

//                                 <span>
//                                     {exam.subject}
//                                 </span>

//                                 <div>
//                                     <strong>
//                                         {formatDate(
//                                             exam.examDate
//                                         )}
//                                     </strong>

//                                     <small>
//                                         {getDay(
//                                             exam.examDate
//                                         )}
//                                     </small>
//                                 </div>

//                                 <span>
//                                     {exam.examTime}
//                                 </span>

//                                 <span className="exam-type">
//                                     Theory
//                                 </span>

//                             </div>

//                         ))

//                     )}

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default ExamTimetable;



import { useEffect, useState } from "react";
import "./ExamTimetable.css";

function ExamTimetable() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/exams",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    const examList = data.exams || [];

                    // Sort exams by date
                    examList.sort(
                        (a, b) =>
                            new Date(a.examDate) -
                            new Date(b.examDate)
                    );

                    setExams(examList);
                } else {
                    setMessage(
                        data.message ||
                        "Unable to load exam timetable"
                    );
                }
            } catch (error) {
                console.log(
                    "Exam fetch error:",
                    error
                );

                setMessage(
                    "Unable to connect to server"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    // ==========================================
    // GET DAY
    // ==========================================

    const getDay = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                weekday: "long"
            }
        );
    };

    // ==========================================
    // GET EXAM STATUS
    // ==========================================

    const getExamStatus = (date) => {
        if (!date) return "Upcoming";

        const examDate = new Date(date);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        examDate.setHours(0, 0, 0, 0);

        if (examDate < today) {
            return "Completed";
        }

        if (
            examDate.getTime() ===
            today.getTime()
        ) {
            return "Today";
        }

        return "Upcoming";
    };

    // ==========================================
    // NEXT UPCOMING EXAM
    // ==========================================

    const upcomingExams = exams.filter(
        (exam) =>
            new Date(exam.examDate) >=
            new Date().setHours(0, 0, 0, 0)
    );

    const nextExam =
        upcomingExams.length > 0
            ? upcomingExams[0]
            : null;

    // ==========================================
    // ACADEMIC YEAR
    // ==========================================

    const academicYear =
        exams.length > 0 && exams[0].examDate
            ? new Date(
                exams[0].examDate
            ).getFullYear()
            : new Date().getFullYear();

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="exam-page">

                <div className="exam-loading">

                    <div className="exam-loader"></div>

                    <p>
                        Loading your exam timetable...
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="exam-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="exam-header">

                <div className="exam-title-section">

                    <div className="exam-title-icon">
                        📅
                    </div>

                    <div>

                        <h1>
                            Exam Timetable
                        </h1>

                        <p>
                            View your upcoming examination schedule
                        </p>

                    </div>

                </div>

            </div>


            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {message && (
                <div className="exam-message">

                    <span>⚠️</span>

                    <p>
                        {message}
                    </p>

                </div>
            )}


            {/* ==========================================
                SUMMARY CARDS
            ========================================== */}

            <div className="exam-summary">

                <div className="exam-summary-card">

                    <div className="exam-summary-icon">
                        📚
                    </div>

                    <div className="exam-summary-content">

                        <span>
                            Total Exams
                        </span>

                        <strong>
                            {exams.length}
                        </strong>

                    </div>

                </div>


                <div className="exam-summary-card">

                    <div className="exam-summary-icon">
                        🎓
                    </div>

                    <div className="exam-summary-content">

                        <span>
                            Academic Year
                        </span>

                        <strong>
                            {academicYear}
                        </strong>

                    </div>

                </div>


                <div className="exam-summary-card">

                    <div className="exam-summary-icon">
                        ⏰
                    </div>

                    <div className="exam-summary-content">

                        <span>
                            Upcoming Exams
                        </span>

                        <strong>
                            {upcomingExams.length}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==========================================
                NEXT EXAM
            ========================================== */}

            {nextExam && (
                <div className="next-exam-card">

                    <div className="next-exam-left">

                        <div className="next-exam-icon">
                            ⏳
                        </div>

                        <div>

                            <span>
                                Next Examination
                            </span>

                            <h3>
                                {nextExam.subject}
                            </h3>

                            <p>
                                {nextExam.subjectCode}
                            </p>

                        </div>

                    </div>


                    <div className="next-exam-details">

                        <div>
                            <span>Date</span>

                            <strong>
                                {formatDate(
                                    nextExam.examDate
                                )}
                            </strong>
                        </div>

                        <div>
                            <span>Time</span>

                            <strong>
                                {nextExam.examTime || "-"}
                            </strong>
                        </div>

                    </div>

                </div>
            )}


            {/* ==========================================
                EXAMINATION CARD
            ========================================== */}

            <div className="exam-card">

                <div className="exam-card-header">

                    <div>

                        <h2>
                            Semester Examination
                        </h2>

                        <p>
                            Your examination schedule
                        </p>

                    </div>

                    <span className="exam-count">
                        {exams.length}{" "}
                        {exams.length === 1
                            ? "Exam"
                            : "Exams"}
                    </span>

                </div>


                {/* ==========================================
                    EMPTY STATE
                ========================================== */}

                {exams.length === 0 ? (

                    <div className="exam-empty">

                        <div className="exam-empty-icon">
                            📅
                        </div>

                        <h3>
                            No Exams Scheduled
                        </h3>

                        <p>
                            Your examination timetable
                            is not available yet.
                        </p>

                    </div>

                ) : (

                    /* ==========================================
                       EXAM GRID
                    ========================================== */

                    <div className="exam-list">

                        {exams.map((exam, index) => {

                            const status =
                                getExamStatus(
                                    exam.examDate
                                );

                            return (
                                <div
                                    className={`exam-item ${
                                        index === 0 &&
                                        status === "Upcoming"
                                            ? "next-exam-item"
                                            : ""
                                    }`}
                                    key={exam._id}
                                >

                                    {/* EXAM DATE */}

                                    <div className="exam-date-box">

                                        <strong>
                                            {exam.examDate
                                                ? new Date(
                                                    exam.examDate
                                                ).getDate()
                                                : "--"}
                                        </strong>

                                        <span>
                                            {exam.examDate
                                                ? new Date(
                                                    exam.examDate
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        month: "short"
                                                    }
                                                )
                                                : "---"}
                                        </span>

                                    </div>


                                    {/* EXAM INFORMATION */}

                                    <div className="exam-item-content">

                                        <div className="exam-item-top">

                                            <span className="exam-code">
                                                {exam.subjectCode}
                                            </span>

                                            <span
                                                className={`exam-status ${status
                                                    .toLowerCase()
                                                    .replace(
                                                        " ",
                                                        "-"
                                                    )}`}
                                            >
                                                {status}
                                            </span>

                                        </div>


                                        <h3>
                                            {exam.subject}
                                        </h3>


                                        <div className="exam-item-details">

                                            <div>

                                                <span>
                                                    📅
                                                </span>

                                                <p>
                                                    {formatDate(
                                                        exam.examDate
                                                    )}
                                                    <small>
                                                        {getDay(
                                                            exam.examDate
                                                        )}
                                                    </small>
                                                </p>

                                            </div>


                                            <div>

                                                <span>
                                                    🕐
                                                </span>

                                                <p>
                                                    {exam.examTime || "-"}
                                                    <small>
                                                        Exam Time
                                                    </small>
                                                </p>

                                            </div>


                                            <div>

                                                <span>
                                                    📝
                                                </span>

                                                <p>
                                                    Theory
                                                    <small>
                                                        Exam Type
                                                    </small>
                                                </p>

                                            </div>


                                            {exam.room && (
                                                <div>

                                                    <span>
                                                        📍
                                                    </span>

                                                    <p>
                                                        {exam.room}
                                                        <small>
                                                            Room
                                                        </small>
                                                    </p>

                                                </div>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                )}

            </div>


            {/* ==========================================
                FOOTER NOTE
            ========================================== */}

            {exams.length > 0 && (
                <div className="exam-footer-note">

                    <span>
                        ℹ️
                    </span>

                    <p>
                        Please arrive at the examination
                        room before the scheduled time.
                    </p>

                </div>
            )}

        </div>
    );
}

export default ExamTimetable;