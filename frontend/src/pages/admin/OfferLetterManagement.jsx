
import { useEffect, useState } from "react";
import "./OfferLetterManagement.css";

const OfferLetterManagement = () => {
    const [offerLetters, setOfferLetters] = useState([]);
    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [downloadingPDF, setDownloadingPDF] = useState(null);

    const [formData, setFormData] = useState({
        student: "",
        application: "",
        company: "",
        job: "",
        offerDate: "",
        joiningDate: "",
        salary: "",
        jobLocation: "",
        offerStatus: "Issued",
        offerLetterFile: "",
        remarks: ""
    });

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH DATA
    // ==========================================

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [offerResponse, applicationResponse] =
                await Promise.all([
                    fetch(
                        "https://smart-college-management-backend.onrender.com/api/offer-letters",
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

            const offerData =
                await offerResponse.json();

            const applicationData =
                await applicationResponse.json();

            if (offerResponse.ok) {
                setOfferLetters(
                    offerData.offerLetters || []
                );
            }

            if (applicationResponse.ok) {
                const applicationList =
                    applicationData.applications || [];

                const eligibleApplications =
                    applicationList.filter(
                        (application) =>
                            application.status === "Selected"
                    );

                setApplications(
                    eligibleApplications
                );
            }

        } catch (error) {
            console.error(
                "Fetch offer letter data error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // ERROR POPUP
    // ==========================================

    const showError = (message) => {
        setErrorMessage(message);
        setShowErrorPopup(true);
    };

    const closeErrorPopup = () => {
        setShowErrorPopup(false);
        setErrorMessage("");
    };

    // ==========================================
    // FORM CHANGE
    // ==========================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    // ==========================================
    // APPLICATION CHANGE
    // ==========================================

    const handleApplicationChange = (event) => {
        const applicationId =
            event.target.value;

        const selectedApplication =
            applications.find(
                (application) =>
                    application._id === applicationId
            );

        if (!selectedApplication) {
            setFormData((previousData) => ({
                ...previousData,
                application: "",
                student: "",
                company: "",
                job: "",
                jobLocation: ""
            }));

            return;
        }

        const student =
            selectedApplication.student || {};

        const job =
            selectedApplication.job || {};

        const company =
            job.company || {};

        setFormData((previousData) => ({
            ...previousData,

            application:
                selectedApplication._id,

            student:
                student._id || "",

            company:
                company._id || "",

            job:
                job._id || "",

            jobLocation:
                job.location || ""
        }));
    };

    // ==========================================
    // CREATE MODAL
    // ==========================================

    const openCreateModal = () => {
        setEditingOffer(null);

        setFormData({
            student: "",
            application: "",
            company: "",
            job: "",
            offerDate: "",
            joiningDate: "",
            salary: "",
            jobLocation: "",
            offerStatus: "Issued",
            offerLetterFile: "",
            remarks: ""
        });

        setShowModal(true);
    };

    // ==========================================
    // EDIT MODAL
    // ==========================================

    const openEditModal = (offer) => {
        setEditingOffer(offer);

        setFormData({
            student:
                offer.student?._id ||
                offer.student ||
                "",

            application:
                offer.application?._id ||
                offer.application ||
                "",

            company:
                offer.company?._id ||
                offer.company ||
                "",

            job:
                offer.job?._id ||
                offer.job ||
                "",

            offerDate: offer.offerDate
                ? new Date(offer.offerDate)
                    .toISOString()
                    .split("T")[0]
                : "",

            joiningDate: offer.joiningDate
                ? new Date(offer.joiningDate)
                    .toISOString()
                    .split("T")[0]
                : "",

            salary:
                offer.salary || "",

            jobLocation:
                offer.jobLocation || "",

            offerStatus:
                offer.offerStatus || "Issued",

            offerLetterFile:
                offer.offerLetterFile || "",

            remarks:
                offer.remarks || ""
        });

        setShowModal(true);
    };

    // ==========================================
    // CREATE / UPDATE OFFER LETTER
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = editingOffer
                ? `https://smart-college-management-backend.onrender.com/api/offer-letters/${editingOffer._id}`
                : "https://smart-college-management-backend.onrender.com/api/offer-letters";

            const method = editingOffer
                ? "PUT"
                : "POST";

            const response = await fetch(
                url,
                {
                    method,

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(
                        formData
                    )
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                showError(
                    data.message ||
                    "Please provide all required offer letter details."
                );

                return;
            }

            setShowModal(false);

            await fetchData();

        } catch (error) {
            console.error(
                "Save offer letter error:",
                error
            );

            showError(
                "Unable to save offer letter. Please try again."
            );
        }
    };

    // ==========================================
    // DELETE OFFER LETTER
    // ==========================================

    const handleDelete = async (offerId) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this offer letter?"
            );

        if (!confirmed) {
            return;
        }

        try {
            const response =
                await fetch(
                    `https://smart-college-management-backend.onrender.com/api/offer-letters/${offerId}`,
                    {
                        method: "DELETE",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            if (response.ok) {
                setOfferLetters(
                    (previousOffers) =>
                        previousOffers.filter(
                            (offer) =>
                                offer._id !==
                                offerId
                        )
                );
            } else {
                showError(
                    data.message ||
                    "Unable to delete offer letter."
                );
            }

        } catch (error) {
            console.error(
                "Delete offer letter error:",
                error
            );

            showError(
                "Unable to delete offer letter. Please try again."
            );
        }
    };

    // ==========================================
    // DOWNLOAD OFFER LETTER PDF
    // ==========================================

    const handleDownloadPDF = async (offerId) => {
        try {
            setDownloadingPDF(offerId);

            const response =
                await fetch(
                    `https://smart-college-management-backend.onrender.com/api/offer-letters/${offerId}/pdf`,
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (!response.ok) {
                let message =
                    "Unable to download offer letter PDF.";

                try {
                    const data =
                        await response.json();

                    message =
                        data.message ||
                        message;

                } catch (error) {
                    console.error(
                        "PDF error response:",
                        error
                    );
                }

                showError(message);

                return;
            }

            const blob =
                await response.blob();

            const url =
                window.URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement("a");

            link.href = url;

            const studentName =
                offerLetters.find(
                    (offer) =>
                        offer._id === offerId
                )?.student?.fullName ||
                "student";

            const safeStudentName =
                studentName
                    .replace(
                        /[^a-zA-Z0-9]/g,
                        "-"
                    )
                    .toLowerCase();

            link.download =
                `offer-letter-${safeStudentName}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(
                "Download offer letter PDF error:",
                error
            );

            showError(
                "Unable to download offer letter PDF. Please try again."
            );

        } finally {
            setDownloadingPDF(null);
        }
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(
            date
        ).toLocaleDateString(
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
            case "Issued":
                return "offer-status-issued";

            case "Accepted":
                return "offer-status-accepted";

            case "Declined":
                return "offer-status-declined";

            case "Cancelled":
                return "offer-status-cancelled";

            default:
                return "offer-status-issued";
        }
    };

    // ==========================================
    // HELPER FUNCTIONS
    // ==========================================

    const getStudentName = (student) => {
        return student?.fullName || "-";
    };

    const getCompanyName = (company) => {
        return company?.name || "-";
    };

    const getJobTitle = (job) => {
        return job?.jobTitle || "-";
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="offer-management-loading">

                <div className="offer-management-loader"></div>

                <p>
                    Loading offer letters...
                </p>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="offer-management-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="offer-management-header">

                <div>

                    <div className="offer-management-breadcrumb">
                        Admin Portal › Placement › Offer Letters
                    </div>

                    <h1>
                        Offer Letter Management
                    </h1>

                    <p>
                        Create and manage student placement offer letters.
                    </p>

                </div>

                <button
                    className="add-offer-btn"
                    onClick={openCreateModal}
                >
                    + Create Offer Letter
                </button>

            </div>


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="offer-management-summary">

                <div className="offer-summary-box">

                    <span>📄</span>

                    <div>

                        <small>
                            Total Offers
                        </small>

                        <strong>
                            {offerLetters.length}
                        </strong>

                    </div>

                </div>


                <div className="offer-summary-box">

                    <span>📤</span>

                    <div>

                        <small>
                            Issued
                        </small>

                        <strong>
                            {
                                offerLetters.filter(
                                    (offer) =>
                                        offer.offerStatus ===
                                        "Issued"
                                ).length
                            }
                        </strong>

                    </div>

                </div>


                <div className="offer-summary-box">

                    <span>✓</span>

                    <div>

                        <small>
                            Accepted
                        </small>

                        <strong>
                            {
                                offerLetters.filter(
                                    (offer) =>
                                        offer.offerStatus ===
                                        "Accepted"
                                ).length
                            }
                        </strong>

                    </div>

                </div>


                <div className="offer-summary-box">

                    <span>✕</span>

                    <div>

                        <small>
                            Declined
                        </small>

                        <strong>
                            {
                                offerLetters.filter(
                                    (offer) =>
                                        offer.offerStatus ===
                                        "Declined"
                                ).length
                            }
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==========================================
                EMPTY STATE
            ========================================== */}

            {offerLetters.length === 0 ? (

                <div className="offer-management-empty">

                    <div className="empty-offer-icon">
                        📄
                    </div>

                    <h2>
                        No Offer Letters Found
                    </h2>

                    <p>
                        Create an offer letter for a selected student.
                    </p>

                    <button
                        className="empty-create-offer-btn"
                        onClick={openCreateModal}
                    >
                        Create Offer Letter
                    </button>

                </div>

            ) : (

                /* ==========================================
                   OFFER TABLE
                ========================================== */

                <div className="offer-table-container">

                    <table className="offer-table">

                        <thead>

                            <tr>

                                <th>
                                    Student
                                </th>

                                <th>
                                    Company
                                </th>

                                <th>
                                    Job
                                </th>

                                <th>
                                    Offer Date
                                </th>

                                <th>
                                    Joining Date
                                </th>

                                <th>
                                    Salary
                                </th>

                                <th>
                                    Location
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {offerLetters.map(
                                (offer) => {

                                    const student =
                                        offer.student || {};

                                    const company =
                                        offer.company || {};

                                    const job =
                                        offer.job || {};

                                    return (

                                        <tr
                                            key={
                                                offer._id
                                            }
                                        >

                                            {/* STUDENT */}

                                            <td>

                                                <div className="offer-student-info">

                                                    <div className="offer-student-avatar">

                                                        {
                                                            getStudentName(
                                                                student
                                                            )
                                                                ?.charAt(0)
                                                                ?.toUpperCase() ||
                                                            "S"
                                                        }

                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {
                                                                getStudentName(
                                                                    student
                                                                )
                                                            }
                                                        </strong>

                                                        <span>
                                                            {
                                                                student.email ||
                                                                "-"
                                                            }
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* COMPANY */}

                                            <td>
                                                {
                                                    getCompanyName(
                                                        company
                                                    )
                                                }
                                            </td>


                                            {/* JOB */}

                                            <td>
                                                {
                                                    getJobTitle(
                                                        job
                                                    )
                                                }
                                            </td>


                                            {/* OFFER DATE */}

                                            <td>
                                                {
                                                    formatDate(
                                                        offer.offerDate
                                                    )
                                                }
                                            </td>


                                            {/* JOINING DATE */}

                                            <td>
                                                {
                                                    formatDate(
                                                        offer.joiningDate
                                                    )
                                                }
                                            </td>


                                            {/* SALARY */}

                                            <td>
                                                ₹ {offer.salary || "-"}
                                            </td>


                                            {/* LOCATION */}

                                            <td>
                                                📍 {offer.jobLocation || "-"}
                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`offer-status-badge ${getStatusClass(
                                                        offer.offerStatus
                                                    )}`}
                                                >
                                                    {
                                                        offer.offerStatus ||
                                                        "Issued"
                                                    }
                                                </span>

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="offer-actions">

                                                    {/* PDF BUTTON */}

                                                    <button
                                                        className="download-offer-btn"
                                                        onClick={() =>
                                                            handleDownloadPDF(
                                                                offer._id
                                                            )
                                                        }
                                                        disabled={
                                                            downloadingPDF ===
                                                            offer._id
                                                        }
                                                    >

                                                        {
                                                            downloadingPDF ===
                                                            offer._id
                                                                ? "Downloading..."
                                                                : "↓ PDF"
                                                        }

                                                    </button>


                                                    {/* EDIT */}

                                                    <button
                                                        className="edit-offer-btn"
                                                        onClick={() =>
                                                            openEditModal(
                                                                offer
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        className="delete-offer-btn"
                                                        onClick={() =>
                                                            handleDelete(
                                                                offer._id
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
                CREATE / EDIT MODAL
            ========================================== */}

            {showModal && (

                <div className="offer-modal-overlay">

                    <div className="offer-modal">

                        <div className="offer-modal-header">

                            <div>

                                <h2>
                                    {
                                        editingOffer
                                            ? "Edit Offer Letter"
                                            : "Create Offer Letter"
                                    }
                                </h2>

                                <p>
                                    Add student offer details
                                </p>

                            </div>


                            <button
                                className="offer-modal-close"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <form
                            className="offer-form"
                            onSubmit={
                                handleSubmit
                            }
                        >

                            {/* APPLICATION */}

                            <div className="offer-form-group">

                                <label>
                                    Selected Student Application *
                                </label>

                                <select
                                    name="application"
                                    value={
                                        formData.application
                                    }
                                    onChange={
                                        handleApplicationChange
                                    }
                                    required
                                    disabled={
                                        !!editingOffer
                                    }
                                >

                                    <option value="">
                                        Select Selected Application
                                    </option>

                                    {applications.map(
                                        (application) => {

                                            const student =
                                                application.student || {};

                                            const job =
                                                application.job || {};

                                            const company =
                                                job.company || {};

                                            return (

                                                <option
                                                    key={
                                                        application._id
                                                    }
                                                    value={
                                                        application._id
                                                    }
                                                >

                                                    {
                                                        student.fullName ||
                                                        "-"
                                                    }

                                                    {" — "}

                                                    {
                                                        job.jobTitle ||
                                                        "-"
                                                    }

                                                    {" — "}

                                                    {
                                                        company.name ||
                                                        "-"
                                                    }

                                                </option>

                                            );

                                        }
                                    )}

                                </select>

                                {applications.length === 0 && (

                                    <small className="offer-form-help">
                                        Only selected applications are available.
                                    </small>

                                )}

                            </div>


                            {/* FORM GRID */}

                            <div className="offer-form-grid">

                                {/* OFFER DATE */}

                                <div className="offer-form-group">

                                    <label>
                                        Offer Date *
                                    </label>

                                    <input
                                        type="date"
                                        name="offerDate"
                                        value={
                                            formData.offerDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* JOINING DATE */}

                                <div className="offer-form-group">

                                    <label>
                                        Joining Date *
                                    </label>

                                    <input
                                        type="date"
                                        name="joiningDate"
                                        value={
                                            formData.joiningDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* SALARY */}

                                <div className="offer-form-group">

                                    <label>
                                        Salary / CTC *
                                    </label>

                                    <input
                                        type="text"
                                        name="salary"
                                        value={
                                            formData.salary
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. ₹6.8 LPA"
                                        required
                                    />

                                </div>


                                {/* LOCATION */}

                                <div className="offer-form-group">

                                    <label>
                                        Job Location *
                                    </label>

                                    <input
                                        type="text"
                                        name="jobLocation"
                                        value={
                                            formData.jobLocation
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. Pune"
                                        required
                                    />

                                </div>


                                {/* STATUS */}

                                <div className="offer-form-group">

                                    <label>
                                        Offer Status
                                    </label>

                                    <select
                                        name="offerStatus"
                                        value={
                                            formData.offerStatus
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="Issued">
                                            Issued
                                        </option>

                                        <option value="Accepted">
                                            Accepted
                                        </option>

                                        <option value="Declined">
                                            Declined
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* REMARKS */}

                            <div className="offer-form-group">

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
                                    rows="4"
                                    placeholder="Additional offer information..."
                                ></textarea>

                            </div>


                            {/* FORM ACTIONS */}

                            <div className="offer-form-actions">

                                <button
                                    type="button"
                                    className="offer-cancel-btn"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="offer-save-btn"
                                >

                                    {
                                        editingOffer
                                            ? "Update Offer Letter"
                                            : "Create Offer Letter"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* ==========================================
                ERROR POPUP
            ========================================== */}

            {showErrorPopup && (

                <div className="offer-error-overlay">

                    <div className="offer-error-popup">

                        <div className="offer-error-icon">
                            !
                        </div>

                        <div className="offer-error-content">

                            <h3>
                                Unable to Create Offer
                            </h3>

                            <p>
                                {errorMessage}
                            </p>

                        </div>

                        <button
                            className="offer-error-close"
                            onClick={
                                closeErrorPopup
                            }
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
};

export default OfferLetterManagement;


