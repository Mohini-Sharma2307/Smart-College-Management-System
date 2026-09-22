
import { useEffect, useState } from "react";
import "./StudentInterviews.css";

const StudentInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH MY INTERVIEWS
    // ==========================================

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const response = await fetch(
                    "https://smart-college-management-backend.onrender.com/api/interviews/my-interviews",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setInterviews(data.interviews || []);
                } else {
                    setInterviews([]);
                }
            } catch (error) {
                console.error(
                    "Student interviews fetch error:",
                    error
                );

                setInterviews([]);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchInterviews();
        } else {
            setLoading(false);
        }
    }, [token]);

    // ==========================================
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {
        switch (status) {
            case "Scheduled":
                return "interview-status scheduled";

            case "Completed":
                return "interview-status completed";

            case "Cancelled":
                return "interview-status cancelled";

            default:
                return "interview-status";
        }
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        const formattedDate = new Date(date);

        if (Number.isNaN(formattedDate.getTime())) {
            return "-";
        }

        return formattedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="student-interviews-loading">
                <div className="student-interviews-loader"></div>

                <p>
                    Loading your interviews...
                </p>
            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="student-interviews-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="student-interviews-header">

                <div className="student-interviews-header-content">

                    <div className="student-interviews-header-main">

                        <div className="student-interviews-breadcrumb">
                            Student Portal
                            <span>›</span>
                            Placement
                            <span>›</span>
                            My Interviews
                        </div>

                        <div className="student-interviews-badge">
                            🎯 PLACEMENT CENTER
                        </div>

                        <h1>
                            My Interviews
                        </h1>

                        <p>
                            View your scheduled placement interviews
                            and interview details.
                        </p>

                    </div>

                    <div className="student-interviews-header-icon">
                        🎯
                    </div>

                </div>

            </div>


            {/* ==========================================
                CONTENT
            ========================================== */}

            <div className="student-interviews-content">

                {/* ==========================================
                    EMPTY STATE
                ========================================== */}

                {interviews.length === 0 ? (

                    <div className="student-interviews-empty">

                        <div className="student-interviews-empty-icon">
                            🎯
                        </div>

                        <h2>
                            No Interviews Scheduled
                        </h2>

                        <p>
                            You don't have any placement interviews
                            scheduled yet.
                        </p>

                        <span>
                            Keep checking your placement portal for
                            interview updates.
                        </span>

                    </div>

                ) : (

                    <>

                        {/* ==========================================
                            SECTION HEADER
                        ========================================== */}

                        <div className="student-interviews-section-header">

                            <div>

                                <div className="student-interviews-section-badge">
                                    📅 INTERVIEW TRACKER
                                </div>

                                <h2>
                                    Upcoming & Scheduled Interviews
                                </h2>

                                <p>
                                    Review your interview schedule,
                                    interviewer details and venue information.
                                </p>

                            </div>

                            <div className="student-interviews-count-box">

                                <strong>
                                    {interviews.length}
                                </strong>

                                <span>
                                    Interviews
                                </span>

                            </div>

                        </div>


                        {/* ==========================================
                            INTERVIEW GRID
                        ========================================== */}

                        <div className="student-interviews-grid">

                            {interviews.map((interview) => {

                                const company =
                                    interview.application?.job?.company;

                                const job =
                                    interview.application?.job;

                                return (
                                    <div
                                        className="student-interview-card"
                                        key={interview._id}
                                    >

                                        {/* ==========================================
                                            CARD HEADER
                                        ========================================== */}

                                        <div className="student-interview-card-header">

                                            <div className="student-interview-company">

                                                <div className="student-interview-logo">

                                                    {company?.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "C"}

                                                </div>

                                                <div className="student-interview-company-info">

                                                    <h2>
                                                        {company?.name ||
                                                            "Company"}
                                                    </h2>

                                                    <p>
                                                        {job?.jobTitle ||
                                                            "Job Position"}
                                                    </p>

                                                </div>

                                            </div>

                                            <span
                                                className={getStatusClass(
                                                    interview.status
                                                )}
                                            >
                                                <span className="interview-status-dot"></span>

                                                {interview.status ||
                                                    "Scheduled"}

                                            </span>

                                        </div>


                                        <div className="student-interview-card-divider"></div>


                                        {/* ==========================================
                                            INTERVIEW DETAILS
                                        ========================================== */}

                                        <div className="student-interview-details">

                                            {/* ROUND */}

                                            <div className="student-interview-detail">

                                                <span className="detail-icon">
                                                    🎯
                                                </span>

                                                <div>

                                                    <small>
                                                        Interview Round
                                                    </small>

                                                    <strong>
                                                        {interview.interviewRound ||
                                                            "-"}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* TYPE */}

                                            <div className="student-interview-detail">

                                                <span className="detail-icon">
                                                    💻
                                                </span>

                                                <div>

                                                    <small>
                                                        Interview Type
                                                    </small>

                                                    <strong>
                                                        {interview.interviewType ||
                                                            "-"}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* DATE */}

                                            <div className="student-interview-detail">

                                                <span className="detail-icon">
                                                    📅
                                                </span>

                                                <div>

                                                    <small>
                                                        Interview Date
                                                    </small>

                                                    <strong>
                                                        {formatDate(
                                                            interview.interviewDate
                                                        )}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* TIME */}

                                            <div className="student-interview-detail">

                                                <span className="detail-icon">
                                                    ⏰
                                                </span>

                                                <div>

                                                    <small>
                                                        Interview Time
                                                    </small>

                                                    <strong>
                                                        {interview.interviewTime ||
                                                            "-"}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* INTERVIEWER */}

                                            <div className="student-interview-detail">

                                                <span className="detail-icon">
                                                    👤
                                                </span>

                                                <div>

                                                    <small>
                                                        Interviewer
                                                    </small>

                                                    <strong>
                                                        {interview.interviewer ||
                                                            "-"}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* ONLINE / OFFLINE */}

                                            {interview.interviewType ===
                                                "Online" ? (

                                                interview.meetingLink ? (

                                                    <div className="student-interview-detail interview-location">

                                                        <span className="detail-icon">
                                                            🔗
                                                        </span>

                                                        <div>

                                                            <small>
                                                                Meeting Link
                                                            </small>

                                                            <a
                                                                href={
                                                                    interview.meetingLink
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Join Interview

                                                                <span>
                                                                    ↗
                                                                </span>
                                                            </a>

                                                        </div>

                                                    </div>

                                                ) : (

                                                    <div className="student-interview-detail">

                                                        <span className="detail-icon">
                                                            🔗
                                                        </span>

                                                        <div>

                                                            <small>
                                                                Meeting Link
                                                            </small>

                                                            <strong>
                                                                Not provided
                                                            </strong>

                                                        </div>

                                                    </div>

                                                )

                                            ) : (

                                                interview.venue ? (

                                                    <div className="student-interview-detail interview-location">

                                                        <span className="detail-icon">
                                                            📍
                                                        </span>

                                                        <div>

                                                            <small>
                                                                Interview Venue
                                                            </small>

                                                            <strong>
                                                                {interview.venue}
                                                            </strong>

                                                        </div>

                                                    </div>

                                                ) : (

                                                    <div className="student-interview-detail">

                                                        <span className="detail-icon">
                                                            📍
                                                        </span>

                                                        <div>

                                                            <small>
                                                                Interview Venue
                                                            </small>

                                                            <strong>
                                                                Not provided
                                                            </strong>

                                                        </div>

                                                    </div>

                                                )

                                            )}

                                        </div>


                                        {/* ==========================================
                                            REMARKS
                                        ========================================== */}

                                        {interview.remarks && (

                                            <div className="student-interview-remarks">

                                                <div className="remarks-icon">
                                                    💬
                                                </div>

                                                <div>

                                                    <small>
                                                        Remarks
                                                    </small>

                                                    <p>
                                                        {interview.remarks}
                                                    </p>

                                                </div>

                                            </div>

                                        )}

                                    </div>
                                );
                            })}

                        </div>

                    </>
                )}

            </div>

        </div>
    );
};

export default StudentInterviews;
