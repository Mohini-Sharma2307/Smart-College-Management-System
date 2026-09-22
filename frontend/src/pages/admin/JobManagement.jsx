
import { useEffect, useState } from "react";
import "./JobManagement.css";

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [deleteJob, setDeleteJob] = useState(null);

    const [formData, setFormData] = useState({
        company: "",
        jobTitle: "",
        description: "",
        requiredSkills: "",
        location: "",
        jobType: "Full Time",
        salary: "",
        applicationDeadline: "",
        eligibility: "",
        minimumCGPA: "",
        status: "Open"
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");


    // ==========================================
    // FETCH JOBS + COMPANIES
    // ==========================================

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            setError("");

            const [jobsResponse, companiesResponse] =
                await Promise.all([
                    fetch(
                        "http://localhost:5000/api/jobs",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    ),

                    fetch(
                        "http://localhost:5000/api/companies",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                ]);

            const jobsData = await jobsResponse.json();
            const companiesData =
                await companiesResponse.json();

            if (!jobsResponse.ok) {
                throw new Error(
                    jobsData.message ||
                    "Failed to fetch jobs"
                );
            }

            if (!companiesResponse.ok) {
                throw new Error(
                    companiesData.message ||
                    "Failed to fetch companies"
                );
            }

            setJobs(jobsData.jobs || []);
            setCompanies(
                companiesData.companies || []
            );

        } catch (err) {
            console.error(
                "Fetch job management data error:",
                err
            );

            setError(
                err.message ||
                "Unable to load job data."
            );
        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {
        setFormData({
            company: "",
            jobTitle: "",
            description: "",
            requiredSkills: "",
            location: "",
            jobType: "Full Time",
            salary: "",
            applicationDeadline: "",
            eligibility: "",
            minimumCGPA: "",
            status: "Open"
        });
    };


    // ==========================================
    // OPEN ADD MODAL
    // ==========================================

    const openAddModal = () => {
        setEditingJob(null);

        resetForm();

        setMessage("");
        setError("");

        setShowModal(true);
    };


    // ==========================================
    // OPEN EDIT MODAL
    // ==========================================

    const openEditModal = (job) => {
        setEditingJob(job);

        setFormData({
            company: job.company?._id || job.company || "",
            jobTitle: job.jobTitle || "",
            description: job.description || "",
            requiredSkills: Array.isArray(
                job.requiredSkills
            )
                ? job.requiredSkills.join(", ")
                : "",
            location: job.location || "",
            jobType: job.jobType || "Full Time",
            salary: job.salary || "",
            applicationDeadline: job.applicationDeadline
                ? new Date(
                    job.applicationDeadline
                )
                    .toISOString()
                    .split("T")[0]
                : "",
            eligibility: job.eligibility || "",
            minimumCGPA:
                job.minimumCGPA !== undefined &&
                job.minimumCGPA !== null
                    ? job.minimumCGPA
                    : "",
            status: job.status || "Open"
        });

        setMessage("");
        setError("");

        setShowModal(true);
    };


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    const closeModal = () => {
        if (submitting) return;

        setShowModal(false);
        setEditingJob(null);
        resetForm();
    };


    // ==========================================
    // CREATE / UPDATE JOB
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.company ||
            !formData.jobTitle.trim() ||
            !formData.description.trim() ||
            !formData.location.trim() ||
            !formData.applicationDeadline
        ) {
            setError(
                "Company, job title, description, location and application deadline are required."
            );

            return;
        }

        try {
            setSubmitting(true);

            const skills = formData.requiredSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);

            const payload = {
                company: formData.company,
                jobTitle: formData.jobTitle.trim(),
                description:
                    formData.description.trim(),
                requiredSkills: skills,
                location:
                    formData.location.trim(),
                jobType: formData.jobType,
                salary: formData.salary.trim(),
                applicationDeadline:
                    formData.applicationDeadline,
                eligibility:
                    formData.eligibility.trim(),
                minimumCGPA:
                    formData.minimumCGPA === ""
                        ? 0
                        : Number(formData.minimumCGPA),
                status: formData.status
            };

            const url = editingJob
                ? `http://localhost:5000/api/jobs/${editingJob._id}`
                : "http://localhost:5000/api/jobs";

            const method = editingJob
                ? "PUT"
                : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    `Failed to ${
                        editingJob
                            ? "update"
                            : "create"
                    } job`
                );
            }

            setMessage(
                editingJob
                    ? "Job updated successfully."
                    : "Job created successfully."
            );

            setShowModal(false);
            setEditingJob(null);

            resetForm();

            await fetchInitialData();

        } catch (err) {
            console.error(
                "Job submit error:",
                err
            );

            setError(
                err.message ||
                "Unable to save job."
            );
        } finally {
            setSubmitting(false);
        }
    };


    // ==========================================
    // OPEN DELETE MODAL
    // ==========================================

    const handleDelete = (job) => {
        setDeleteJob(job);
    };


    // ==========================================
    // CONFIRM DELETE
    // ==========================================

    const confirmDeleteJob = async () => {
        if (!deleteJob) return;

        try {
            setDeleting(true);
            setError("");
            setMessage("");

            const response = await fetch(
                `http://localhost:5000/api/jobs/${deleteJob._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete job"
                );
            }

            setMessage(
                "Job deleted successfully."
            );

            setDeleteJob(null);

            await fetchInitialData();

        } catch (err) {
            console.error(
                "Delete job error:",
                err
            );

            setError(
                err.message ||
                "Unable to delete job."
            );
        } finally {
            setDeleting(false);
        }
    };


    // ==========================================
    // CANCEL DELETE
    // ==========================================

    const cancelDelete = () => {
        if (deleting) return;

        setDeleteJob(null);
    };


    // ==========================================
    // FILTER JOBS
    // ==========================================

    const filteredJobs = jobs.filter(
        (job) => {
            const searchText =
                search.toLowerCase().trim();

            if (!searchText) return true;

            const companyName =
                typeof job.company === "object"
                    ? job.company?.name || ""
                    : "";

            return (
                job.jobTitle
                    ?.toLowerCase()
                    .includes(searchText) ||
                companyName
                    .toLowerCase()
                    .includes(searchText) ||
                job.location
                    ?.toLowerCase()
                    .includes(searchText) ||
                job.jobType
                    ?.toLowerCase()
                    .includes(searchText)
            );
        }
    );


    // ==========================================
    // SUMMARY
    // ==========================================

    const totalJobs = jobs.length;

    const openJobs = jobs.filter(
        (job) => job.status === "Open"
    ).length;

    const closedJobs = jobs.filter(
        (job) => job.status === "Closed"
    ).length;


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
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="job-management-page">

                <div className="job-loading">

                    <div className="job-loading-spinner"></div>

                    <p>
                        Loading jobs...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="job-management-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="job-page-header">

                <div className="job-header-left">

                    <div className="job-header-icon">
                        💼
                    </div>

                    <div>

                        <div className="job-breadcrumb">
                            Placement
                            <span>›</span>
                            Jobs
                        </div>

                        <h1>
                            Job Management
                        </h1>

                        <p>
                            Create and manage campus placement opportunities
                        </p>

                    </div>

                </div>


                <div className="job-header-actions">

                    <span className="job-count-badge">
                        {totalJobs} Jobs
                    </span>

                    <button
                        className="add-job-btn"
                        onClick={openAddModal}
                    >
                        <span>+</span>
                        Add Job
                    </button>

                </div>

            </div>


            {/* ==========================================
                ALERTS
            ========================================== */}

            {message && (
                <div className="job-alert job-success">
                    <span>✓</span>
                    {message}
                </div>
            )}

            {error && (
                <div className="job-alert job-error">
                    <span>!</span>
                    {error}
                </div>
            )}


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="job-summary-grid">

                <div className="job-summary-card">

                    <div className="job-summary-icon">
                        💼
                    </div>

                    <div>
                        <span>
                            Total Jobs
                        </span>

                        <strong>
                            {totalJobs}
                        </strong>
                    </div>

                </div>


                <div className="job-summary-card">

                    <div className="job-summary-icon open">
                        ✓
                    </div>

                    <div>
                        <span>
                            Open Jobs
                        </span>

                        <strong>
                            {openJobs}
                        </strong>
                    </div>

                </div>


                <div className="job-summary-card">

                    <div className="job-summary-icon closed">
                        ◷
                    </div>

                    <div>
                        <span>
                            Closed Jobs
                        </span>

                        <strong>
                            {closedJobs}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==========================================
                JOB LIST
            ========================================== */}

            <div className="job-list-card">

                <div className="job-list-header">

                    <div>

                        <h2>
                            Placement Opportunities
                        </h2>

                        <p>
                            View and manage available job openings
                        </p>

                    </div>

                    <span className="job-result-count">
                        Showing {filteredJobs.length}
                    </span>

                </div>


                {/* SEARCH */}

                <div className="job-search-row">

                    <div className="job-search-box">

                        <span className="job-search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search by job title, company, location or type..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                        {search && (
                            <button
                                type="button"
                                className="job-clear-search"
                                onClick={() =>
                                    setSearch("")
                                }
                            >
                                ×
                            </button>
                        )}

                    </div>

                </div>


                {/* ==========================================
                    EMPTY STATE
                ========================================== */}

                {filteredJobs.length === 0 ? (

                    <div className="job-empty">

                        <div className="job-empty-icon">
                            💼
                        </div>

                        <h3>
                            No Jobs Found
                        </h3>

                        <p>
                            {search
                                ? "No jobs match your search."
                                : "Start by creating your first placement opportunity."}
                        </p>

                        {!search && (
                            <button
                                className="empty-add-job-btn"
                                onClick={openAddModal}
                            >
                                + Add Job
                            </button>
                        )}

                    </div>

                ) : (

                    <div className="job-table-wrapper">

                        <table className="job-table">

                            <thead>

                                <tr>

                                    <th>
                                        Job
                                    </th>

                                    <th>
                                        Company
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Deadline
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

                                {filteredJobs.map(
                                    (job) => (

                                        <tr
                                            key={job._id}
                                        >

                                            {/* JOB */}

                                            <td>

                                                <div className="job-title-cell">

                                                    <div className="job-avatar">
                                                        💼
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {job.jobTitle}
                                                        </strong>

                                                        <span>
                                                            {job.salary || "Salary not specified"}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* COMPANY */}

                                            <td>

                                                <div className="job-company-cell">

                                                    <strong>
                                                        {typeof job.company === "object"
                                                            ? job.company?.name || "-"
                                                            : "-"}
                                                    </strong>

                                                    {typeof job.company === "object" &&
                                                        job.company?.industry && (
                                                            <span>
                                                                {job.company.industry}
                                                            </span>
                                                        )}

                                                </div>

                                            </td>


                                            {/* LOCATION */}

                                            <td>

                                                <div className="job-location-cell">

                                                    <span>
                                                        📍
                                                    </span>

                                                    {job.location || "-"}

                                                </div>

                                            </td>


                                            {/* TYPE */}

                                            <td>

                                                <span className="job-type-badge">
                                                    {job.jobType || "-"}
                                                </span>

                                            </td>


                                            {/* DEADLINE */}

                                            <td>

                                                <span className="job-deadline">
                                                    {formatDate(
                                                        job.applicationDeadline
                                                    )}
                                                </span>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`job-status ${
                                                        job.status
                                                            ?.toLowerCase()
                                                    }`}
                                                >

                                                    <span></span>

                                                    {job.status || "Open"}

                                                </span>

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="job-actions">

                                                    <button
                                                        type="button"
                                                        className="job-action-btn edit"
                                                        title="Edit job"
                                                        onClick={() =>
                                                            openEditModal(
                                                                job
                                                            )
                                                        }
                                                    >
                                                        ✎
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="job-action-btn delete"
                                                        title="Delete job"
                                                        onClick={() =>
                                                            handleDelete(
                                                                job
                                                            )
                                                        }
                                                    >
                                                        🗑
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

            </div>


            {/* ==========================================
                ADD / EDIT JOB MODAL
            ========================================== */}

            {showModal && (

                <div
                    className="job-modal-overlay"
                    onClick={closeModal}
                >

                    <div
                        className="job-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="job-modal-header">

                            <div>

                                <h2>
                                    {editingJob
                                        ? "Edit Job"
                                        : "Add Job"}
                                </h2>

                                <p>
                                    {editingJob
                                        ? "Update placement opportunity details"
                                        : "Create a new campus placement opportunity"}
                                </p>

                            </div>

                            <button
                                type="button"
                                className="job-modal-close"
                                onClick={closeModal}
                                disabled={submitting}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            className="job-form"
                            onSubmit={handleSubmit}
                        >

                            {/* COMPANY + JOB TITLE */}

                            <div className="job-form-row">

                                <div className="job-form-group">

                                    <label>
                                        Company
                                        <span>*</span>
                                    </label>

                                    <select
                                        name="company"
                                        value={
                                            formData.company
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select company
                                        </option>

                                        {companies
                                            .filter(
                                                (company) =>
                                                    company.isActive !== false
                                            )
                                            .map(
                                                (company) => (
                                                    <option
                                                        key={
                                                            company._id
                                                        }
                                                        value={
                                                            company._id
                                                        }
                                                    >
                                                        {
                                                            company.name
                                                        }
                                                    </option>
                                                )
                                            )}

                                    </select>

                                </div>


                                <div className="job-form-group">

                                    <label>
                                        Job Title
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={
                                            formData.jobTitle
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. Software Engineer"
                                        required
                                    />

                                </div>

                            </div>


                            {/* LOCATION + TYPE */}

                            <div className="job-form-row">

                                <div className="job-form-group">

                                    <label>
                                        Location
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={
                                            formData.location
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. Pune"
                                        required
                                    />

                                </div>


                                <div className="job-form-group">

                                    <label>
                                        Job Type
                                        <span>*</span>
                                    </label>

                                    <select
                                        name="jobType"
                                        value={
                                            formData.jobType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    >

                                        <option value="Full Time">
                                            Full Time
                                        </option>

                                        <option value="Part Time">
                                            Part Time
                                        </option>

                                        <option value="Internship">
                                            Internship
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* SALARY + DEADLINE */}

                            <div className="job-form-row">

                                <div className="job-form-group">

                                    <label>
                                        Salary / Package
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
                                        placeholder="e.g. 4.5 LPA"
                                    />

                                </div>


                                <div className="job-form-group">

                                    <label>
                                        Application Deadline
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="date"
                                        name="applicationDeadline"
                                        value={
                                            formData.applicationDeadline
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            {/* CGPA + STATUS */}

                            <div className="job-form-row">

                                <div className="job-form-group">

                                    <label>
                                        Minimum CGPA
                                    </label>

                                    <input
                                        type="number"
                                        name="minimumCGPA"
                                        value={
                                            formData.minimumCGPA
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. 7.0"
                                        min="0"
                                        max="10"
                                        step="0.01"
                                    />

                                </div>


                                <div className="job-form-group">

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

                                        <option value="Open">
                                            Open
                                        </option>

                                        <option value="Closed">
                                            Closed
                                        </option>

                                        <option value="Draft">
                                            Draft
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* REQUIRED SKILLS */}

                            <div className="job-form-group">

                                <label>
                                    Required Skills
                                </label>

                                <input
                                    type="text"
                                    name="requiredSkills"
                                    value={
                                        formData.requiredSkills
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Java, React, Node.js, MongoDB"
                                />

                                <small>
                                    Separate multiple skills with commas.
                                </small>

                            </div>


                            {/* ELIGIBILITY */}

                            <div className="job-form-group">

                                <label>
                                    Eligibility
                                </label>

                                <input
                                    type="text"
                                    name="eligibility"
                                    value={
                                        formData.eligibility
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. B.E./B.Tech students"
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="job-form-group">

                                <label>
                                    Job Description
                                    <span>*</span>
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Write a detailed description about the job role..."
                                    rows="5"
                                    required
                                />

                            </div>


                            {/* ACTIONS */}

                            <div className="job-form-actions">

                                <button
                                    type="button"
                                    className="job-cancel-btn"
                                    onClick={closeModal}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="job-submit-btn"
                                    disabled={submitting}
                                >

                                    {submitting ? (
                                        <>
                                            <span className="job-button-spinner"></span>

                                            {editingJob
                                                ? "Updating..."
                                                : "Creating..."}
                                        </>
                                    ) : (
                                        editingJob
                                            ? "Update Job"
                                            : "Create Job"
                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* ==========================================
                DELETE CONFIRMATION MODAL
            ========================================== */}

            {deleteJob && (

                <div
                    className="delete-job-modal-overlay"
                    onClick={cancelDelete}
                >

                    <div
                        className="delete-job-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="delete-job-modal-icon">
                            🗑️
                        </div>

                        <h2>
                            Delete Job?
                        </h2>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>
                                "{deleteJob.jobTitle}"
                            </strong>
                            ?
                        </p>

                        <span className="delete-job-warning">
                            This action cannot be undone.
                        </span>

                        <div className="delete-job-modal-actions">

                            <button
                                type="button"
                                className="delete-job-cancel-btn"
                                onClick={cancelDelete}
                                disabled={deleting}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="delete-job-confirm-btn"
                                onClick={confirmDeleteJob}
                                disabled={deleting}
                            >

                                {deleting ? (
                                    <>
                                        <span className="delete-job-spinner"></span>
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete Job"
                                )}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default JobManagement;

