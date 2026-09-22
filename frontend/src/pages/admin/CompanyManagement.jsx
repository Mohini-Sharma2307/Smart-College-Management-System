
import { useEffect, useState } from "react";
import "./CompanyManagement.css";

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [editingCompany, setEditingCompany] = useState(null);
    const [deleteCompany, setDeleteCompany] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        website: "",
        location: "",
        description: "",
        contactEmail: "",
        contactPhone: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH COMPANIES
    // ==========================================

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/companies",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch companies"
                );
            }

            setCompanies(data.companies || []);
        } catch (err) {
            console.error("Fetch companies error:", err);

            setError(
                err.message || "Unable to load companies"
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
    // OPEN ADD MODAL
    // ==========================================

    const openAddModal = () => {
        setEditingCompany(null);

        setFormData({
            name: "",
            industry: "",
            website: "",
            location: "",
            description: "",
            contactEmail: "",
            contactPhone: ""
        });

        setMessage("");
        setError("");

        setShowModal(true);
    };

    // ==========================================
    // OPEN EDIT MODAL
    // ==========================================

    const openEditModal = (company) => {
        setEditingCompany(company);

        setFormData({
            name: company.name || "",
            industry: company.industry || "",
            website: company.website || "",
            location: company.location || "",
            description: company.description || "",
            contactEmail: company.contactEmail || "",
            contactPhone: company.contactPhone || ""
        });

        setMessage("");
        setError("");

        setShowModal(true);
    };

    // ==========================================
    // CLOSE ADD / EDIT MODAL
    // ==========================================

    const closeModal = () => {
        if (submitting) return;

        setShowModal(false);
        setEditingCompany(null);
    };

    // ==========================================
    // CREATE / UPDATE COMPANY
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.name.trim() ||
            !formData.industry.trim() ||
            !formData.location.trim()
        ) {
            setError(
                "Company name, industry and location are required."
            );

            return;
        }

        try {
            setSubmitting(true);

            const url = editingCompany
                ? `http://localhost:5000/api/companies/${editingCompany._id}`
                : "http://localhost:5000/api/companies";

            const method = editingCompany ? "PUT" : "POST";

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
                throw new Error(
                    data.message ||
                    `Failed to ${
                        editingCompany
                            ? "update"
                            : "create"
                    } company`
                );
            }

            setMessage(
                editingCompany
                    ? "Company updated successfully."
                    : "Company created successfully."
            );

            setShowModal(false);
            setEditingCompany(null);

            setFormData({
                name: "",
                industry: "",
                website: "",
                location: "",
                description: "",
                contactEmail: "",
                contactPhone: ""
            });

            await fetchCompanies();

        } catch (err) {
            console.error(
                "Company submit error:",
                err
            );

            setError(
                err.message ||
                "Unable to save company."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // OPEN DELETE CONFIRMATION
    // ==========================================

    const handleDelete = (company) => {
        setDeleteCompany(company);
    };

    // ==========================================
    // CONFIRM DELETE COMPANY
    // ==========================================

    const confirmDeleteCompany = async () => {
        if (!deleteCompany) return;

        try {
            setDeleting(true);
            setError("");
            setMessage("");

            const response = await fetch(
                `http://localhost:5000/api/companies/${deleteCompany._id}`,
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
                    "Failed to delete company"
                );
            }

            setMessage(
                "Company deleted successfully."
            );

            setDeleteCompany(null);

            await fetchCompanies();

        } catch (err) {
            console.error(
                "Delete company error:",
                err
            );

            setError(
                err.message ||
                "Unable to delete company."
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

        setDeleteCompany(null);
    };

    // ==========================================
    // FILTER COMPANIES
    // ==========================================

    const filteredCompanies = companies.filter(
        (company) => {
            const searchText =
                search.toLowerCase().trim();

            if (!searchText) return true;

            return (
                company.name
                    ?.toLowerCase()
                    .includes(searchText) ||
                company.industry
                    ?.toLowerCase()
                    .includes(searchText) ||
                company.location
                    ?.toLowerCase()
                    .includes(searchText)
            );
        }
    );

    // ==========================================
    // SUMMARY
    // ==========================================

    const totalCompanies = companies.length;

    const activeCompanies = companies.filter(
        (company) => company.isActive !== false
    ).length;

    const industries = new Set(
        companies
            .map((company) => company.industry)
            .filter(Boolean)
    ).size;

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="company-management-page">

                <div className="company-loading">
                    <div className="company-loading-spinner"></div>

                    <p>
                        Loading companies...
                    </p>
                </div>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="company-management-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="company-page-header">

                <div className="company-header-left">

                    <div className="company-header-icon">
                        🏢
                    </div>

                    <div>
                        <div className="company-breadcrumb">
                            Placement
                            <span>›</span>
                            Companies
                        </div>

                        <h1>
                            Company Management
                        </h1>

                        <p>
                            Manage companies participating
                            in campus placements
                        </p>
                    </div>

                </div>

                <div className="company-header-actions">

                    <span className="company-count-badge">
                        {totalCompanies} Companies
                    </span>

                    <button
                        className="add-company-btn"
                        onClick={openAddModal}
                    >
                        <span>+</span>
                        Add Company
                    </button>

                </div>

            </div>


            {/* ==========================================
                ALERTS
            ========================================== */}

            {message && (
                <div className="company-alert company-success">
                    <span>✓</span>
                    {message}
                </div>
            )}

            {error && (
                <div className="company-alert company-error">
                    <span>!</span>
                    {error}
                </div>
            )}


            {/* ==========================================
                SUMMARY CARDS
            ========================================== */}

            <div className="company-summary-grid">

                <div className="company-summary-card">

                    <div className="company-summary-icon">
                        🏢
                    </div>

                    <div>
                        <span>
                            Total Companies
                        </span>

                        <strong>
                            {totalCompanies}
                        </strong>
                    </div>

                </div>


                <div className="company-summary-card">

                    <div className="company-summary-icon active">
                        ✓
                    </div>

                    <div>
                        <span>
                            Active Companies
                        </span>

                        <strong>
                            {activeCompanies}
                        </strong>
                    </div>

                </div>


                <div className="company-summary-card">

                    <div className="company-summary-icon industry">
                        ◈
                    </div>

                    <div>
                        <span>
                            Industries
                        </span>

                        <strong>
                            {industries}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==========================================
                COMPANY LIST
            ========================================== */}

            <div className="company-list-card">

                <div className="company-list-header">

                    <div>
                        <h2>
                            Placement Companies
                        </h2>

                        <p>
                            View and manage registered companies
                        </p>
                    </div>

                    <span className="company-result-count">
                        Showing {filteredCompanies.length}
                    </span>

                </div>


                {/* SEARCH */}

                <div className="company-search-row">

                    <div className="company-search-box">

                        <span className="company-search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search by company, industry or location..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        {search && (
                            <button
                                className="company-clear-search"
                                onClick={() =>
                                    setSearch("")
                                }
                                type="button"
                            >
                                ×
                            </button>
                        )}

                    </div>

                </div>


                {/* COMPANY TABLE */}

                {filteredCompanies.length === 0 ? (

                    <div className="company-empty">

                        <div className="company-empty-icon">
                            🏢
                        </div>

                        <h3>
                            No Companies Found
                        </h3>

                        <p>
                            {search
                                ? "No companies match your search."
                                : "Start by adding your first placement company."}
                        </p>

                        {!search && (
                            <button
                                className="empty-add-company-btn"
                                onClick={openAddModal}
                            >
                                + Add Company
                            </button>
                        )}

                    </div>

                ) : (

                    <div className="company-table-wrapper">

                        <table className="company-table">

                            <thead>

                                <tr>

                                    <th>
                                        Company
                                    </th>

                                    <th>
                                        Industry
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Contact
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

                                {filteredCompanies.map(
                                    (company) => (

                                        <tr
                                            key={company._id}
                                        >

                                            <td>

                                                <div className="company-name-cell">

                                                    <div className="company-avatar">
                                                        {company.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || "C"}
                                                    </div>

                                                    <div className="company-name-info">

                                                        <strong>
                                                            {company.name}
                                                        </strong>

                                                        {company.website && (
                                                            <a
                                                                href={
                                                                    company.website.startsWith(
                                                                        "http"
                                                                    )
                                                                        ? company.website
                                                                        : `https://${company.website}`
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                Visit website ↗
                                                            </a>
                                                        )}

                                                    </div>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="industry-badge">
                                                    {company.industry || "-"}
                                                </span>

                                            </td>


                                            <td>

                                                <div className="company-location">

                                                    <span>
                                                        📍
                                                    </span>

                                                    {company.location || "-"}

                                                </div>

                                            </td>


                                            <td>

                                                <div className="company-contact">

                                                    {company.contactEmail && (
                                                        <span>
                                                            ✉{" "}
                                                            {company.contactEmail}
                                                        </span>
                                                    )}

                                                    {company.contactPhone && (
                                                        <span>
                                                            ☎{" "}
                                                            {company.contactPhone}
                                                        </span>
                                                    )}

                                                    {!company.contactEmail &&
                                                        !company.contactPhone && (
                                                            <span>
                                                                -
                                                            </span>
                                                        )}

                                                </div>

                                            </td>


                                            <td>

                                                <span
                                                    className={`company-status ${
                                                        company.isActive !== false
                                                            ? "active"
                                                            : "inactive"
                                                    }`}
                                                >

                                                    <span></span>

                                                    {company.isActive !== false
                                                        ? "Active"
                                                        : "Inactive"}

                                                </span>

                                            </td>


                                            <td>

                                                <div className="company-actions">

                                                    <button
                                                        className="company-action-btn edit"
                                                        title="Edit company"
                                                        onClick={() =>
                                                            openEditModal(
                                                                company
                                                            )
                                                        }
                                                    >
                                                        ✎
                                                    </button>

                                                    <button
                                                        className="company-action-btn delete"
                                                        title="Delete company"
                                                        onClick={() =>
                                                            handleDelete(
                                                                company
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
                ADD / EDIT MODAL
            ========================================== */}

            {showModal && (

                <div
                    className="company-modal-overlay"
                    onClick={closeModal}
                >

                    <div
                        className="company-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="company-modal-header">

                            <div>

                                <h2>
                                    {editingCompany
                                        ? "Edit Company"
                                        : "Add Company"}
                                </h2>

                                <p>
                                    {editingCompany
                                        ? "Update company information"
                                        : "Add a new placement company"}
                                </p>

                            </div>

                            <button
                                className="company-modal-close"
                                onClick={closeModal}
                                disabled={submitting}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            className="company-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="company-form-row">

                                <div className="company-form-group">

                                    <label>
                                        Company Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. TCS"
                                        required
                                    />

                                </div>


                                <div className="company-form-group">

                                    <label>
                                        Industry
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        placeholder="e.g. Information Technology"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="company-form-row">

                                <div className="company-form-group">

                                    <label>
                                        Location
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Pune"
                                        required
                                    />

                                </div>


                                <div className="company-form-group">

                                    <label>
                                        Website
                                    </label>

                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="https://example.com"
                                    />

                                </div>

                            </div>


                            <div className="company-form-row">

                                <div className="company-form-group">

                                    <label>
                                        Contact Email
                                    </label>

                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={handleChange}
                                        placeholder="hr@example.com"
                                    />

                                </div>


                                <div className="company-form-group">

                                    <label>
                                        Contact Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                    />

                                </div>

                            </div>


                            <div className="company-form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write a short description about the company..."
                                    rows="4"
                                />

                            </div>


                            <div className="company-form-actions">

                                <button
                                    type="button"
                                    className="company-cancel-btn"
                                    onClick={closeModal}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="company-submit-btn"
                                    disabled={submitting}
                                >

                                    {submitting ? (
                                        <>
                                            <span className="company-button-spinner"></span>

                                            {editingCompany
                                                ? "Updating..."
                                                : "Adding..."}
                                        </>
                                    ) : (
                                        <>
                                            {editingCompany
                                                ? "Update Company"
                                                : "Add Company"}
                                        </>
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

            {deleteCompany && (

                <div
                    className="delete-modal-overlay"
                    onClick={cancelDelete}
                >

                    <div
                        className="delete-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="delete-modal-icon">
                            🗑️
                        </div>

                        <h2>
                            Delete Company?
                        </h2>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>
                                "{deleteCompany.name}"
                            </strong>
                            ?
                        </p>

                        <span className="delete-warning">
                            This action cannot be undone.
                        </span>

                        <div className="delete-modal-actions">

                            <button
                                type="button"
                                className="delete-cancel-btn"
                                onClick={cancelDelete}
                                disabled={deleting}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="delete-confirm-btn"
                                onClick={confirmDeleteCompany}
                                disabled={deleting}
                            >

                                {deleting ? (
                                    <>
                                        <span className="delete-spinner"></span>
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete Company"
                                )}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default CompanyManagement;



