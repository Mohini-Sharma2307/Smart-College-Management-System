
import { useEffect, useState } from "react";
import "./PlacementAnalytics.css";

const PlacementAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH PLACEMENT ANALYTICS
    // ==========================================

    useEffect(() => {
        fetchPlacementAnalytics();
    }, []);

    const fetchPlacementAnalytics = async () => {
        try {
            setLoading(true);
            setErrorMessage("");

            const response = await fetch(
                "http://localhost:5000/api/placement-analytics",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setAnalytics(data);
            } else {
                setErrorMessage(
                    data.message ||
                    "Unable to fetch placement analytics"
                );
            }

        } catch (error) {
            console.error(
                "Placement analytics fetch error:",
                error
            );

            setErrorMessage(
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
            <div className="analytics-loading">

                <div className="analytics-loader"></div>

                <p>
                    Loading placement analytics...
                </p>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (errorMessage) {
        return (
            <div className="placement-analytics-page">

                <div className="analytics-header">

                    <div>

                        <div className="analytics-breadcrumb">
                            Admin Portal › Placement › Analytics
                        </div>

                        <h1>
                            Placement Analytics
                        </h1>

                        <p>
                            Analyze student placement performance
                            and placement trends.
                        </p>

                    </div>

                </div>


                <div className="analytics-error">

                    <div className="analytics-error-icon">
                        ⚠️
                    </div>

                    <h3>
                        Something went wrong
                    </h3>

                    <p>
                        {errorMessage}
                    </p>

                    <button
                        onClick={fetchPlacementAnalytics}
                        className="analytics-retry-btn"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    // ==========================================
    // SAFE DATA
    // ==========================================

    const totalPlacements =
        analytics?.totalPlacements || 0;

    const placedStudents =
        analytics?.placedStudents || 0;

    const joinedStudents =
        analytics?.joinedStudents || 0;

    const notJoinedStudents =
        analytics?.notJoinedStudents || 0;

    const averageSalary =
        analytics?.averageSalary || 0;

    const highestSalary =
        analytics?.highestSalary || 0;

    const placementRate =
        analytics?.placementRate || 0;

    const companyWisePlacements =
        analytics?.companyWisePlacements || [];

    const yearWisePlacements =
        analytics?.yearWisePlacements || [];


    return (
        <div className="placement-analytics-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="analytics-header">

                <div>

                    <div className="analytics-breadcrumb">
                        Admin Portal › Placement › Analytics
                    </div>

                    <h1>
                        Placement Analytics
                    </h1>

                    <p>
                        Analyze student placement performance
                        and placement trends.
                    </p>

                </div>

            </div>


            {/* ==========================================
                SUMMARY CARDS
            ========================================== */}

            <div className="analytics-summary-grid">

                {/* TOTAL */}

                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        📊
                    </div>

                    <div>

                        <span>
                            Total Placements
                        </span>

                        <strong>
                            {totalPlacements}
                        </strong>

                    </div>

                </div>


                {/* PLACED */}

                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        🎓
                    </div>

                    <div>

                        <span>
                            Placed Students
                        </span>

                        <strong>
                            {placedStudents}
                        </strong>

                    </div>

                </div>


                {/* JOINED */}

                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        ✓
                    </div>

                    <div>

                        <span>
                            Joined Students
                        </span>

                        <strong>
                            {joinedStudents}
                        </strong>

                    </div>

                </div>


                {/* NOT JOINED */}

                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        !
                    </div>

                    <div>

                        <span>
                            Not Joined
                        </span>

                        <strong>
                            {notJoinedStudents}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==========================================
                SALARY & PLACEMENT RATE
            ========================================== */}

            <div className="analytics-metrics-grid">

                <div className="analytics-metric-card">

                    <div className="metric-icon">
                        💰
                    </div>

                    <div>

                        <span>
                            Average Salary
                        </span>

                        <strong>
                            ₹ {averageSalary}
                        </strong>

                        <small>
                            Average CTC
                        </small>

                    </div>

                </div>


                <div className="analytics-metric-card">

                    <div className="metric-icon">
                        🏆
                    </div>

                    <div>

                        <span>
                            Highest Salary
                        </span>

                        <strong>
                            ₹ {highestSalary}
                        </strong>

                        <small>
                            Highest CTC
                        </small>

                    </div>

                </div>


                <div className="analytics-metric-card">

                    <div className="metric-icon">
                        📈
                    </div>

                    <div>

                        <span>
                            Placement Rate
                        </span>

                        <strong>
                            {placementRate}%
                        </strong>

                        <small>
                            Overall placement rate
                        </small>

                    </div>

                </div>

            </div>


            {/* ==========================================
                COMPANY WISE PLACEMENTS
            ========================================== */}

            <div className="analytics-section">

                <div className="analytics-section-header">

                    <div>

                        <h2>
                            Company-wise Placements
                        </h2>

                        <p>
                            Number of students placed in each company.
                        </p>

                    </div>

                </div>


                {companyWisePlacements.length === 0 ? (

                    <div className="analytics-no-data">
                        No company placement data available.
                    </div>

                ) : (

                    <div className="company-placement-list">

                        {companyWisePlacements.map(
                            (item, index) => (

                                <div
                                    className="company-placement-item"
                                    key={`${item.company}-${index}`}
                                >

                                    <div className="company-info">

                                        <div className="company-avatar">
                                            {item.company
                                                ?.charAt(0)
                                                ?.toUpperCase() || "C"}
                                        </div>

                                        <strong>
                                            {item.company}
                                        </strong>

                                    </div>

                                    <div className="company-placement-count">

                                        <strong>
                                            {item.count}
                                        </strong>

                                        <span>
                                            {item.count === 1
                                                ? "Student"
                                                : "Students"}
                                        </span>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


            {/* ==========================================
                YEAR WISE PLACEMENTS
            ========================================== */}

            <div className="analytics-section">

                <div className="analytics-section-header">

                    <div>

                        <h2>
                            Year-wise Placements
                        </h2>

                        <p>
                            Placement records by academic year.
                        </p>

                    </div>

                </div>


                {yearWisePlacements.length === 0 ? (

                    <div className="analytics-no-data">
                        No year-wise placement data available.
                    </div>

                ) : (

                    <div className="year-placement-grid">

                        {yearWisePlacements.map(
                            (item) => (

                                <div
                                    className="year-placement-card"
                                    key={item.year}
                                >

                                    <span>
                                        {item.year}
                                    </span>

                                    <strong>
                                        {item.count}
                                    </strong>

                                    <small>
                                        {item.count === 1
                                            ? "Placement"
                                            : "Placements"}
                                    </small>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


            {/* ==========================================
                REFRESH
            ========================================== */}

            <div className="analytics-refresh">

                <button
                    onClick={fetchPlacementAnalytics}
                    className="analytics-refresh-btn"
                >
                    ↻ Refresh Analytics
                </button>

            </div>

        </div>
    );
};

export default PlacementAnalytics;

