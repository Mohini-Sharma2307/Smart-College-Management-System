
import { useEffect, useState } from "react";
import "./PlacementRecordManagement.css";

const PlacementRecordManagement = () => {

    const [records, setRecords] = useState([]);
    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const token = localStorage.getItem("token");


    // ==========================================
    // FORM DATA
    // ==========================================

    const initialForm = {
        student: "",
        application: "",
        company: "",
        job: "",
        offerLetter: "",
        offerDate: "",
        joiningDate: "",
        salary: "",
        jobLocation: "",
        placementYear: new Date().getFullYear(),
        status: "Placed",
        remarks: ""
    };

    const [formData, setFormData] = useState(initialForm);


    // ==========================================
    // FETCH DATA
    // ==========================================

    useEffect(() => {
        fetchRecords();
        fetchApplications();
    }, []);


    // ==========================================
    // FETCH PLACEMENT RECORDS
    // ==========================================

    const fetchRecords = async () => {

        try {

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/placement-records",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setRecords(data.records || []);
            } else {
                showError(
                    data.message ||
                    "Unable to fetch placement records."
                );
            }

        } catch (error) {

            console.error(
                "Fetch placement records error:",
                error
            );

            showError(
                "Unable to fetch placement records."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // FETCH SELECTED APPLICATIONS
    // ==========================================

    const fetchApplications = async () => {

        try {

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/job-applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {

                const selectedApplications =
                    (data.applications || []).filter(
                        (application) =>
                            application.status === "Selected"
                    );

                setApplications(
                    selectedApplications
                );

            }

        } catch (error) {

            console.error(
                "Fetch applications error:",
                error
            );

        }

    };


    // ==========================================
    // ERROR MESSAGE
    // ==========================================

    const showError = (message) => {

        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage("");
        }, 4000);

    };


    // ==========================================
    // SUCCESS MESSAGE
    // ==========================================

    const showSuccess = (message) => {

        setSuccessMessage(message);

        setTimeout(() => {
            setSuccessMessage("");
        }, 4000);

    };


    // ==========================================
    // FORM INPUT CHANGE
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
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

            setFormData((previous) => ({
                ...previous,
                application: "",
                student: "",
                company: "",
                job: "",
                offerLetter: "",
                offerDate: "",
                joiningDate: "",
                salary: "",
                jobLocation: ""
            }));

            return;
        }


        const job =
            selectedApplication.job;

        const company =
            job?.company;


        setFormData((previous) => ({
            ...previous,

            application:
                selectedApplication._id,

            student:
                selectedApplication.student?._id || "",

            company:
                company?._id || "",

            job:
                job?._id || "",

            offerLetter: "",

            offerDate:
                "",

            joiningDate:
                "",

            salary:
                job?.salary || "",

            jobLocation:
                job?.location || ""
        }));

    };


    // ==========================================
    // OPEN CREATE MODAL
    // ==========================================

    const openCreateModal = () => {

        setEditingId(null);

        setFormData(initialForm);

        setShowModal(true);

    };


    // ==========================================
    // OPEN EDIT MODAL
    // ==========================================

    const openEditModal = (record) => {

        setEditingId(record._id);

        setFormData({

            student:
                record.student?._id || "",

            application:
                record.application?._id || "",

            company:
                record.company?._id || "",

            job:
                record.job?._id || "",

            offerLetter:
                record.offerLetter?._id || "",

            offerDate:
                record.offerDate
                    ? record.offerDate.slice(0, 10)
                    : "",

            joiningDate:
                record.joiningDate
                    ? record.joiningDate.slice(0, 10)
                    : "",

            salary:
                record.salary || "",

            jobLocation:
                record.jobLocation || "",

            placementYear:
                record.placementYear ||
                new Date().getFullYear(),

            status:
                record.status || "Placed",

            remarks:
                record.remarks || ""
        });

        setShowModal(true);

    };


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    const closeModal = () => {

        if (saving) return;

        setShowModal(false);

        setEditingId(null);

        setFormData(initialForm);

    };


    // ==========================================
    // SUBMIT FORM
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);


            const url = editingId

                ? `https://smart-college-management-backend.onrender.com/api/placement-records/${editingId}`

                : "https://smart-college-management-backend.onrender.com/api/placement-records";


            const method =
                editingId
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
                    "Unable to save placement record."
                );

                return;

            }


            showSuccess(
                editingId
                    ? "Placement record updated successfully."
                    : "Placement record created successfully."
            );


            closeModal();

            fetchRecords();

        } catch (error) {

            console.error(
                "Save placement record error:",
                error
            );

            showError(
                "Unable to save placement record."
            );

        } finally {

            setSaving(false);

        }

    };


    // ==========================================
    // DELETE RECORD
    // ==========================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this placement record?"
            );

        if (!confirmed) return;


        try {

            const response =
                await fetch(
                    `https://smart-college-management-backend.onrender.com/api/placement-records/${id}`,
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


            if (!response.ok) {

                showError(
                    data.message ||
                    "Unable to delete placement record."
                );

                return;

            }


            showSuccess(
                "Placement record deleted successfully."
            );

            fetchRecords();

        } catch (error) {

            console.error(
                "Delete placement record error:",
                error
            );

            showError(
                "Unable to delete placement record."
            );

        }

    };


    // ==========================================
    // FILTER RECORDS
    // ==========================================

    const filteredRecords =
        records.filter((record) => {

            const studentName =
                record.student?.fullName ||
                "";

            const companyName =
                record.company?.name ||
                "";

            const jobTitle =
                record.job?.jobTitle ||
                "";

            const search =
                searchTerm.toLowerCase();

            return (

                studentName
                    .toLowerCase()
                    .includes(search)

                ||

                companyName
                    .toLowerCase()
                    .includes(search)

                ||

                jobTitle
                    .toLowerCase()
                    .includes(search)

            );

        });


    // ==========================================
    // SUMMARY
    // ==========================================

    const totalPlacements =
        records.length;

    const placedStudents =
        records.filter(
            (record) =>
                record.status === "Placed"
        ).length;

    const joinedStudents =
        records.filter(
            (record) =>
                record.status === "Joined"
        ).length;

    const notJoinedStudents =
        records.filter(
            (record) =>
                record.status === "Not Joined"
        ).length;


    // ==========================================
    // DATE FORMATTER
    // ==========================================

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date)
            .toLocaleDateString(
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

            <div className="placement-loading">

                <div className="placement-loader"></div>

                <p>
                    Loading placement records...
                </p>

            </div>

        );

    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div className="placement-record-page">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="placement-page-header">

                <div>

                    <div className="placement-breadcrumb">
                        Admin Portal › Placement › Records
                    </div>

                    <h1>
                        Placement Records
                    </h1>

                    <p>
                        Manage and track final student placement records.
                    </p>

                </div>


                <button
                    className="add-placement-btn"
                    onClick={openCreateModal}
                >
                    + Add Placement Record
                </button>

            </div>


            {/* ==========================================
                SUMMARY CARDS
            ========================================== */}

            <div className="placement-summary-grid">

                <div className="placement-summary-card">

                    <div className="summary-icon total-icon">
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


                <div className="placement-summary-card">

                    <div className="summary-icon placed-icon">
                        🎓
                    </div>

                    <div>
                        <span>
                            Placed
                        </span>

                        <strong>
                            {placedStudents}
                        </strong>
                    </div>

                </div>


                <div className="placement-summary-card">

                    <div className="summary-icon joined-icon">
                        ✓
                    </div>

                    <div>
                        <span>
                            Joined
                        </span>

                        <strong>
                            {joinedStudents}
                        </strong>
                    </div>

                </div>


                <div className="placement-summary-card">

                    <div className="summary-icon not-joined-icon">
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
                SEARCH
            ========================================== */}

            <div className="placement-toolbar">

                <div className="placement-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search student, company or job..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                    />

                </div>

            </div>


            {/* ==========================================
                TABLE
            ========================================== */}

            {filteredRecords.length === 0 ? (

                <div className="placement-empty-state">

                    <div className="empty-placement-icon">
                        🎓
                    </div>

                    <h3>
                        No Placement Records Found
                    </h3>

                    <p>
                        Add a placement record to start tracking student placements.
                    </p>

                    <button
                        onClick={openCreateModal}
                    >
                        + Add Placement Record
                    </button>

                </div>

            ) : (

                <div className="placement-table-wrapper">

                    <table className="placement-table">

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

                            {filteredRecords.map(
                                (record) => (

                                    <tr
                                        key={
                                            record._id
                                        }
                                    >

                                        {/* STUDENT */}

                                        <td>

                                            <div className="placement-student">

                                                <div className="placement-avatar">

                                                    {
                                                        record.student?.fullName
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                        "S"
                                                    }

                                                </div>

                                                <div>

                                                    <strong>
                                                        {
                                                            record.student?.fullName ||
                                                            "-"
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            record.student?.email ||
                                                            "-"
                                                        }
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* COMPANY */}

                                        <td>

                                            <strong>
                                                {
                                                    record.company?.name ||
                                                    "-"
                                                }
                                            </strong>

                                        </td>


                                        {/* JOB */}

                                        <td>

                                            <strong>
                                                {
                                                    record.job?.jobTitle ||
                                                    "-"
                                                }
                                            </strong>

                                        </td>


                                        {/* OFFER DATE */}

                                        <td>
                                            {
                                                formatDate(
                                                    record.offerDate
                                                )
                                            }
                                        </td>


                                        {/* JOINING DATE */}

                                        <td>
                                            {
                                                formatDate(
                                                    record.joiningDate
                                                )
                                            }
                                        </td>


                                        {/* SALARY */}

                                        <td>

                                            <strong className="placement-salary">

                                                ₹{" "}
                                                {
                                                    record.salary ||
                                                    "-"
                                                }

                                            </strong>

                                        </td>


                                        {/* LOCATION */}

                                        <td>

                                            <span className="placement-location">

                                                📍{" "}
                                                {
                                                    record.jobLocation ||
                                                    "-"
                                                }

                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`placement-status status-${record.status
                                                    ?.toLowerCase()
                                                    .replace(
                                                        /\s+/g,
                                                        "-"
                                                    )}`}
                                            >
                                                {
                                                    record.status ||
                                                    "-"
                                                }
                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="placement-actions">

                                                <button
                                                    className="edit-placement-btn"
                                                    onClick={() =>
                                                        openEditModal(
                                                            record
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-placement-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            record._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {/* ==========================================
                MODAL
            ========================================== */}

            {showModal && (

                <div className="placement-modal-overlay">

                    <div className="placement-modal">

                        <div className="placement-modal-header">

                            <div>

                                <h2>
                                    {
                                        editingId
                                            ? "Edit Placement Record"
                                            : "Add Placement Record"
                                    }
                                </h2>

                                <p>
                                    Enter final placement details.
                                </p>

                            </div>


                            <button
                                className="placement-modal-close"
                                onClick={closeModal}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            className="placement-form"
                            onSubmit={handleSubmit}
                        >


                            {/* APPLICATION */}

                            <div className="placement-form-group full-width">

                                <label>
                                    Selected Application
                                    <span>*</span>
                                </label>

                                <select
                                    value={
                                        formData.application
                                    }
                                    onChange={
                                        handleApplicationChange
                                    }
                                    required
                                    disabled={
                                        Boolean(
                                            editingId
                                        )
                                    }
                                >

                                    <option value="">
                                        Select selected application
                                    </option>

                                    {applications.map(
                                        (application) => (

                                            <option
                                                key={
                                                    application._id
                                                }
                                                value={
                                                    application._id
                                                }
                                            >

                                                {
                                                    application.student?.fullName ||
                                                    "-"
                                                }

                                                {" — "}

                                                {
                                                    application.job?.jobTitle ||
                                                    "-"
                                                }

                                                {" — "}

                                                {
                                                    application.job?.company?.name ||
                                                    "-"
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* STUDENT */}

                            <div className="placement-form-group">

                                <label>
                                    Student
                                </label>

                                <input
                                    type="text"
                                    value={
                                        applications.find(
                                            (application) =>
                                                application._id ===
                                                formData.application
                                        )?.student?.fullName ||
                                        ""
                                    }
                                    placeholder="Student name"
                                    readOnly
                                />

                            </div>


                            {/* COMPANY */}

                            <div className="placement-form-group">

                                <label>
                                    Company
                                </label>

                                <input
                                    type="text"
                                    value={
                                        applications.find(
                                            (application) =>
                                                application._id ===
                                                formData.application
                                        )?.job?.company?.name ||
                                        ""
                                    }
                                    placeholder="Company name"
                                    readOnly
                                />

                            </div>


                            {/* JOB */}

                            <div className="placement-form-group">

                                <label>
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        applications.find(
                                            (application) =>
                                                application._id ===
                                                formData.application
                                        )?.job?.jobTitle ||
                                        ""
                                    }
                                    placeholder="Job title"
                                    readOnly
                                />

                            </div>


                            {/* SALARY */}

                            <div className="placement-form-group">

                                <label>
                                    Salary / CTC
                                    <span>*</span>
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
                                    placeholder="Example: 6.8 LPA"
                                    required
                                />

                            </div>


                            {/* LOCATION */}

                            <div className="placement-form-group">

                                <label>
                                    Job Location
                                    <span>*</span>
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
                                    placeholder="Example: Pune"
                                    required
                                />

                            </div>


                            {/* OFFER DATE */}

                            <div className="placement-form-group">

                                <label>
                                    Offer Date
                                    <span>*</span>
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

                            <div className="placement-form-group">

                                <label>
                                    Joining Date
                                    <span>*</span>
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


                            {/* PLACEMENT YEAR */}

                            <div className="placement-form-group">

                                <label>
                                    Placement Year
                                    <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="placementYear"
                                    value={
                                        formData.placementYear
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    min="2000"
                                    max="2100"
                                    required
                                />

                            </div>


                            {/* STATUS */}

                            <div className="placement-form-group">

                                <label>
                                    Placement Status
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

                                    <option value="Placed">
                                        Placed
                                    </option>

                                    <option value="Joined">
                                        Joined
                                    </option>

                                    <option value="Not Joined">
                                        Not Joined
                                    </option>

                                </select>

                            </div>


                            {/* REMARKS */}

                            <div className="placement-form-group full-width">

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
                                    placeholder="Add placement remarks..."
                                    rows="4"
                                />

                            </div>


                            {/* MODAL ACTIONS */}

                            <div className="placement-modal-actions">

                                <button
                                    type="button"
                                    className="cancel-placement-btn"
                                    onClick={closeModal}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-placement-btn"
                                    disabled={saving}
                                >
                                    {
                                        saving
                                            ? "Saving..."
                                            : editingId
                                                ? "Update Record"
                                                : "Create Record"
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

            {errorMessage && (

                <div className="placement-message-overlay">

                    <div className="placement-message-popup error">

                        <div className="placement-message-icon">
                            !
                        </div>

                        <div>

                            <h3>
                                Something went wrong
                            </h3>

                            <p>
                                {errorMessage}
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                setErrorMessage("")
                            }
                        >
                            ×
                        </button>

                    </div>

                </div>

            )}


            {/* ==========================================
                SUCCESS POPUP
            ========================================== */}

            {successMessage && (

                <div className="placement-message-overlay">

                    <div className="placement-message-popup success">

                        <div className="placement-message-icon">
                            ✓
                        </div>

                        <div>

                            <h3>
                                Success
                            </h3>

                            <p>
                                {successMessage}
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                setSuccessMessage("")
                            }
                        >
                            ×
                        </button>

                    </div>

                </div>

            )}

        </div>

    );

};

export default PlacementRecordManagement;


