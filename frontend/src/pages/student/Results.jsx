
import { useEffect, useState } from "react";
import "./Results.css";

function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/results/my-results",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setResults(data.results);
                } else {
                    setMessage(data.message);
                }

            } catch (error) {
                console.log("Results fetch error:", error);
                setMessage("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    const handleDownloadPDF = async () => {
        try {
            setDownloading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/results/my-results/pdf",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const data = await response.json();
                alert(data.message || "Unable to download marksheet");
                return;
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "student-marksheet.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.log("PDF download error:", error);
            alert("Unable to download marksheet");
        } finally {
            setDownloading(false);
        }
    };

    const totalMarks = results.reduce(
        (total, result) => total + result.marks,
        0
    );

    const maxMarks = results.reduce(
        (total, result) => total + result.totalMarks,
        0
    );

    const percentage =
        maxMarks > 0
            ? ((totalMarks / maxMarks) * 100).toFixed(2)
            : "0.00";

    const overallGrade =
        results.length > 0
            ? results[0].grade
            : "-";

    const overallStatus =
        results.length > 0 &&
        results.every((result) => result.status === "Pass")
            ? "PASS"
            : results.length > 0
                ? "FAIL"
                : "-";

    if (loading) {
        return (
            <div className="results-page">
                <p>Loading results...</p>
            </div>
        );
    }

    return (
        <div className="results-page">

            <div className="results-header">
                <h1>My Results</h1>

                <p>
                    View your semester examination results
                </p>
            </div>

            {message && (
                <p className="results-message">
                    {message}
                </p>
            )}

            {/* Summary */}

            <div className="result-summary">

                <div className="result-summary-card">
                    <span>Total Marks</span>

                    <strong>
                        {totalMarks} / {maxMarks}
                    </strong>
                </div>

                <div className="result-summary-card">
                    <span>Percentage</span>

                    <strong>
                        {percentage}%
                    </strong>
                </div>

                <div className="result-summary-card">
                    <span>Overall Grade</span>

                    <strong>
                        {overallGrade}
                    </strong>
                </div>

                <div className="result-summary-card">
                    <span>Status</span>

                    <strong className="pass-status">
                        {overallStatus}
                    </strong>
                </div>

            </div>


            {/* Download Button */}

            <div className="results-download-section">

                <button
                    className="download-marksheet-btn"
                    onClick={handleDownloadPDF}
                    disabled={downloading || results.length === 0}
                >
                    {downloading
                        ? "Downloading..."
                        : "Download Marksheet PDF"}
                </button>

            </div>


            {/* Results Table */}

            <div className="results-card">

                <div className="results-card-header">

                    <div>

                        <h2>
                            Semester Examination Result
                        </h2>

                        <p>
                            Academic Year 2026
                        </p>

                    </div>

                    <span>
                        Published
                    </span>

                </div>


                <div className="results-table">

                    <div className="result-row result-heading">

                        <span>
                            Code
                        </span>

                        <span>
                            Subject
                        </span>

                        <span>
                            Marks
                        </span>

                        <span>
                            Grade
                        </span>

                    </div>


                    {results.length === 0 ? (

                        <div className="result-row">

                            <span>
                                No results available
                            </span>

                        </div>

                    ) : (

                        results.map((result) => (

                            <div
                                className="result-row"
                                key={result._id}
                            >

                                <strong>
                                    {result.subjectCode}
                                </strong>

                                <span>
                                    {result.subject}
                                </span>

                                <span>
                                    {result.marks} / {result.totalMarks}
                                </span>

                                <strong className="grade">
                                    {result.grade}
                                </strong>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default Results;
