
import { useEffect, useState } from "react";
import "./PlacementAnalytics.css";

const PlacementAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchPlacementAnalytics();
    }, []);

    const fetchPlacementAnalytics = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/placement-analytics/my-analytics",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setAnalytics(data.analytics);
            } else {
                setError(
                    data.message ||
                    "Unable to load placement analytics"
                );
            }
        } catch (error) {
            console.error(
                "Placement analytics error:",
                error
            );

            setError(
                "Unable to connect to server"
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="placement-analytics-loading">
                <div className="placement-analytics-loader"></div>
                <p>Loading your placement analytics...</p>
            </div>
        );
    }

    // ==========================================
    // ERROR
    // ==========================================

    if (error) {
        return (
            <div className="placement-analytics-error">
                <div className="analytics-error-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Analytics
                </h3>

                <p>
                    {error}
                </p>

                <button
                    onClick={() => {
                        setLoading(true);
                        setError("");
                        fetchPlacementAnalytics();
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!analytics) {
        return null;
    }

    return (
        <div className="placement-analytics-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="placement-analytics-header">

                <div>
                    <span className="analytics-badge">
                        PLACEMENT ANALYTICS
                    </span>

                    <h1>
                        My Placement Analytics
                    </h1>

                    <p>
                        Track your applications, interviews
                        and placement progress.
                    </p>
                </div>

            </div>


            {/* ==========================================
                APPLICATION STATS
            ========================================== */}

            <div className="analytics-section">

                <div className="analytics-section-title">
                    <span>📊</span>
                    <h2>Application Overview</h2>
                </div>

                <div className="analytics-stats-grid">

                    <div className="analytics-stat-card">
                        <span className="analytics-stat-icon">
                            📄
                        </span>

                        <div>
                            <span>
                                Total Applications
                            </span>

                            <strong>
                                {analytics.totalApplications}
                            </strong>
                        </div>
                    </div>


                    <div className="analytics-stat-card">
                        <span className="analytics-stat-icon">
                            ⭐
                        </span>

                        <div>
                            <span>
                                Shortlisted
                            </span>

                            <strong>
                                {analytics.shortlistedCount}
                            </strong>
                        </div>
                    </div>


                    <div className="analytics-stat-card">
                        <span className="analytics-stat-icon">
                            🎯
                        </span>

                        <div>
                            <span>
                                Selected
                            </span>

                            <strong>
                                {analytics.selectedCount}
                            </strong>
                        </div>
                    </div>


                    <div className="analytics-stat-card">
                        <span className="analytics-stat-icon">
                            ❌
                        </span>

                        <div>
                            <span>
                                Rejected
                            </span>

                            <strong>
                                {analytics.rejectedCount}
                            </strong>
                        </div>
                    </div>

                </div>

            </div>


            {/* ==========================================
                INTERVIEW & OFFER STATS
            ========================================== */}

            <div className="analytics-section">

                <div className="analytics-section-title">
                    <span>🎤</span>
                    <h2>Interview & Offer Overview</h2>
                </div>

                <div className="analytics-stats-grid">

                    <div className="analytics-stat-card">
                        <span className="analytics-stat-icon">
                            🎤
                        </span>

                        <div>
                            <span>
                                Total Interviews
                            </span>

                            <strong>
                                {analytics.totalInterviews}
                            </strong>
                        </div>
                    </div>


                    <div className="analytics-stat-card">
                        <span className="analytics-stat-icon">
                            📩
                        </span>

                        <div>
                            <span>
                                Offer Letters
                            </span>

                            <strong>
                                {analytics.totalOffers}
                            </strong>
                        </div>
                    </div>


                    <div className="analytics-stat-card">
                        <span className="analytics-stat-icon">
                            🏆
                        </span>

                        <div>
                            <span>
                                Placements
                            </span>

                            <strong>
                                {analytics.totalPlacements}
                            </strong>
                        </div>
                    </div>


                    <div className="analytics-stat-card">
                        <span className="analytics-stat-icon">
                            💼
                        </span>

                        <div>
                            <span>
                                Joined
                            </span>

                            <strong>
                                {analytics.joinedCount}
                            </strong>
                        </div>
                    </div>

                </div>

            </div>


            {/* ==========================================
                PLACEMENT STATUS
            ========================================== */}

            <div className="analytics-section">

                <div className="analytics-section-title">
                    <span>📌</span>
                    <h2>Placement Status</h2>
                </div>

                <div className="placement-status-grid">

                    <div className="placement-status-card">
                        <span>
                            Placed
                        </span>

                        <strong>
                            {analytics.placedCount}
                        </strong>
                    </div>


                    <div className="placement-status-card">
                        <span>
                            Joined
                        </span>

                        <strong>
                            {analytics.joinedCount}
                        </strong>
                    </div>


                    <div className="placement-status-card">
                        <span>
                            Not Joined
                        </span>

                        <strong>
                            {analytics.notJoinedCount}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==========================================
                SALARY INFORMATION
            ========================================== */}

            <div className="analytics-section">

                <div className="analytics-section-title">
                    <span>💰</span>
                    <h2>Salary Information</h2>
                </div>

                <div className="salary-analytics-grid">

                    <div className="salary-card">

                        <span>
                            Average Salary
                        </span>

                        <strong>
                            ₹{analytics.averageSalary} LPA
                        </strong>

                    </div>


                    <div className="salary-card">

                        <span>
                            Highest Salary
                        </span>

                        <strong>
                            ₹{analytics.highestSalary} LPA
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==========================================
                CURRENT PLACEMENT
            ========================================== */}

            {analytics.currentPlacement && (

                <div className="current-placement-card">

                    <div className="current-placement-header">

                        <div>
                            <span className="current-placement-badge">
                                CURRENT PLACEMENT
                            </span>

                            <h2>
                                {analytics.currentPlacement.company?.name ||
                                    "Company"}
                            </h2>

                            <p>
                                {analytics.currentPlacement.job?.jobTitle ||
                                    "Job Position"}
                            </p>
                        </div>

                        <span className="current-placement-status">
                            {analytics.currentPlacement.status}
                        </span>

                    </div>


                    <div className="current-placement-details">

                        <div>
                            <span>
                                Placement Year
                            </span>

                            <strong>
                                {analytics.currentPlacement.placementYear ||
                                    "-"}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Joining Date
                            </span>

                            <strong>
                                {analytics.currentPlacement.joiningDate
                                    ? new Date(
                                        analytics.currentPlacement.joiningDate
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )
                                    : "-"}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Salary
                            </span>

                            <strong>
                                {analytics.currentPlacement.salary ||
                                    "-"}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Location
                            </span>

                            <strong>
                                {analytics.currentPlacement.jobLocation ||
                                    "-"}
                            </strong>
                        </div>

                    </div>

                </div>

            )}


            {/* ==========================================
                FOOTER
            ========================================== */}

            <div className="placement-analytics-footer">

                <span>
                    Smart College Placement Portal
                </span>

                <span>
                    Track • Analyze • Grow
                </span>

            </div>

        </div>
    );
};

export default PlacementAnalytics;

