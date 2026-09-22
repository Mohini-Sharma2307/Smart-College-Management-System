import { useEffect, useState } from "react";
import "./AdmitCard.css";

const AdmitCard = () => {
    const [admitCards, setAdmitCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [downloading, setDownloading] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAdmitCards();
    }, []);

    // ======================================================
    // FETCH STUDENT ADMIT CARDS
    // ======================================================

    const fetchAdmitCards = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/admit-cards/my-admit-card",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to fetch admit cards"
                );
            }

            setAdmitCards(
                data.admitCards || []
            );

        } catch (error) {
            console.log(
                "Admit card fetch error:",
                error
            );

            setError(error.message);

        } finally {
            setLoading(false);
        }
    };


    // ======================================================
    // DOWNLOAD PDF
    // ======================================================

    const handleDownloadPDF = async () => {
        try {
            setDownloading(true);

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/admit-cards/my-admit-card/pdf",
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                let errorMessage =
                    "Unable to download admit card";

                try {
                    const data =
                        await response.json();

                    errorMessage =
                        data.message ||
                        errorMessage;

                } catch (error) {
                    console.log(
                        "Error parsing response:",
                        error
                    );
                }

                alert(errorMessage);
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

            link.download =
                "student-admit-card.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.log(
                "Download error:",
                error
            );

            alert(
                "Unable to download admit card"
            );

        } finally {
            setDownloading(false);
        }
    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {
        return (
            <div className="admit-card-page">

                <div className="admit-card-message">
                    Loading admit card...
                </div>

            </div>
        );
    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error) {
        return (
            <div className="admit-card-page">

                <div className="admit-card-error">
                    {error}
                </div>

            </div>
        );
    }


    // ======================================================
    // NO ADMIT CARD
    // ======================================================

    if (admitCards.length === 0) {
        return (
            <div className="admit-card-page">

                <div className="admit-card-empty">

                    <h2>
                        No Admit Card Available
                    </h2>

                    <p>
                        Your admit card has not been generated yet.
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div className="admit-card-page">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="student-admit-header">

                <div>

                    <h1>
                        My Admit Cards
                    </h1>

                    <p>
                        Your examination admit card details
                    </p>

                </div>

                <button
                    type="button"
                    className="student-download-admit-btn"
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                >
                    {downloading
                        ? "Downloading..."
                        : "Download Admit Card"}
                </button>

            </div>


            {/* ==================================================
                ADMIT CARDS
            ================================================== */}

            <div className="student-admit-list">

                {admitCards.map(
                    (card) => (

                        <div
                            className="student-admit-card"
                            key={card._id}
                        >

                            {/* COLLEGE HEADER */}

                            <div className="admit-college-header">

                                <div>

                                    <h2>
                                        SMART COLLEGE
                                    </h2>

                                    <p>
                                        College Management System
                                    </p>

                                </div>

                                <div className="admit-card-label">
                                    ADMIT CARD
                                </div>

                            </div>


                            {/* STUDENT INFORMATION */}

                            <div className="student-admit-section">

                                <h3>
                                    Student Information
                                </h3>

                                <div className="student-admit-grid">

                                    <div>
                                        <span>
                                            Student Name
                                        </span>

                                        <strong>
                                            {
                                                card.student
                                                    ?.fullName ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Email
                                        </span>

                                        <strong>
                                            {
                                                card.student
                                                    ?.email ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Roll Number
                                        </span>

                                        <strong>
                                            {
                                                card.rollNumber ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Course
                                        </span>

                                        <strong>
                                            {
                                                card.course ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Branch
                                        </span>

                                        <strong>
                                            {
                                                card.branch ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Semester
                                        </span>

                                        <strong>
                                            {
                                                card.semester ||
                                                "-"
                                            }
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* EXAMINATION INFORMATION */}

                            <div className="student-admit-section">

                                <h3>
                                    Examination Details
                                </h3>

                                <div className="student-admit-grid">

                                    <div>
                                        <span>
                                            Subject
                                        </span>

                                        <strong>
                                            {
                                                card.exam
                                                    ?.subject ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Subject Code
                                        </span>

                                        <strong>
                                            {
                                                card.exam
                                                    ?.subjectCode ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Exam Date
                                        </span>

                                        <strong>
                                            {
                                                card.exam
                                                    ?.examDate
                                                    ? new Date(
                                                        card.exam.examDate
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )
                                                    : "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Exam Time
                                        </span>

                                        <strong>
                                            {
                                                card.exam
                                                    ?.examTime ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Exam Room
                                        </span>

                                        <strong>
                                            {
                                                card.exam
                                                    ?.room ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Status
                                        </span>

                                        <strong className="student-admit-status">
                                            {
                                                card.status ||
                                                "Generated"
                                            }
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* VERIFICATION */}

                            <div className="student-verification-box">

                                <div>

                                    <span>
                                        Verification Code
                                    </span>

                                    <strong>
                                        {
                                            card.verificationCode ||
                                            "-"
                                        }
                                    </strong>

                                </div>

                                <p>
                                    This admit card can be verified using the QR code provided in the downloaded PDF.
                                </p>

                            </div>


                            {/* FOOTER */}

                            <div className="student-admit-footer">

                                Smart College Management System

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>
    );
};

export default AdmitCard;
