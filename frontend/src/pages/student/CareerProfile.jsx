import { useEffect, useState } from "react";
import "./CareerProfile.css";

const CareerProfile = () => {
    const [formData, setFormData] = useState({
        skills: "",
        interests: "",
        preferredJobRole: "",
        preferredIndustry: "",
        cgpa: "",
        experienceLevel: "Fresher",
        careerGoal: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("token");


    // ==========================================
    // FETCH CAREER PROFILE
    // ==========================================

    useEffect(() => {
        fetchCareerProfile();
    }, []);

    const fetchCareerProfile = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/career-profile/my-profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok && data.profile) {
                const profile = data.profile;

                setFormData({
                    skills: profile.skills?.join(", ") || "",

                    interests:
                        profile.interests?.join(", ") || "",

                    preferredJobRole:
                        profile.preferredJobRole || "",

                    preferredIndustry:
                        profile.preferredIndustry || "",

                    cgpa:
                        profile.cgpa ?? "",

                    experienceLevel:
                        profile.experienceLevel || "Fresher",

                    careerGoal:
                        profile.careerGoal || ""
                });
            }

        } catch (error) {
            console.error(
                "Career profile fetch error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

        // Clear old messages while editing
        if (successMessage) {
            setSuccessMessage("");
        }

        if (errorMessage) {
            setErrorMessage("");
        }
    };


    // ==========================================
    // SAVE CAREER PROFILE
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const skillsArray = formData.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);

            const interestsArray = formData.interests
                .split(",")
                .map((interest) => interest.trim())
                .filter(Boolean);

            const response = await fetch(
                "http://localhost:5000/api/career-profile",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        skills: skillsArray,

                        interests: interestsArray,

                        preferredJobRole:
                            formData.preferredJobRole,

                        preferredIndustry:
                            formData.preferredIndustry,

                        cgpa: formData.cgpa
                            ? Number(formData.cgpa)
                            : undefined,

                        experienceLevel:
                            formData.experienceLevel,

                        careerGoal:
                            formData.careerGoal
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(
                    data.message ||
                    "Unable to save career profile."
                );

                return;
            }

            setSuccessMessage(
                "Career profile saved successfully."
            );

        } catch (error) {
            console.error(
                "Career profile save error:",
                error
            );

            setErrorMessage(
                "Unable to connect to server."
            );

        } finally {
            setSaving(false);
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="career-profile-loading">

                <div className="career-profile-loader"></div>

                <p>
                    Loading career profile...
                </p>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="career-profile-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="career-profile-header">

                <div className="career-profile-header-content">

                    <div className="career-profile-header-main">

                        <div className="career-profile-breadcrumb">
                            Student Portal
                            <span>›</span>
                            Career Profile
                        </div>

                        <div className="career-profile-badge">
                            🎯 CAREER DEVELOPMENT
                        </div>

                        <h1>
                            Career Profile
                        </h1>

                        <p>
                            Tell us about your skills, interests,
                            and career goals to get personalized
                            career recommendations.
                        </p>

                    </div>

                    <div className="career-header-icon">
                        🎯
                    </div>

                </div>

            </div>


            {/* ==========================================
                SUCCESS MESSAGE
            ========================================== */}

            {successMessage && (
                <div className="career-success-message">

                    <div className="career-message-icon">
                        ✓
                    </div>

                    <div>
                        <strong>
                            Profile Updated
                        </strong>

                        <span>
                            {successMessage}
                        </span>
                    </div>

                </div>
            )}


            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {errorMessage && (
                <div className="career-error-message">

                    <div className="career-message-icon">
                        !
                    </div>

                    <div>
                        <strong>
                            Unable to Save
                        </strong>

                        <span>
                            {errorMessage}
                        </span>
                    </div>

                </div>
            )}


            {/* ==========================================
                FORM
            ========================================== */}

            <form
                className="career-profile-form"
                onSubmit={handleSubmit}
            >

                {/* ==========================================
                    SKILLS & INTERESTS
                ========================================== */}

                <div className="career-form-section">

                    <div className="career-section-header">

                        <div className="career-section-icon">
                            💻
                        </div>

                        <div>
                            <div className="career-section-label">
                                SKILLS & INTERESTS
                            </div>

                            <h2>
                                Skills & Interests
                            </h2>

                            <p>
                                Add your technical skills and
                                areas you are interested in.
                            </p>
                        </div>

                    </div>


                    <div className="career-form-grid">

                        <div className="career-form-group career-full-width">

                            <label htmlFor="skills">
                                Skills
                            </label>

                            <input
                                id="skills"
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB, Java"
                            />

                            <small>
                                Separate multiple skills with commas.
                            </small>

                        </div>


                        <div className="career-form-group career-full-width">

                            <label htmlFor="interests">
                                Interests
                            </label>

                            <input
                                id="interests"
                                type="text"
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                placeholder="Web Development, AI, Data Science"
                            />

                            <small>
                                Separate multiple interests with commas.
                            </small>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    CAREER PREFERENCES
                ========================================== */}

                <div className="career-form-section">

                    <div className="career-section-header">

                        <div className="career-section-icon">
                            🎯
                        </div>

                        <div>
                            <div className="career-section-label">
                                CAREER PREFERENCES
                            </div>

                            <h2>
                                Career Preferences
                            </h2>

                            <p>
                                Tell us what type of career
                                you are interested in.
                            </p>
                        </div>

                    </div>


                    <div className="career-form-grid">

                        {/* Job Role */}

                        <div className="career-form-group">

                            <label htmlFor="preferredJobRole">
                                Preferred Job Role
                            </label>

                            <input
                                id="preferredJobRole"
                                type="text"
                                name="preferredJobRole"
                                value={
                                    formData.preferredJobRole
                                }
                                onChange={handleChange}
                                placeholder="Software Engineer"
                            />

                        </div>


                        {/* Industry */}

                        <div className="career-form-group">

                            <label htmlFor="preferredIndustry">
                                Preferred Industry
                            </label>

                            <input
                                id="preferredIndustry"
                                type="text"
                                name="preferredIndustry"
                                value={
                                    formData.preferredIndustry
                                }
                                onChange={handleChange}
                                placeholder="Information Technology"
                            />

                        </div>


                        {/* CGPA */}

                        <div className="career-form-group">

                            <label htmlFor="cgpa">
                                CGPA
                            </label>

                            <input
                                id="cgpa"
                                type="number"
                                name="cgpa"
                                value={formData.cgpa}
                                onChange={handleChange}
                                placeholder="8.12"
                                min="0"
                                max="10"
                                step="0.01"
                            />

                            <small>
                                Enter your current CGPA out of 10.
                            </small>

                        </div>


                        {/* Experience */}

                        <div className="career-form-group">

                            <label htmlFor="experienceLevel">
                                Experience Level
                            </label>

                            <select
                                id="experienceLevel"
                                name="experienceLevel"
                                value={
                                    formData.experienceLevel
                                }
                                onChange={handleChange}
                            >

                                <option value="Fresher">
                                    Fresher
                                </option>

                                <option value="Internship Experience">
                                    Internship Experience
                                </option>

                                <option value="Experienced">
                                    Experienced
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    CAREER GOAL
                ========================================== */}

                <div className="career-form-section">

                    <div className="career-section-header">

                        <div className="career-section-icon">
                            🚀
                        </div>

                        <div>
                            <div className="career-section-label">
                                CAREER GOAL
                            </div>

                            <h2>
                                Career Goal
                            </h2>

                            <p>
                                Describe what you want to
                                achieve in your career.
                            </p>
                        </div>

                    </div>


                    <div className="career-form-group">

                        <label htmlFor="careerGoal">
                            Career Goal
                        </label>

                        <textarea
                            id="careerGoal"
                            name="careerGoal"
                            value={formData.careerGoal}
                            onChange={handleChange}
                            placeholder="Example: I want to become a Full Stack Developer and build scalable web applications."
                            rows="5"
                        />

                        <small>
                            Describe your career goal clearly
                            to improve recommendations.
                        </small>

                    </div>

                </div>


                {/* ==========================================
                    ACTIONS
                ========================================== */}

                <div className="career-form-actions">

                    <button
                        type="submit"
                        className="save-career-btn"
                        disabled={saving}
                    >

                        {saving ? (
                            <>
                                <span className="career-save-spinner"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                ✓
                                Save Career Profile
                            </>
                        )}

                    </button>

                </div>

            </form>

        </div>
    );
};

export default CareerProfile;