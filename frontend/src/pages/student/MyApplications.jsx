import { useEffect, useState } from "react";
import "./MyApplications.css";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH MY APPLICATIONS
    // ==========================================

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/job-applications/my-applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setApplications(data.applications || []);
            } else {
                setApplications([]);
            }
        } catch (error) {
            console.error("Fetch applications error:", error);
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {
        switch (status) {
            case "Applied":
                return "status-applied";

            case "Shortlisted":
                return "status-shortlisted";

            case "Selected":
                return "status-selected";

            case "Rejected":
                return "status-rejected";

            default:
                return "status-applied";
        }
    };

    // ==========================================
    // STATUS ICON
    // ==========================================

    const getStatusIcon = (status) => {
        switch (status) {
            case "Applied":
                return "📨";

            case "Shortlisted":
                return "⭐";

            case "Selected":
                return "✓";

            case "Rejected":
                return "✕";

            default:
                return "📨";
        }
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // ==========================================
    // STATUS MESSAGE
    // ==========================================

    const getStatusMessage = (status) => {
        switch (status) {
            case "Applied":
                return "Your application has been submitted successfully.";

            case "Shortlisted":
                return "Your profile has been shortlisted for the next stage.";

            case "Selected":
                return "Congratulations! You have been selected.";

            case "Rejected":
                return "This application was not selected for the opportunity.";

            default:
                return "Your application is being processed.";
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="my-applications-loading">
                <div className="my-applications-loader"></div>

                <p>
                    Loading your applications...
                </p>
            </div>
        );
    }

    // ==========================================
    // COUNTS
    // ==========================================

    const totalApplications = applications.length;

    const appliedCount = applications.filter(
        (application) =>
            application.status === "Applied"
    ).length;

    const shortlistedCount = applications.filter(
        (application) =>
            application.status === "Shortlisted"
    ).length;

    const selectedCount = applications.filter(
        (application) =>
            application.status === "Selected"
    ).length;

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="my-applications-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="my-applications-header">

                <div className="my-applications-header-content">

                    <div className="my-applications-header-main">

                        <div className="my-applications-breadcrumb">
                            Student Portal
                            <span>›</span>
                            Placement
                            <span>›</span>
                            Applications
                        </div>

                        <div className="my-applications-badge">
                            📋 PLACEMENT APPLICATIONS
                        </div>

                        <h1>
                            My Applications
                        </h1>

                        <p>
                            Track your campus placement applications
                            and stay updated on every stage of your
                            recruitment journey.
                        </p>

                    </div>

                    <div className="my-applications-count">

                        <strong>
                            {totalApplications}
                        </strong>

                        <span>
                            Applications
                        </span>

                    </div>

                </div>

            </div>


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="application-summary-grid">

                {/* TOTAL */}

                <div className="application-summary-card">

                    <div className="application-summary-icon total">
                        📋
                    </div>

                    <div className="application-summary-content">

                        <span>
                            Total Applications
                        </span>

                        <strong>
                            {totalApplications}
                        </strong>

                    </div>

                </div>


                {/* APPLIED */}

                <div className="application-summary-card">

                    <div className="application-summary-icon applied">
                        📨
                    </div>

                    <div className="application-summary-content">

                        <span>
                            Applied
                        </span>

                        <strong>
                            {appliedCount}
                        </strong>

                    </div>

                </div>


                {/* SHORTLISTED */}

                <div className="application-summary-card">

                    <div className="application-summary-icon shortlisted">
                        ⭐
                    </div>

                    <div className="application-summary-content">

                        <span>
                            Shortlisted
                        </span>

                        <strong>
                            {shortlistedCount}
                        </strong>

                    </div>

                </div>


                {/* SELECTED */}

                <div className="application-summary-card">

                    <div className="application-summary-icon selected">
                        ✓
                    </div>

                    <div className="application-summary-content">

                        <span>
                            Selected
                        </span>

                        <strong>
                            {selectedCount}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==========================================
                SECTION HEADER
            ========================================== */}

            <div className="my-applications-section-header">

                <div>

                    <div className="my-applications-section-badge">
                        💼 APPLICATION TRACKER
                    </div>

                    <h2>
                        Your Applications
                    </h2>

                    <p>
                        Review your submitted applications and
                        monitor their current recruitment status.
                    </p>

                </div>

                <div className="my-applications-result-count">

                    <strong>
                        {totalApplications}
                    </strong>

                    <span>
                        {totalApplications === 1
                            ? "Application"
                            : "Applications"}
                    </span>

                </div>

            </div>


            {/* ==========================================
                EMPTY STATE
            ========================================== */}

            {applications.length === 0 ? (

                <div className="my-applications-empty">

                    <div className="my-applications-empty-icon">
                        📋
                    </div>

                    <h2>
                        No Applications Yet
                    </h2>

                    <p>
                        You haven't applied for any placement
                        opportunities yet.
                    </p>

                    <span>
                        Explore available jobs and submit your
                        first application.
                    </span>

                </div>

            ) : (

                /* ==========================================
                   APPLICATION LIST
                ========================================== */

                <div className="applications-list">

                    {applications.map((application) => {

                        const job = application.job || {};

                        const companyName =
                            job.company?.name ||
                            job.company ||
                            "-";

                        const status =
                            application.status ||
                            "Applied";

                        return (

                            <div
                                className="application-card"
                                key={application._id}
                            >

                                {/* ==========================================
                                    CARD HEADER
                                ========================================== */}

                                <div className="application-card-header">

                                    <div className="application-company">

                                        <div className="application-company-icon">
                                            💼
                                        </div>

                                        <div className="application-job-title">

                                            <h2>
                                                {job.jobTitle || "-"}
                                            </h2>

                                            <h3>
                                                {companyName}
                                            </h3>

                                        </div>

                                    </div>


                                    {/* STATUS */}

                                    <div
                                        className={`application-status ${getStatusClass(
                                            status
                                        )}`}
                                    >

                                        <span>
                                            {getStatusIcon(status)}
                                        </span>

                                        {status}

                                    </div>

                                </div>


                                {/* ==========================================
                                    DIVIDER
                                ========================================== */}

                                <div className="application-card-divider"></div>


                                {/* ==========================================
                                    CARD DETAILS
                                ========================================== */}

                                <div className="application-card-details">

                                    {/* LOCATION */}

                                    <div className="application-detail-item">

                                        <span>
                                            📍 Location
                                        </span>

                                        <strong>
                                            {job.location || "-"}
                                        </strong>

                                    </div>


                                    {/* JOB TYPE */}

                                    <div className="application-detail-item">

                                        <span>
                                            🕐 Job Type
                                        </span>

                                        <strong>
                                            {job.jobType || "-"}
                                        </strong>

                                    </div>


                                    {/* SALARY */}

                                    <div className="application-detail-item">

                                        <span>
                                            💰 Salary
                                        </span>

                                        <strong>
                                            {job.salary
                                                ? `${job.salary}`
                                                : "-"}
                                        </strong>

                                    </div>


                                    {/* APPLIED DATE */}

                                    <div className="application-detail-item">

                                        <span>
                                            📅 Applied On
                                        </span>

                                        <strong>
                                            {formatDate(
                                                application.appliedAt ||
                                                application.createdAt
                                            )}
                                        </strong>

                                    </div>

                                </div>


                                {/* ==========================================
                                    CARD FOOTER
                                ========================================== */}

                                <div
                                    className={`application-card-footer ${getStatusClass(
                                        status
                                    )}`}
                                >

                                    <div className="application-current-status">

                                        <small>
                                            APPLICATION STATUS
                                        </small>

                                        <strong>
                                            {status}
                                        </strong>

                                    </div>


                                    <div className="application-status-message">

                                        <span>
                                            {getStatusMessage(status)}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
};

export default MyApplications;
