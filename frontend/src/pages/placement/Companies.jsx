
import React, { useEffect, useState } from "react";
import "./Companies.css";

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");

    // =========================================================
    // FETCH COMPANIES
    // =========================================================

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/companies",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setCompanies(data.companies || []);
                } else {
                    setCompanies([]);
                }
            } catch (error) {
                console.error("Companies fetch error:", error);
                setCompanies([]);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCompanies();
        } else {
            setLoading(false);
        }
    }, [token]);

    // =========================================================
    // SEARCH COMPANIES
    // =========================================================

    const filteredCompanies = companies.filter((company) => {
        const searchText = search.toLowerCase().trim();

        return (
            company.name?.toLowerCase().includes(searchText) ||
            company.industry?.toLowerCase().includes(searchText) ||
            company.location?.toLowerCase().includes(searchText)
        );
    });

    // =========================================================
    // ACTIVE COMPANIES
    // =========================================================

    const activeCompanies = companies.filter(
        (company) => company.isActive
    ).length;

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return (
            <div className="companies-loading">

                <div className="companies-loader"></div>

                <h3>Loading companies...</h3>

                <p>
                    Please wait while we load placement companies.
                </p>

            </div>
        );
    }

    // =========================================================
    // MAIN UI
    // =========================================================

    return (
        <div className="companies-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="companies-header">

                <div className="companies-header-content">

                    <span className="companies-badge">
                        🏢 PLACEMENT CENTER
                    </span>

                    <h1>
                        Companies
                    </h1>

                    <p>
                        Explore companies visiting the college and
                        discover opportunities available through the
                        placement portal.
                    </p>

                </div>

            </section>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <section className="companies-stats">

                <div className="company-stat-card">

                    <div className="company-stat-icon blue">
                        🏢
                    </div>

                    <div>
                        <span>Total Companies</span>
                        <strong>{companies.length}</strong>
                    </div>

                </div>


                <div className="company-stat-card">

                    <div className="company-stat-icon green">
                        ✓
                    </div>

                    <div>
                        <span>Active Companies</span>
                        <strong>{activeCompanies}</strong>
                    </div>

                </div>


                <div className="company-stat-card">

                    <div className="company-stat-icon purple">
                        💼
                    </div>

                    <div>
                        <span>Placement Opportunities</span>
                        <strong>Explore</strong>
                    </div>

                </div>

            </section>


            {/* =================================================
                SEARCH
            ================================================= */}

            <section className="companies-toolbar">

                <div className="companies-search-box">

                    <span className="search-icon">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search company, industry or location..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {search && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={() => setSearch("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}

                </div>


                <div className="companies-result-count">

                    <strong>
                        {filteredCompanies.length}
                    </strong>

                    <span>
                        {filteredCompanies.length === 1
                            ? "company found"
                            : "companies found"}
                    </span>

                </div>

            </section>


            {/* =================================================
                COMPANY LIST
            ================================================= */}

            {filteredCompanies.length === 0 ? (

                <div className="companies-empty">

                    <div className="companies-empty-icon">
                        🏢
                    </div>

                    <h3>
                        No Companies Found
                    </h3>

                    <p>
                        {search
                            ? "No company matches your search. Try a different company name, industry or location."
                            : "No companies are currently available in the placement portal."}
                    </p>

                    {search && (
                        <button
                            type="button"
                            className="empty-clear-btn"
                            onClick={() => setSearch("")}
                        >
                            Clear Search
                        </button>
                    )}

                </div>

            ) : (

                <section className="companies-grid">

                    {filteredCompanies.map((company) => (

                        <article
                            className="company-card"
                            key={company._id}
                        >

                            {/* =================================================
                                CARD HEADER
                            ================================================= */}

                            <div className="company-card-header">

                                <div className="company-identity">

                                    <div className="company-logo">

                                        {company.logo ? (

                                            <img
                                                src={company.logo}
                                                alt={`${company.name} logo`}
                                            />

                                        ) : (

                                            <span>
                                                {company.name
                                                    ?.charAt(0)
                                                    .toUpperCase() || "C"}
                                            </span>

                                        )}

                                    </div>


                                    <div className="company-name-wrapper">

                                        <h2>
                                            {company.name || "Company"}
                                        </h2>

                                        <p>
                                            Placement Partner
                                        </p>

                                    </div>

                                </div>


                                <span
                                    className={
                                        company.isActive
                                            ? "company-status active"
                                            : "company-status inactive"
                                    }
                                >
                                    <span className="status-dot"></span>

                                    {company.isActive
                                        ? "Active"
                                        : "Inactive"}
                                </span>

                            </div>


                            {/* =================================================
                                COMPANY DIVIDER
                            ================================================= */}

                            <div className="company-divider"></div>


                            {/* =================================================
                                COMPANY INFORMATION
                            ================================================= */}

                            <div className="company-details">

                                <div className="company-info">

                                    <div className="company-info-icon">
                                        🏭
                                    </div>

                                    <div>
                                        <small>
                                            Industry
                                        </small>

                                        <strong>
                                            {company.industry ||
                                                "Not specified"}
                                        </strong>
                                    </div>

                                </div>


                                <div className="company-info">

                                    <div className="company-info-icon">
                                        📍
                                    </div>

                                    <div>
                                        <small>
                                            Location
                                        </small>

                                        <strong>
                                            {company.location ||
                                                "Not specified"}
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                DESCRIPTION
                            ================================================= */}

                            <div className="company-description-wrapper">

                                <span className="description-label">
                                    ABOUT COMPANY
                                </span>

                                <p className="company-description">

                                    {company.description ||
                                        "Company information and placement opportunities will be available here."}

                                </p>

                            </div>


                            {/* =================================================
                                ACTIONS
                            ================================================= */}

                            <div className="company-actions">

                                {company.website && (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="company-website"
                                    >
                                        <span>
                                            🌐
                                        </span>

                                        Visit Website

                                        <span className="action-arrow">
                                            ↗
                                        </span>
                                    </a>
                                )}


                                <a
                                    href="/student-jobs"
                                    className="company-jobs-btn"
                                >
                                    View Available Jobs

                                    <span>
                                        →
                                    </span>
                                </a>

                            </div>

                        </article>

                    ))}

                </section>

            )}

        </div>
    );
}

export default Companies;