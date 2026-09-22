import { useEffect, useState } from "react";
import "./PlacementRecords.css";

const PlacementRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH MY PLACEMENT RECORDS
    // ==========================================

    useEffect(() => {
        fetchPlacementRecords();
    }, []);

    const fetchPlacementRecords = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/placement-records/my-placement-records",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setRecords(data.records || []);
            } else {
                setRecords([]);
            }
        } catch (error) {
            console.error(
                "Placement records fetch error:",
                error
            );

            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        const formattedDate = new Date(date);

        if (Number.isNaN(formattedDate.getTime())) {
            return "-";
        }

        return formattedDate.toLocaleDateString(
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
        const normalizedStatus = (status || "")
            .toLowerCase()
            .trim();

        switch (normalizedStatus) {
            case "placed":
                return "placement-status placed";

            case "selected":
                return "placement-status selected";

            case "joined":
                return "placement-status joined";

            case "withdrawn":
                return "placement-status withdrawn";

            case "cancelled":
                return "placement-status cancelled";

            default:
                return "placement-status";
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="placement-record-loading">

                <div className="placement-record-loader"></div>

                <p>
                    Loading your placement records...
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
                PAGE HEADER
            ========================================== */}

            <div className="placement-record-header">

                <div className="placement-record-header-content">

                    <div className="placement-record-header-main">

                        <div className="placement-record-breadcrumb">

                            Student Portal

                            <span>›</span>

                            Placement

                            <span>›</span>

                            Placement History

                        </div>

                        <div className="placement-record-badge">
                            🏆 PLACEMENT CENTER
                        </div>

                        <h1>
                          🏆  Placement History
                        </h1>

                        <p>
                            View your complete placement records
                            and career placement details.
                        </p>

                    </div>

                </div>

            </div>


            {/* ==========================================
                CONTENT
            ========================================== */}

            <div className="placement-record-content">

                {/* ==========================================
                    EMPTY STATE
                ========================================== */}

                {records.length === 0 ? (

                    <div className="no-placement-record">

                        <div className="no-placement-icon">
                            📋
                        </div>

                        <h2>
                            No Placement Records
                        </h2>

                        <p>
                            Your placement record has not been
                            added yet.
                        </p>

                        <span>
                            Placement details will appear here
                            once they are added by the college.
                        </span>

                    </div>

                ) : (

                    <>

                        {/* ==========================================
                            SECTION HEADER
                        ========================================== */}

                        <div className="placement-record-section-header">

                            <div>

                                <div className="placement-record-section-badge">
                                    💼 PLACEMENT HISTORY
                                </div>

                                <h2>
                                    Your Placement Records
                                </h2>

                                <p>
                                    Review your completed placement
                                    details and employment information.
                                </p>

                            </div>

                            <div className="placement-record-count">

                                <strong>
                                    {records.length}
                                </strong>

                                <span>
                                    {records.length === 1
                                        ? "Placement"
                                        : "Placements"}
                                </span>

                            </div>

                        </div>


                        {/* ==========================================
                            RECORD GRID
                        ========================================== */}

                        <div className="placement-record-list">

                            {records.map((record) => (

                                <div
                                    className="placement-record-card"
                                    key={record._id}
                                >

                                    {/* ==========================================
                                        CARD HEADER
                                    ========================================== */}

                                    <div className="placement-record-card-header">

                                        <div className="company-info">

                                            <div className="company-icon">
                                                🏢
                                            </div>

                                            <div className="company-info-text">

                                                <h2>
                                                    {record.company?.name ||
                                                        "Company"}
                                                </h2>

                                                <p>
                                                    {record.job?.jobTitle ||
                                                        "Job Position"}
                                                </p>

                                            </div>

                                        </div>

                                        <span
                                            className={getStatusClass(
                                                record.status
                                            )}
                                        >

                                            <span className="placement-status-dot"></span>

                                            {record.status || "Placed"}

                                        </span>

                                    </div>


                                    <div className="placement-record-divider"></div>


                                    {/* ==========================================
                                        PLACEMENT DETAILS
                                    ========================================== */}

                                    <div className="placement-record-details">

                                        {/* Placement Year */}

                                        <div className="placement-detail">

                                            <span className="placement-detail-icon">
                                                📅
                                            </span>

                                            <div>

                                                <small>
                                                    Placement Year
                                                </small>

                                                <strong>
                                                    {record.placementYear ||
                                                        "-"}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Offer Date */}

                                        <div className="placement-detail">

                                            <span className="placement-detail-icon">
                                                📄
                                            </span>

                                            <div>

                                                <small>
                                                    Offer Date
                                                </small>

                                                <strong>
                                                    {formatDate(
                                                        record.offerDate
                                                    )}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Joining Date */}

                                        <div className="placement-detail">

                                            <span className="placement-detail-icon">
                                                🚀
                                            </span>

                                            <div>

                                                <small>
                                                    Joining Date
                                                </small>

                                                <strong>
                                                    {formatDate(
                                                        record.joiningDate
                                                    )}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Salary */}

                                        <div className="placement-detail">

                                            <span className="placement-detail-icon">
                                                💰
                                            </span>

                                            <div>

                                                <small>
                                                    Salary
                                                </small>

                                                <strong className="salary-value">
                                                    {record.salary
                                                        ? `₹${record.salary} LPA`
                                                        : "-"}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Job Location */}

                                        <div className="placement-detail">

                                            <span className="placement-detail-icon">
                                                📍
                                            </span>

                                            <div>

                                                <small>
                                                    Job Location
                                                </small>

                                                <strong>
                                                    {record.jobLocation ||
                                                        "-"}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Job Type */}

                                        <div className="placement-detail">

                                            <span className="placement-detail-icon">
                                                💼
                                            </span>

                                            <div>

                                                <small>
                                                    Job Type
                                                </small>

                                                <strong>
                                                    {record.job?.jobType ||
                                                        "Full Time"}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ==========================================
                                        REMARKS
                                    ========================================== */}

                                    {record.remarks && (

                                        <div className="placement-record-remarks">

                                            <div className="placement-remarks-icon">
                                                💬
                                            </div>

                                            <div>

                                                <small>
                                                    Remarks
                                                </small>

                                                <p>
                                                    {record.remarks}
                                                </p>

                                            </div>

                                        </div>

                                    )}


                                    {/* ==========================================
                                        FOOTER
                                    ========================================== */}

                                    <div className="placement-record-footer">

                                        <span>
                                            Smart College Placement Portal
                                        </span>

                                        {record.company?.industry && (

                                            <span>
                                                {record.company.industry}
                                            </span>

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </>
                )}

            </div>

        </div>
    );
};

export default PlacementRecords;