
import { useEffect, useState } from "react";
import "./AdmissionDetails.css";

function AdmissionDetails() {
    const [admission, setAdmission] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        course: "",
        branch: "",
        admissionYear: ""
    });

    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchAdmission = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/admissions/my-admission",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setAdmission(data.admission);
            }
        } catch (error) {
            console.log("Admission fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmission();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/admissions/apply",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        course: formData.course,
                        branch: formData.branch,
                        admissionYear: Number(formData.admissionYear)
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setAdmission(data.admission);

                setFormData({
                    course: "",
                    branch: "",
                    admissionYear: ""
                });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log("Admission apply error:", error);
            setMessage("Unable to connect to server");
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="admission-page">
                <div className="admission-loading">
                    <div className="admission-loader"></div>
                    <p>Loading admission details...</p>
                </div>
            </div>
        );
    }

    // ==========================================
    // NO ADMISSION
    // ==========================================

    if (!admission) {
        return (
            <div className="admission-page">

                <div className="admission-header">

                    <div className="admission-header-icon">
                        🎓
                    </div>

                    <div>
                        <h1>Admission Details</h1>

                        <p>
                            Apply for college admission
                        </p>
                    </div>

                </div>

                <div className="admission-card apply-card">

                    <div className="card-title-section">

                        <div className="card-title-icon">
                            📝
                        </div>

                        <div>
                            <h2>
                                Apply for Admission
                            </h2>

                            <p>
                                Enter your academic information
                                to submit your admission application.
                            </p>
                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* COURSE */}

                        <div className="admission-form-group">

                            <label>
                                Course
                            </label>

                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Course
                                </option>

                                <option value="B.E.">
                                    B.E.
                                </option>

                                <option value="B.Tech">
                                    B.Tech
                                </option>
                            </select>

                        </div>

                        {/* BRANCH */}

                        <div className="admission-form-group">

                            <label>
                                Branch
                            </label>

                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Branch
                                </option>

                                <option value="Computer Science & Engineering">
                                    Computer Science & Engineering
                                </option>

                                <option value="Artificial Intelligence & Machine Learning">
                                    Artificial Intelligence & Machine Learning
                                </option>

                                <option value="Information Technology">
                                    Information Technology
                                </option>

                                <option value="Electronics & Communication Engineering">
                                    Electronics & Communication Engineering
                                </option>
                            </select>

                        </div>

                        {/* ADMISSION YEAR */}

                        <div className="admission-form-group">

                            <label>
                                Admission Year
                            </label>

                            <input
                                type="number"
                                name="admissionYear"
                                placeholder="Enter admission year"
                                value={formData.admissionYear}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="apply-admission-btn"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Submitting..."
                                : "Apply for Admission"}
                        </button>

                    </form>

                    {message && (
                        <p className="admission-message">
                            {message}
                        </p>
                    )}

                </div>

            </div>
        );
    }

    // ==========================================
    // ADMISSION STATUS
    // ==========================================

    const status = admission.status?.toLowerCase();

    const statusClass =
        status === "approved"
            ? "status-approved"
            : status === "rejected"
                ? "status-rejected"
                : "status-pending";

    const statusIcon =
        status === "approved"
            ? "✓"
            : status === "rejected"
                ? "!"
                : "⏳";

    const statusTitle =
        status === "approved"
            ? "Admission Approved"
            : status === "rejected"
                ? "Admission Rejected"
                : "Admission Under Review";

    const statusMessage =
        status === "approved"
            ? "Your admission has been successfully approved by the administration."
            : status === "rejected"
                ? "Your admission application has been rejected by the administration."
                : "Your admission application is currently being reviewed.";

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const admissionDate = admission.createdAt
        ? new Date(admission.createdAt).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        )
        : "-";

    // ==========================================
    // ADMISSION DETAILS
    // ==========================================

    return (
        <div className="admission-page">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="admission-header">

                <div className="admission-header-icon">
                    🎓
                </div>

                <div>
                    <h1>
                        Admission Details
                    </h1>

                    <p>
                        View your college admission information
                    </p>
                </div>

            </div>


            {/* ==========================================
                STATUS BANNER
            ========================================== */}

            <div className={`admission-status-banner ${statusClass}`}>

                <div className="status-banner-icon">
                    {statusIcon}
                </div>

                <div className="status-banner-content">

                    <span>
                        {statusTitle}
                    </span>

                    <p>
                        {statusMessage}
                    </p>

                </div>

            </div>


            {/* ==========================================
                MAIN ADMISSION CARD
            ========================================== */}

            <div className="admission-card">

                {/* ==========================================
                    STATUS
                ========================================== */}

                <div className="admission-status-section">

                    <div>

                        <span className="section-label">
                            Admission Status
                        </span>

                        <h2>
                            {admission.status}
                        </h2>

                    </div>

                    <div className={`status-badge ${statusClass}`}>

                        <span>
                            {statusIcon}
                        </span>

                        {admission.status}

                    </div>

                </div>


                {/* ==========================================
                    STUDENT INFORMATION
                ========================================== */}

                <div className="admission-info-section">

                    <div className="section-heading">

                        <div className="section-heading-icon">
                            👤
                        </div>

                        <div>
                            <h3>
                                Student Information
                            </h3>

                            <p>
                                Your registered student details
                            </p>
                        </div>

                    </div>


                    <div className="admission-details-grid">

                        <div className="admission-field student-id-field">

                            <span>
                                Student ID
                            </span>

                            <strong>
                                {admission.student}
                            </strong>

                        </div>

                        <div className="admission-field">

                            <span>
                                Admission Year
                            </span>

                            <strong>
                                {admission.admissionYear}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    ACADEMIC INFORMATION
                ========================================== */}

                <div className="admission-info-section">

                    <div className="section-heading">

                        <div className="section-heading-icon">
                            📚
                        </div>

                        <div>
                            <h3>
                                Academic Information
                            </h3>

                            <p>
                                Your selected course and branch
                            </p>
                        </div>

                    </div>


                    <div className="admission-details-grid">

                        <div className="admission-field">

                            <span>
                                Course
                            </span>

                            <strong>
                                {admission.course}
                            </strong>

                        </div>


                        <div className="admission-field">

                            <span>
                                Branch
                            </span>

                            <strong>
                                {admission.branch}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    ADMISSION INFORMATION
                ========================================== */}

                <div className="admission-info-section">

                    <div className="section-heading">

                        <div className="section-heading-icon">
                            📅
                        </div>

                        <div>
                            <h3>
                                Admission Information
                            </h3>

                            <p>
                                Important admission details
                            </p>

                        </div>

                    </div>


                    <div className="admission-details-grid">

                        <div className="admission-field">

                            <span>
                                Enrollment Number
                            </span>

                            <strong className="not-assigned">
                                Not Assigned
                            </strong>

                            <small>
                                Will be provided by administration
                            </small>

                        </div>


                        <div className="admission-field">

                            <span>
                                Admission Date
                            </span>

                            <strong>
                                {admissionDate}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    ADMISSION TIMELINE
                ========================================== */}

                <div className="admission-info-section">

                    <div className="section-heading">

                        <div className="section-heading-icon">
                            🕐
                        </div>

                        <div>
                            <h3>
                                Admission Timeline
                            </h3>

                            <p>
                                Track your admission application status
                            </p>
                        </div>

                    </div>


                    <div className="admission-timeline">

                        <div className="timeline-item completed">

                            <div className="timeline-icon">
                                ✓
                            </div>

                            <div className="timeline-content">

                                <strong>
                                    Application Submitted
                                </strong>

                                <span>
                                    {admissionDate}
                                </span>

                            </div>

                        </div>


                        <div className="timeline-line"></div>


                        <div
                            className={
                                status === "pending"
                                    ? "timeline-item current"
                                    : "timeline-item completed"
                            }
                        >

                            <div className="timeline-icon">
                                {status === "pending"
                                    ? "⏳"
                                    : "✓"}
                            </div>

                            <div className="timeline-content">

                                <strong>
                                    Application Reviewed
                                </strong>

                                <span>
                                    {status === "pending"
                                        ? "Currently under review"
                                        : "Application reviewed by administration"}
                                </span>

                            </div>

                        </div>


                        <div className="timeline-line"></div>


                        <div
                            className={
                                status === "approved"
                                    ? "timeline-item completed"
                                    : status === "rejected"
                                        ? "timeline-item rejected"
                                        : "timeline-item"
                            }
                        >

                            <div className="timeline-icon">

                                {status === "approved"
                                    ? "✓"
                                    : status === "rejected"
                                        ? "!"
                                        : "○"}

                            </div>

                            <div className="timeline-content">

                                <strong>
                                    Admission Decision
                                </strong>

                                <span>
                                    {status === "approved"
                                        ? "Admission approved"
                                        : status === "rejected"
                                            ? "Admission rejected"
                                            : "Waiting for final decision"}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    FOOTER NOTE
                ========================================== */}

                <div className="admission-footer-note">

                    <span>
                        💡
                    </span>

                    <p>
                        If any admission information appears incorrect,
                        please contact the college administration.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AdmissionDetails;