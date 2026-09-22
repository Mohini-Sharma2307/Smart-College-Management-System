
import { useEffect, useState } from "react";
import "./CareerRecommendation.css";

const CareerRecommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH CAREER RECOMMENDATIONS
    // ==========================================

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/career-recommendations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "Unable to load career recommendations"
                );

                setRecommendations([]);
                setRecommendedJobs([]);

                return;
            }

            setRecommendations(
                data.recommendations || []
            );

            setRecommendedJobs(
                data.recommendedJobs || []
            );

        } catch (error) {
            console.error(
                "Career recommendation fetch error:",
                error
            );

            setError(
                "Unable to connect with career recommendation service"
            );

            setRecommendations([]);
            setRecommendedJobs([]);

        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // FORMAT ML CONFIDENCE
    // ==========================================

    const formatConfidence = (confidence) => {
        const value = Number(confidence);

        if (Number.isNaN(value)) {
            return "0%";
        }

        return `${value.toFixed(1)}%`;
    };

    // ==========================================
    // FORMAT DEADLINE
    // ==========================================

    const formatDeadline = (deadline) => {
        if (!deadline) {
            return "-";
        }

        const date = new Date(deadline);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        return date.toLocaleDateString(
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
            <div className="career-loading">

                <div className="career-loader"></div>

                <p>
                    Generating your AI career recommendations...
                </p>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="career-page">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="career-page-header">

                <div className="career-title-section">

                    <div className="career-title-icon">
                        🤖
                    </div>

                    <div>

                        <h1>
                            AI Career Recommendation
                        </h1>

                        <p>
                            Get career recommendations based on your
                            skills, interests and profile.
                        </p>

                    </div>

                </div>

                <button
                    className="refresh-career-btn"
                    onClick={fetchRecommendations}
                >
                    🔄 Refresh
                </button>

            </div>


            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (

                <div className="career-error">

                    <span>
                        ⚠️
                    </span>

                    <p>
                        {error}
                    </p>

                </div>

            )}


            {/* ==========================================
                NO RECOMMENDATION
            ========================================== */}

            {!error &&
                recommendations.length === 0 && (

                    <div className="career-empty">

                        <div className="career-empty-icon">
                            🤖
                        </div>

                        <h3>
                            No Career Recommendation Available
                        </h3>

                        <p>
                            Please complete your career profile
                            to generate AI-based recommendations.
                        </p>

                        <a
                            href="/career-profile"
                            className="complete-profile-btn"
                        >
                            Complete Career Profile
                        </a>

                    </div>

                )}


            {/* ==========================================
                CAREER RECOMMENDATIONS
            ========================================== */}

            {recommendations.length > 0 && (

                <>

                    <div className="section-header">

                        <div>

                            <h2>
                                Recommended Career Paths
                            </h2>

                            <p>
                                ML-based career predictions from your profile
                            </p>

                        </div>

                        <span className="ai-badge">
                            🤖 AI Powered
                        </span>

                    </div>


                    <div className="career-recommendation-grid">

                        {recommendations.map(
                            (recommendation, index) => (

                                <div
                                    className="career-card"
                                    key={`${recommendation.role}-${index}`}
                                >

                                    {/* ==========================================
                                        CARD HEADER
                                    ========================================== */}

                                    <div className="career-card-header">

                                        <div className="career-number">
                                            {index + 1}
                                        </div>

                                        <div>

                                            <h3>
                                                {recommendation.role}
                                            </h3>

                                            <span>
                                                ML Career Prediction
                                            </span>

                                        </div>

                                    </div>


                                    {/* ==========================================
                                        ML CONFIDENCE
                                    ========================================== */}

                                    <div className="career-score">

                                        <span>
                                            ML Confidence
                                        </span>

                                        <strong>
                                            {formatConfidence(
                                                recommendation.confidence
                                            )}
                                        </strong>

                                    </div>


                                    {/* ==========================================
                                        MATCHED SKILLS
                                    ========================================== */}

                                    {recommendation.matchedSkills?.length > 0 && (

                                        <div className="career-match-section">

                                            <h4>
                                                Matched Skills
                                            </h4>

                                            <div className="career-tags">

                                                {recommendation.matchedSkills.map(
                                                    (skill) => (
                                                        <span
                                                            key={skill}
                                                        >
                                                            {skill}
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </div>

                                    )}


                                    {/* ==========================================
                                        MATCHED INTERESTS
                                    ========================================== */}

                                    {recommendation.matchedInterests?.length > 0 && (

                                        <div className="career-match-section">

                                            <h4>
                                                Matched Interests
                                            </h4>

                                            <div className="career-tags interest-tags">

                                                {recommendation.matchedInterests.map(
                                                    (interest) => (
                                                        <span
                                                            key={interest}
                                                        >
                                                            {interest}
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </div>

                                    )}

                                </div>

                            )
                        )}

                    </div>


                    {/* ==========================================
                        RECOMMENDED JOBS
                    ========================================== */}

                    <div className="jobs-section">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Recommended Jobs
                                </h2>

                                <p>
                                    Open placement opportunities matching
                                    your skills.
                                </p>

                            </div>

                            <span className="jobs-count">
                                💼 {recommendedJobs.length} Jobs
                            </span>

                        </div>


                        {recommendedJobs.length === 0 ? (

                            <div className="no-jobs">

                                <div className="no-jobs-icon">
                                    💼
                                </div>

                                <h3>
                                    No Matching Jobs Found
                                </h3>

                                <p>
                                    Currently there are no open jobs
                                    matching your skills.
                                </p>

                            </div>

                        ) : (

                            <div className="recommended-jobs-grid">

                                {recommendedJobs.map(
                                    (item, index) => {

                                        const job = item.job;

                                        return (

                                            <div
                                                className="recommended-job-card"
                                                key={
                                                    job?._id ||
                                                    `job-${index}`
                                                }
                                            >

                                                {/* ==========================================
                                                    JOB HEADER
                                                ========================================== */}

                                                <div className="job-card-header">

                                                    <div className="job-icon">
                                                        💼
                                                    </div>

                                                    <span className="job-status">
                                                        {job?.status || "Open"}
                                                    </span>

                                                </div>


                                                {/* ==========================================
                                                    JOB TITLE
                                                ========================================== */}

                                                <h3>
                                                    {job?.jobTitle || "-"}
                                                </h3>


                                                {/* ==========================================
                                                    COMPANY
                                                ========================================== */}

                                                <p className="job-company">

                                                    🏢{" "}

                                                    {job?.company?.name ||
                                                        "Company"}

                                                </p>


                                                {/* ==========================================
                                                    JOB DETAILS
                                                ========================================== */}

                                                <div className="job-details">

                                                    <div className="job-detail">

                                                        <span>
                                                            📍
                                                        </span>

                                                        <strong>
                                                            {job?.location ||
                                                                "-"}
                                                        </strong>

                                                    </div>


                                                    <div className="job-detail">

                                                        <span>
                                                            🕐
                                                        </span>

                                                        <strong>
                                                            {job?.jobType ||
                                                                "-"}
                                                        </strong>

                                                    </div>


                                                    <div className="job-detail">

                                                        <span>
                                                            💰
                                                        </span>

                                                        <strong>
                                                            {job?.salary ||
                                                                "-"}
                                                        </strong>

                                                    </div>

                                                </div>


                                                {/* ==========================================
                                                    SKILL MATCH
                                                ========================================== */}

                                                <div className="job-skill-match">

                                                    <div className="skill-match-header">

                                                        <span>
                                                            Skill Match
                                                        </span>

                                                        <strong>
                                                            {item.matchScore ||
                                                                0}
                                                        </strong>

                                                    </div>


                                                    {item.matchedSkills?.length > 0 && (

                                                        <div className="matched-job-skills">

                                                            {item.matchedSkills.map(
                                                                (skill) => (

                                                                    <span
                                                                        key={skill}
                                                                    >
                                                                        {skill}
                                                                    </span>

                                                                )
                                                            )}

                                                        </div>

                                                    )}

                                                </div>


                                                {/* ==========================================
                                                    DEADLINE
                                                ========================================== */}

                                                <div className="job-deadline">

                                                    <span>
                                                        Application Deadline
                                                    </span>

                                                    <strong>
                                                        {formatDeadline(
                                                            job?.applicationDeadline
                                                        )}
                                                    </strong>

                                                </div>


                                                {/* ==========================================
                                                    APPLY BUTTON
                                                ========================================== */}

                                                <a
                                                    href="/student-jobs"
                                                    className="apply-job-btn"
                                                >
                                                    View & Apply
                                                    <span>
                                                        →
                                                    </span>
                                                </a>

                                            </div>

                                        );
                                    }
                                )}

                            </div>

                        )}

                    </div>


                    {/* ==========================================
                        AI INFORMATION
                    ========================================== */}

                    <div className="ai-information">

                        <div className="ai-information-icon">
                            🤖
                        </div>

                        <div>

                            <h3>
                                How AI Recommendation Works
                            </h3>

                            <p>
                                The system uses your skills, interests,
                                CGPA, experience level and career goal
                                to generate career predictions using
                                a machine learning model.
                            </p>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
};

export default CareerRecommendation;





