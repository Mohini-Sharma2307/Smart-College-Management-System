
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlacementDashboard.css";

function PlacementDashboard() {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH PLACEMENT DATA
    // ==========================================

    useEffect(() => {
        fetchPlacementData();
    }, []);

    const fetchPlacementData = async () => {
        try {
            const [
                jobsResponse,
                applicationsResponse
            ] = await Promise.all([
                fetch(
                    "http://localhost:5000/api/jobs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                ),

                fetch(
                    "http://localhost:5000/api/job-applications/my-applications",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            ]);

            const jobsData =
                await jobsResponse.json();

            const applicationsData =
                await applicationsResponse.json();

            if (jobsResponse.ok) {
                setJobs(jobsData.jobs || []);
            }

            if (applicationsResponse.ok) {
                setApplications(
                    applicationsData.applications || []
                );
            }
        } catch (error) {
            console.error(
                "Placement dashboard fetch error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // APPLICATION COUNTS
    // ==========================================

    const shortlistedCount =
        applications.filter(
            (application) =>
                application.status === "Shortlisted"
        ).length;

    const selectedCount =
        applications.filter(
            (application) =>
                application.status === "Selected"
        ).length;


    // ==========================================
    // OPEN JOBS
    // ==========================================

    const openJobs =
        jobs.filter(
            (job) => job.status === "Open"
        );

    const latestJobs =
        openJobs.slice(0, 3);


    // ==========================================
    // QUICK ACTIONS
    // ==========================================

    const quickActions = [
        {
            icon: "🏢",
            title: "Companies",
            description:
                "Explore companies visiting the college",
            path: "/placement-companies"
        },

        {
            icon: "💼",
            title: "Browse Jobs",
            description:
                "Find and apply for placement opportunities",
            path: "/student-jobs"
        },

        {
            icon: "📋",
            title: "My Applications",
            description:
                "Track your job applications",
            path: "/my-applications"
        },

        {
            icon: "🎯",
            title: "Career Profile",
            description:
                "Manage your skills and career preferences",
            path: "/career-profile"
        },

        {
            icon: "🎤",
            title: "Interviews",
            description:
                "View your scheduled interviews",
            path: "/student-interviews"
        },

        {
            icon: "🤖",
            title: "Career Recommendation",
            description:
                "Get AI-based career recommendations",
            path: "/career-recommendation"
        },

        {
            icon: "📄",
            title: "My Offer Letters",
            description:
                "View and download your offer letters",
            path: "/my-offer-letters"
        },

        {
            icon: "📋",
            title: "Placement History",
            description:
                "View your placement records",
            path: "/placement-records"
        },
        {
    title: "Placement Analytics",
    description: "View your placement performance",
    icon: "📊",
    path: "/placement-analytics"
}
    ];


    // ==========================================
    // PLACEMENT JOURNEY
    // ==========================================

    const placementJourney = [
        {
            number: "01",
            title: "Build Profile",
            description:
                "Complete your career profile"
        },

        {
            number: "02",
            title: "Find Jobs",
            description:
                "Explore available opportunities"
        },

        {
            number: "03",
            title: "Apply",
            description:
                "Submit applications to companies"
        },

        {
            number: "04",
            title: "Interview",
            description:
                "Attend scheduled interviews"
        },

        {
            number: "05",
            title: "Get Selected",
            description:
                "Receive your placement offer"
        }
    ];


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="placement-loading">

                <div className="placement-loader"></div>

                <p>
                    Loading placement dashboard...
                </p>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="placement-dashboard">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="placement-header">

                <div>

                    <span className="placement-badge">
                        🚀 PLACEMENT PORTAL
                    </span>

                    <h1>
                        Placement Dashboard
                    </h1>

                    <p>
                        Manage your placement journey,
                        applications and career opportunities.
                    </p>

                </div>

            </div>


            {/* ==========================================
                STATS
            ========================================== */}

            <div className="placement-stats">

                <div className="placement-stat-card">

                    <div className="placement-stat-icon">
                        💼
                    </div>

                    <div>
                        <span>
                            Open Jobs
                        </span>

                        <strong>
                            {openJobs.length}
                        </strong>
                    </div>

                </div>


                <div className="placement-stat-card">

                    <div className="placement-stat-icon">
                        📋
                    </div>

                    <div>
                        <span>
                            My Applications
                        </span>

                        <strong>
                            {applications.length}
                        </strong>
                    </div>

                </div>


                <div className="placement-stat-card">

                    <div className="placement-stat-icon">
                        🎯
                    </div>

                    <div>
                        <span>
                            Shortlisted
                        </span>

                        <strong>
                            {shortlistedCount}
                        </strong>
                    </div>

                </div>


                <div className="placement-stat-card">

                    <div className="placement-stat-icon">
                        🏆
                    </div>

                    <div>
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
                QUICK ACTIONS
            ========================================== */}

            <section className="placement-section">

                <div className="placement-section-header">

                    <div>

                        <h2>
                            Quick Actions
                        </h2>

                        <p>
                            Access your placement features quickly.
                        </p>

                    </div>

                </div>


                <div className="placement-actions-grid">

                    {quickActions.map((action) => (

                        <button
                            className="placement-action-card"
                            key={action.title}
                            onClick={() =>
                                navigate(action.path)
                            }
                        >

                            <div className="placement-action-icon">
                                {action.icon}
                            </div>

                            <div className="placement-action-content">

                                <h3>
                                    {action.title}
                                </h3>

                                <p>
                                    {action.description}
                                </p>

                            </div>

                            <span className="placement-action-arrow">
                                →
                            </span>

                        </button>

                    ))}

                </div>

            </section>


            {/* ==========================================
                LATEST JOBS
            ========================================== */}

            <section className="placement-section">

                <div className="placement-section-header">

                    <div>

                        <h2>
                            Latest Opportunities
                        </h2>

                        <p>
                            Recently available placement opportunities.
                        </p>

                    </div>


                    <button
                        className="placement-view-all"
                        onClick={() =>
                            navigate("/student-jobs")
                        }
                    >
                        View All Jobs →
                    </button>

                </div>


                {latestJobs.length === 0 ? (

                    <div className="placement-empty">

                        <div>
                            💼
                        </div>

                        <h3>
                            No Open Jobs
                        </h3>

                        <p>
                            New placement opportunities
                            will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="latest-jobs-grid">

                        {latestJobs.map((job) => (

                            <div
                                className="latest-job-card"
                                key={job._id}
                            >

                                <div className="latest-job-top">

                                    <div className="latest-job-logo">

                                        {job.company?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "C"}

                                    </div>

                                    <span className="job-open-status">
                                        Open
                                    </span>

                                </div>


                                <h3>
                                    {job.jobTitle ||
                                        "Job Position"}
                                </h3>


                                <p className="latest-job-company">
                                    {job.company?.name ||
                                        "Company"}
                                </p>


                                <div className="latest-job-details">

                                    <span>
                                        📍{" "}
                                        {job.location ||
                                            "Location not specified"}
                                    </span>

                                    <span>
                                        💼{" "}
                                        {job.jobType ||
                                            "Full Time"}
                                    </span>

                                </div>


                                <button
                                    className="latest-job-btn"
                                    onClick={() =>
                                        navigate("/student-jobs")
                                    }
                                >
                                    View Job

                                    <span>
                                        →
                                    </span>

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </section>


            {/* ==========================================
                PLACEMENT JOURNEY
            ========================================== */}

            <section className="placement-section">

                <div className="placement-section-header">

                    <div>

                        <h2>
                            Your Placement Journey
                        </h2>

                        <p>
                            Follow these steps to reach your placement goal.
                        </p>

                    </div>

                </div>


                <div className="placement-journey">

                    {placementJourney.map(
                        (step, index) => (

                            <React.Fragment
                                key={step.number}
                            >

                                <div className="journey-step">

                                    <div className="journey-number">
                                        {step.number}
                                    </div>

                                    <div>

                                        <h3>
                                            {step.title}
                                        </h3>

                                        <p>
                                            {step.description}
                                        </p>

                                    </div>

                                </div>


                                {index <
                                    placementJourney.length - 1 && (

                                    <div className="journey-arrow">
                                        →
                                    </div>

                                )}

                            </React.Fragment>

                        )
                    )}

                </div>

            </section>


            {/* ==========================================
                AI CAREER RECOMMENDATION
            ========================================== */}

            <section className="placement-ai-card">

                <div className="placement-ai-icon">
                    🤖
                </div>


                <div className="placement-ai-content">

                    <span>
                        AI CAREER ASSISTANT
                    </span>

                    <h2>
                        Not sure which career path suits you?
                    </h2>

                    <p>
                        Complete your career profile and
                        get personalized career recommendations
                        based on your skills, interests and goals.
                    </p>

                </div>


                <button
                    className="placement-ai-btn"
                    onClick={() =>
                        navigate("/career-recommendation")
                    }
                >
                    Explore Recommendation →
                </button>

            </section>

        </div>
    );
}

export default PlacementDashboard;

