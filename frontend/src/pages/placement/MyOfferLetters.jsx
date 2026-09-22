import { useEffect, useState } from "react";
import "./MyOfferLetters.css";

const MyOfferLetters = () => {
    const [offerLetters, setOfferLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState(null);

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH MY OFFER LETTERS
    // ==========================================

    useEffect(() => {
        fetchOfferLetters();
    }, []);

    const fetchOfferLetters = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/offer-letters/my-offer-letters",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setOfferLetters(data.offerLetters || []);
            } else {
                setOfferLetters([]);
            }
        } catch (error) {
            console.error(
                "Offer letters fetch error:",
                error
            );

            setOfferLetters([]);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // DOWNLOAD OFFER LETTER PDF
    // ==========================================

    const handleDownloadPDF = async (offerId) => {
        try {
            setDownloadingId(offerId);

            const response = await fetch(
                `http://localhost:5000/api/offer-letters/${offerId}/student-pdf`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const data = await response.json();

                alert(
                    data.message ||
                    "Unable to download offer letter"
                );

                return;
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "offer-letter.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(
                "Offer letter download error:",
                error
            );

            alert(
                "Unable to download offer letter"
            );

        } finally {
            setDownloadingId(null);
        }
    };

    // ==========================================
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {
        switch (status) {
            case "Issued":
                return "offer-status issued";

            case "Accepted":
                return "offer-status accepted";

            case "Declined":
                return "offer-status declined";

            case "Cancelled":
                return "offer-status cancelled";

            default:
                return "offer-status";
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
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="offer-loading">

                <div className="offer-loader"></div>

                <p>
                    Loading your offer letters...
                </p>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="my-offer-page">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="offer-page-header">

                <div className="offer-header-content">

                    <div className="offer-header-main">

                        <div className="offer-breadcrumb">

                            Student Portal

                            <span>›</span>

                            Placement

                            <span>›</span>

                            My Offer Letters

                        </div>

                        <div className="offer-badge">
                            🎉 PLACEMENT CENTER
                        </div>

                        <h1>
                            My Offer Letters
                        </h1>

                        <p>
                            View and download your placement
                            offer letters.
                        </p>

                    </div>

                    <div className="offer-header-icon">
                        🎉
                    </div>

                </div>

            </div>


            {/* ==========================================
                CONTENT
            ========================================== */}

            <div className="offer-content">

                {offerLetters.length === 0 ? (

                    /* ==========================================
                       EMPTY STATE
                    ========================================== */

                    <div className="offer-empty">

                        <div className="offer-empty-icon">
                            📄
                        </div>

                        <h2>
                            No Offer Letters Yet
                        </h2>

                        <p>
                            You don't have any offer letters
                            at the moment.
                        </p>

                        <span>
                            Once a company offer is issued to you,
                            it will appear here.
                        </span>

                    </div>

                ) : (

                    <>

                        {/* ==========================================
                            SECTION HEADER
                        ========================================== */}

                        <div className="offer-section-header">

                            <div>

                                <div className="offer-section-badge">
                                    📄 OFFER LETTERS
                                </div>

                                <h2>
                                    Your Placement Offers
                                </h2>

                                <p>
                                    Review your issued offers and
                                    download your official offer letters.
                                </p>

                            </div>

                            <div className="offer-count">

                                <strong>
                                    {offerLetters.length}
                                </strong>

                                <span>
                                    Offer Letters
                                </span>

                            </div>

                        </div>


                        {/* ==========================================
                            OFFER LETTER GRID
                        ========================================== */}

                        <div className="offer-letters-grid">

                            {offerLetters.map((offer) => (

                                <div
                                    className="offer-letter-card"
                                    key={offer._id}
                                >

                                    {/* ==========================================
                                        CARD HEADER
                                    ========================================== */}

                                    <div className="offer-card-header">

                                        <div className="offer-company">

                                            <div className="offer-company-logo">

                                                {offer.company?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    "C"}

                                            </div>

                                            <div className="offer-company-info">

                                                <h2>
                                                    {offer.company?.name ||
                                                        "Company"}
                                                </h2>

                                                <p>
                                                    {offer.job?.jobTitle ||
                                                        "Job Position"}
                                                </p>

                                            </div>

                                        </div>

                                        <span
                                            className={getStatusClass(
                                                offer.offerStatus
                                            )}
                                        >

                                            <span className="offer-status-dot"></span>

                                            {offer.offerStatus ||
                                                "Issued"}

                                        </span>

                                    </div>


                                    <div className="offer-card-divider"></div>


                                    {/* ==========================================
                                        OFFER DETAILS
                                    ========================================== */}

                                    <div className="offer-details">

                                        {/* Offer Date */}

                                        <div className="offer-detail">

                                            <span className="offer-detail-icon">
                                                📅
                                            </span>

                                            <div>

                                                <small>
                                                    Offer Date
                                                </small>

                                                <strong>
                                                    {formatDate(
                                                        offer.offerDate
                                                    )}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Joining Date */}

                                        <div className="offer-detail">

                                            <span className="offer-detail-icon">
                                                🚀
                                            </span>

                                            <div>

                                                <small>
                                                    Joining Date
                                                </small>

                                                <strong>
                                                    {formatDate(
                                                        offer.joiningDate
                                                    )}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Salary */}

                                        <div className="offer-detail">

                                            <span className="offer-detail-icon">
                                                💰
                                            </span>

                                            <div>

                                                <small>
                                                    Salary
                                                </small>

                                                <strong>
                                                    {offer.salary
                                                        ? `₹${offer.salary} LPA`
                                                        : "-"}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Location */}

                                        <div className="offer-detail">

                                            <span className="offer-detail-icon">
                                                📍
                                            </span>

                                            <div>

                                                <small>
                                                    Job Location
                                                </small>

                                                <strong>
                                                    {offer.jobLocation ||
                                                        "-"}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ==========================================
                                        REMARKS
                                    ========================================== */}

                                    {offer.remarks && (

                                        <div className="offer-remarks">

                                            <div className="offer-remarks-icon">
                                                💬
                                            </div>

                                            <div>

                                                <small>
                                                    Remarks
                                                </small>

                                                <p>
                                                    {offer.remarks}
                                                </p>

                                            </div>

                                        </div>

                                    )}


                                    {/* ==========================================
                                        DOWNLOAD
                                    ========================================== */}

                                    <button
                                        className="download-offer-btn"
                                        onClick={() =>
                                            handleDownloadPDF(
                                                offer._id
                                            )
                                        }
                                        disabled={
                                            downloadingId ===
                                            offer._id
                                        }
                                    >

                                        <span className="download-offer-icon">

                                            {downloadingId ===
                                            offer._id
                                                ? "⏳"
                                                : "↓"}

                                        </span>

                                        {downloadingId ===
                                        offer._id
                                            ? "Downloading..."
                                            : "Download Offer Letter"}

                                    </button>

                                </div>

                            ))}

                        </div>

                    </>
                )}

            </div>

        </div>
    );
};

export default MyOfferLetters;