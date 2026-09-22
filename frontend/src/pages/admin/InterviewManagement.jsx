
import { useEffect, useState } from "react";
import "./InterviewManagement.css";

const InterviewManagement = () => {
    const [interviews, setInterviews] = useState([]);
    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [editingInterview, setEditingInterview] = useState(null);

    const [formData, setFormData] = useState({
        application: "",
        interviewType: "Online",
        interviewRound: "Technical",
        interviewDate: "",
        interviewTime: "",
        meetingLink: "",
        venue: "",
        interviewer: "",
        status: "Scheduled",
        remarks: ""
    });

    const token = localStorage.getItem("token");


    // ==========================================
    // FETCH INTERVIEWS
    // ==========================================

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [interviewResponse, applicationResponse] =
                await Promise.all([
                    fetch(
                        "https://smart-college-management-backend.onrender.com/api/interviews",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    ),

                    fetch(
                        "https://smart-college-management-backend.onrender.com/api/job-applications",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                ]);

            const interviewData =
                await interviewResponse.json();

            const applicationData =
                await applicationResponse.json();

            if (interviewResponse.ok) {
                setInterviews(
                    interviewData.interviews || []
                );
            }

            if (applicationResponse.ok) {
                const applicationList =
                    applicationData.applications || [];

                // Only shortlisted / selected applications
                const eligibleApplications =
                    applicationList.filter(
                        (application) =>
                            application.status === "Shortlisted" ||
                            application.status === "Selected"
                    );

                setApplications(
                    eligibleApplications
                );
            }

        } catch (error) {
            console.error(
                "Fetch interview data error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // HANDLE FORM INPUT
    // ==========================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };


    // ==========================================
    // OPEN CREATE MODAL
    // ==========================================

    const openCreateModal = () => {
        setEditingInterview(null);

        setFormData({
            application: "",
            interviewType: "Online",
            interviewRound: "Technical",
            interviewDate: "",
            interviewTime: "",
            meetingLink: "",
            venue: "",
            interviewer: "",
            status: "Scheduled",
            remarks: ""
        });

        setShowModal(true);
    };


    // ==========================================
    // OPEN EDIT MODAL
    // ==========================================

    const openEditModal = (interview) => {
        setEditingInterview(interview);

        const applicationId =
            interview.application?._id ||
            interview.application ||
            "";

        setFormData({
            application: applicationId,
            interviewType:
                interview.interviewType || "Online",

            interviewRound:
                interview.interviewRound || "Technical",

            interviewDate: interview.interviewDate
                ? new Date(interview.interviewDate)
                    .toISOString()
                    .split("T")[0]
                : "",

            interviewTime:
                interview.interviewTime || "",

            meetingLink:
                interview.meetingLink || "",

            venue:
                interview.venue || "",

            interviewer:
                interview.interviewer || "",

            status:
                interview.status || "Scheduled",

            remarks:
                interview.remarks || ""
        });

        setShowModal(true);
    };


    // ==========================================
    // CREATE / UPDATE INTERVIEW
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = editingInterview
                ? `https://smart-college-management-backend.onrender.com/api/interviews/${editingInterview._id}`
                : "https://smart-college-management-backend.onrender.com/api/interviews";

            const method = editingInterview
                ? "PUT"
                : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Unable to save interview"
                );

                return;
            }

            setShowModal(false);

            await fetchData();

        } catch (error) {
            console.error(
                "Save interview error:",
                error
            );

            alert(
                "Unable to save interview"
            );
        }
    };


    // ==========================================
    // DELETE INTERVIEW
    // ==========================================

    const handleDelete = async (interviewId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this interview?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `https://smart-college-management-backend.onrender.com/api/interviews/${interviewId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setInterviews(
                    (previousInterviews) =>
                        previousInterviews.filter(
                            (interview) =>
                                interview._id !== interviewId
                        )
                );
            } else {
                alert(
                    data.message ||
                    "Unable to delete interview"
                );
            }

        } catch (error) {
            console.error(
                "Delete interview error:",
                error
            );

            alert(
                "Unable to delete interview"
            );
        }
    };


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
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {
        switch (status) {
            case "Scheduled":
                return "interview-status-scheduled";

            case "Completed":
                return "interview-status-completed";

            case "Cancelled":
                return "interview-status-cancelled";

            default:
                return "interview-status-scheduled";
        }
    };


    // ==========================================
    // GET STUDENT NAME
    // ==========================================

    const getStudentName = (application) => {
        return (
            application?.student?.fullName ||
            "-"
        );
    };


    // ==========================================
    // GET JOB TITLE
    // ==========================================

    const getJobTitle = (application) => {
        return (
            application?.job?.jobTitle ||
            "-"
        );
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="interview-management-loading">
                <div className="interview-management-loader"></div>

                <p>
                    Loading interviews...
                </p>
            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="interview-management-page">

            {/* HEADER */}

            <div className="interview-management-header">

                <div>

                    <div className="interview-management-breadcrumb">
                        Admin Portal › Placement › Interviews
                    </div>

                    <h1>
                        Interview Management
                    </h1>

                    <p>
                        Schedule and manage student placement interviews.
                    </p>

                </div>


                <button
                    className="add-interview-btn"
                    onClick={openCreateModal}
                >
                    + Schedule Interview
                </button>

            </div>


            {/* SUMMARY */}

            <div className="interview-management-summary">

                <div className="interview-summary-box">
                    <span>📅</span>

                    <div>
                        <small>
                            Total Interviews
                        </small>

                        <strong>
                            {interviews.length}
                        </strong>
                    </div>
                </div>


                <div className="interview-summary-box">
                    <span>🕐</span>

                    <div>
                        <small>
                            Scheduled
                        </small>

                        <strong>
                            {
                                interviews.filter(
                                    (interview) =>
                                        interview.status ===
                                        "Scheduled"
                                ).length
                            }
                        </strong>
                    </div>
                </div>


                <div className="interview-summary-box">
                    <span>✓</span>

                    <div>
                        <small>
                            Completed
                        </small>

                        <strong>
                            {
                                interviews.filter(
                                    (interview) =>
                                        interview.status ===
                                        "Completed"
                                ).length
                            }
                        </strong>
                    </div>
                </div>


                <div className="interview-summary-box">
                    <span>✕</span>

                    <div>
                        <small>
                            Cancelled
                        </small>

                        <strong>
                            {
                                interviews.filter(
                                    (interview) =>
                                        interview.status ===
                                        "Cancelled"
                                ).length
                            }
                        </strong>
                    </div>
                </div>

            </div>


            {/* EMPTY STATE */}

            {interviews.length === 0 ? (

                <div className="interview-management-empty">

                    <div className="empty-interview-icon">
                        📅
                    </div>

                    <h2>
                        No Interviews Scheduled
                    </h2>

                    <p>
                        Schedule an interview for a shortlisted
                        or selected student.
                    </p>

                    <button
                        className="empty-schedule-btn"
                        onClick={openCreateModal}
                    >
                        Schedule Interview
                    </button>

                </div>

            ) : (

                /* TABLE */

                <div className="interview-table-container">

                    <table className="interview-table">

                        <thead>

                            <tr>
                                <th>Student</th>
                                <th>Job</th>
                                <th>Round</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Interviewer</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>


                        <tbody>

                            {interviews.map(
                                (interview) => {

                                    const application =
                                        interview.application ||
                                        {};

                                    return (
                                        <tr
                                            key={
                                                interview._id
                                            }
                                        >

                                            {/* STUDENT */}

                                            <td>

                                                <div className="interview-student-info">

                                                    <div className="interview-student-avatar">

                                                        {
                                                            getStudentName(
                                                                application
                                                            )
                                                                ?.charAt(
                                                                    0
                                                                )
                                                                ?.toUpperCase() ||
                                                            "S"
                                                        }

                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {
                                                                getStudentName(
                                                                    application
                                                                )
                                                            }
                                                        </strong>

                                                        <span>
                                                            {
                                                                application
                                                                    ?.student
                                                                    ?.email ||
                                                                "-"
                                                            }
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* JOB */}

                                            <td>

                                                <strong>
                                                    {
                                                        getJobTitle(
                                                            application
                                                        )
                                                    }
                                                </strong>

                                                <span className="interview-table-subtext">

                                                    {
                                                        application
                                                            ?.job
                                                            ?.company
                                                            ?.name ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* ROUND */}

                                            <td>

                                                <span className="round-badge">

                                                    {
                                                        interview.interviewRound ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* TYPE */}

                                            <td>
                                                {
                                                    interview.interviewType ||
                                                    "-"
                                                }
                                            </td>


                                            {/* DATE */}

                                            <td>
                                                {
                                                    formatDate(
                                                        interview.interviewDate
                                                    )
                                                }
                                            </td>


                                            {/* TIME */}

                                            <td>
                                                {
                                                    interview.interviewTime ||
                                                    "-"
                                                }
                                            </td>


                                            {/* INTERVIEWER */}

                                            <td>
                                                {
                                                    interview.interviewer ||
                                                    "-"
                                                }
                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`interview-status-badge ${getStatusClass(
                                                        interview.status
                                                    )}`}
                                                >
                                                    {
                                                        interview.status ||
                                                        "Scheduled"
                                                    }
                                                </span>

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="interview-actions">

                                                    <button
                                                        className="edit-interview-btn"
                                                        onClick={() =>
                                                            openEditModal(
                                                                interview
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="delete-interview-btn"
                                                        onClick={() =>
                                                            handleDelete(
                                                                interview._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                }
                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {/* ==========================================
                MODAL
            ========================================== */}

            {showModal && (

                <div className="interview-modal-overlay">

                    <div className="interview-modal">

                        <div className="interview-modal-header">

                            <div>

                                <h2>
                                    {
                                        editingInterview
                                            ? "Edit Interview"
                                            : "Schedule Interview"
                                    }
                                </h2>

                                <p>
                                    Add interview details
                                </p>

                            </div>

                            <button
                                className="interview-modal-close"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <form
                            className="interview-form"
                            onSubmit={handleSubmit}
                        >

                            {/* APPLICATION */}

                            <div className="interview-form-group">

                                <label>
                                    Student Application *
                                </label>

                                <select
                                    name="application"
                                    value={
                                        formData.application
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    disabled={
                                        !!editingInterview
                                    }
                                >

                                    <option value="">
                                        Select Student Application
                                    </option>

                                    {applications.map(
                                        (application) => {

                                            const student =
                                                getStudentName(
                                                    application
                                                );

                                            const job =
                                                getJobTitle(
                                                    application
                                                );

                                            return (
                                                <option
                                                    key={
                                                        application._id
                                                    }
                                                    value={
                                                        application._id
                                                    }
                                                >
                                                    {student} — {job}
                                                </option>
                                            );
                                        }
                                    )}

                                </select>

                                {applications.length === 0 && (
                                    <small className="form-help-text">
                                        Only shortlisted or selected
                                        applications are available.
                                    </small>
                                )}

                            </div>


                            {/* TWO COLUMN */}

                            <div className="interview-form-grid">

                                <div className="interview-form-group">

                                    <label>
                                        Interview Type *
                                    </label>

                                    <select
                                        name="interviewType"
                                        value={
                                            formData.interviewType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    >

                                        <option value="Online">
                                            Online
                                        </option>

                                        <option value="Offline">
                                            Offline
                                        </option>

                                    </select>

                                </div>


                                <div className="interview-form-group">

                                    <label>
                                        Interview Round *
                                    </label>

                                    <select
                                        name="interviewRound"
                                        value={
                                            formData.interviewRound
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    >

                                        <option value="Aptitude">
                                            Aptitude
                                        </option>

                                        <option value="Technical">
                                            Technical
                                        </option>

                                        <option value="HR">
                                            HR
                                        </option>

                                        <option value="Managerial">
                                            Managerial
                                        </option>

                                        <option value="Final">
                                            Final
                                        </option>

                                    </select>

                                </div>


                                <div className="interview-form-group">

                                    <label>
                                        Interview Date *
                                    </label>

                                    <input
                                        type="date"
                                        name="interviewDate"
                                        value={
                                            formData.interviewDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="interview-form-group">

                                    <label>
                                        Interview Time *
                                    </label>

                                    <input
                                        type="time"
                                        name="interviewTime"
                                        value={
                                            formData.interviewTime
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="interview-form-group">

                                    <label>
                                        Interviewer
                                    </label>

                                    <input
                                        type="text"
                                        name="interviewer"
                                        value={
                                            formData.interviewer
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. HR Manager"
                                    />

                                </div>


                                <div className="interview-form-group">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={
                                            formData.status
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="Scheduled">
                                            Scheduled
                                        </option>

                                        <option value="Completed">
                                            Completed
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* ONLINE */}

                            {formData.interviewType ===
                                "Online" && (

                                <div className="interview-form-group">

                                    <label>
                                        Meeting Link
                                    </label>

                                    <input
                                        type="url"
                                        name="meetingLink"
                                        value={
                                            formData.meetingLink
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="https://meet.google.com/..."
                                    />

                                </div>

                            )}


                            {/* OFFLINE */}

                            {formData.interviewType ===
                                "Offline" && (

                                <div className="interview-form-group">

                                    <label>
                                        Venue
                                    </label>

                                    <input
                                        type="text"
                                        name="venue"
                                        value={
                                            formData.venue
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Interview venue"
                                    />

                                </div>

                            )}


                            {/* REMARKS */}

                            <div className="interview-form-group">

                                <label>
                                    Remarks
                                </label>

                                <textarea
                                    name="remarks"
                                    value={
                                        formData.remarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="3"
                                    placeholder="Additional interview information..."
                                ></textarea>

                            </div>


                            {/* BUTTONS */}

                            <div className="interview-form-actions">

                                <button
                                    type="button"
                                    className="interview-cancel-btn"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="interview-save-btn"
                                >
                                    {
                                        editingInterview
                                            ? "Update Interview"
                                            : "Schedule Interview"
                                    }
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default InterviewManagement;

