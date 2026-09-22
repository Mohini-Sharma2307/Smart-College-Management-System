import React, { useEffect, useState } from "react";
import "./AssignmentSubmissions.css";

const AssignmentSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [marks, setMarks] = useState({});
    const [feedback, setFeedback] = useState({});

    const [evaluatingId, setEvaluatingId] = useState(null);

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH ALL SUBMISSIONS
    // ==========================================

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/assignment-submissions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch submissions"
                );
            }

            setSubmissions(data.submissions || []);
        } catch (error) {
            console.error(
                "Submissions fetch error:",
                error
            );

            setError(error.message);
            setSubmissions([]);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {
        fetchSubmissions();
    }, []);

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ==========================================
    // FORMAT DATE + TIME
    // ==========================================

    const formatDateTime = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    // ==========================================
    // SEARCH + FILTER
    // ==========================================

    const filteredSubmissions =
        submissions.filter((submission) => {

            const studentName =
                submission.student?.fullName || "";

            const studentEmail =
                submission.student?.email || "";

            const assignmentTitle =
                submission.assignment?.title || "";

            const subjectName =
                submission.assignment?.subject?.name || "";

            const subjectCode =
                submission.assignment?.subject?.code || "";

            const searchText =
                search.toLowerCase().trim();

            const matchesSearch =
                studentName
                    .toLowerCase()
                    .includes(searchText) ||
                studentEmail
                    .toLowerCase()
                    .includes(searchText) ||
                assignmentTitle
                    .toLowerCase()
                    .includes(searchText) ||
                subjectName
                    .toLowerCase()
                    .includes(searchText) ||
                subjectCode
                    .toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                statusFilter === "All" ||
                submission.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    // ==========================================
    // MARKS CHANGE
    // ==========================================

    const handleMarksChange = (
        submissionId,
        value
    ) => {
        setMarks((prev) => ({
            ...prev,
            [submissionId]: value,
        }));
    };

    // ==========================================
    // FEEDBACK CHANGE
    // ==========================================

    const handleFeedbackChange = (
        submissionId,
        value
    ) => {
        setFeedback((prev) => ({
            ...prev,
            [submissionId]: value,
        }));
    };

    // ==========================================
    // EVALUATE SUBMISSION
    // ==========================================

    const handleEvaluate = async (
        submissionId
    ) => {
        try {
            const submission =
                submissions.find(
                    (item) =>
                        item._id === submissionId
                );

            if (!submission) {
                return;
            }

            const currentMarks =
                marks[submissionId] !== undefined
                    ? marks[submissionId]
                    : submission.marks;

            const currentFeedback =
                feedback[submissionId] !== undefined
                    ? feedback[submissionId]
                    : submission.feedback;

            if (
                currentMarks === "" ||
                currentMarks === null ||
                currentMarks === undefined
            ) {
                alert("Please enter marks.");
                return;
            }

            if (Number(currentMarks) < 0) {
                alert("Marks cannot be negative.");
                return;
            }

            setEvaluatingId(submissionId);

            const response = await fetch(
                `http://localhost:5000/api/assignment-submissions/${submissionId}/evaluate`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        marks: Number(currentMarks),
                        feedback:
                            currentFeedback || "",
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to evaluate submission"
                );
            }

            alert(
                "Marks and feedback updated successfully."
            );

            setSubmissions((prev) =>
                prev.map((item) =>
                    item._id === submissionId
                        ? data.submission
                        : item
                )
            );

            setMarks((prev) => ({
                ...prev,
                [submissionId]:
                    data.submission.marks,
            }));

            setFeedback((prev) => ({
                ...prev,
                [submissionId]:
                    data.submission.feedback || "",
            }));
        } catch (error) {
            console.error(
                "Evaluate submission error:",
                error
            );

            alert(
                error.message ||
                "Unable to evaluate submission"
            );
        } finally {
            setEvaluatingId(null);
        }
    };

    // ==========================================
    // OPEN SUBMISSION FILE
    // ==========================================

    const handleOpenFile = (
        submissionFile
    ) => {
        if (!submissionFile) {
            alert(
                "No file attached with this submission."
            );

            return;
        }

        const fileUrl =
            `http://localhost:5000${submissionFile}`;

        window.open(
            fileUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    // ==========================================
    // CLEAR FILTERS
    // ==========================================

    const handleClearFilters = () => {
        setSearch("");
        setStatusFilter("All");
    };

    // ==========================================
    // STATISTICS
    // ==========================================

    const totalSubmissions =
        submissions.length;

    const submittedCount =
        submissions.filter(
            (item) =>
                item.status === "Submitted"
        ).length;

    const lateCount =
        submissions.filter(
            (item) =>
                item.status === "Late"
        ).length;

    const evaluatedCount =
        submissions.filter(
            (item) =>
                item.marks !== null &&
                item.marks !== undefined
        ).length;

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="assignment-submissions-page">

                <div className="submission-loading">

                    <div className="submission-loader"></div>

                    <h3>
                        Loading submissions...
                    </h3>

                    <p>
                        Please wait while we fetch assignment submissions.
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="assignment-submissions-page">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="submission-page-header">

                <div className="submission-header-left">

                    <div className="submission-header-icon">
                        📝
                    </div>

                    <div>
                        <h1>
                            Assignment Submissions
                        </h1>

                        <p>
                            Review, evaluate and give feedback
                            on student assignments
                        </p>
                    </div>

                </div>

                <div className="submission-count">

                    <span>
                        {submissions.length}
                    </span>

                    <small>
                        Total Submissions
                    </small>

                </div>

            </div>


            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (
                <div className="submission-error">
                    <span>!</span>
                    {error}
                </div>
            )}


            {/* ==========================================
                SUMMARY CARDS
            ========================================== */}

            <div className="submission-summary-grid">

                <div className="submission-summary-card">

                    <div className="submission-summary-icon">
                        📝
                    </div>

                    <div>
                        <span>
                            Total Submissions
                        </span>

                        <strong>
                            {totalSubmissions}
                        </strong>
                    </div>

                </div>


                <div className="submission-summary-card">

                    <div className="submission-summary-icon">
                        ✓
                    </div>

                    <div>
                        <span>
                            Submitted
                        </span>

                        <strong>
                            {submittedCount}
                        </strong>
                    </div>

                </div>


                <div className="submission-summary-card">

                    <div className="submission-summary-icon">
                        ⏰
                    </div>

                    <div>
                        <span>
                            Late
                        </span>

                        <strong>
                            {lateCount}
                        </strong>
                    </div>

                </div>


                <div className="submission-summary-card">

                    <div className="submission-summary-icon">
                        ★
                    </div>

                    <div>
                        <span>
                            Evaluated
                        </span>

                        <strong>
                            {evaluatedCount}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==========================================
                FILTER SECTION
            ========================================== */}

            <div className="submission-filter-card">

                <div className="submission-search-box">

                    <label>
                        Search
                    </label>

                    <div className="submission-search-wrapper">

                        <span className="submission-search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search student, assignment or subject..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>


                <div className="submission-status-filter">

                    <label>
                        Status
                    </label>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All
                        </option>

                        <option value="Submitted">
                            Submitted
                        </option>

                        <option value="Late">
                            Late
                        </option>

                    </select>

                </div>


                <button
                    type="button"
                    className="clear-submission-filter"
                    onClick={handleClearFilters}
                >
                    Clear
                </button>

            </div>


            {/* ==========================================
                RESULTS COUNT
            ========================================== */}

            <div className="submission-result-info">

                Showing{" "}

                <strong>
                    {filteredSubmissions.length}
                </strong>{" "}

                of{" "}

                <strong>
                    {submissions.length}
                </strong>{" "}

                submissions

            </div>


            {/* ==========================================
                NO SUBMISSIONS
            ========================================== */}

            {filteredSubmissions.length === 0 ? (

                <div className="no-submissions">

                    <div className="empty-submission-icon">
                        📭
                    </div>

                    <h3>
                        No Submissions Found
                    </h3>

                    <p>
                        No assignment submissions
                        match your current filters.
                    </p>

                </div>

            ) : (

                <div className="submission-list">

                    {filteredSubmissions.map(
                        (submission) => {

                            const student =
                                submission.student;

                            const assignment =
                                submission.assignment;

                            const subject =
                                assignment?.subject;

                            const currentMarks =
                                marks[
                                    submission._id
                                ] !== undefined
                                    ? marks[
                                        submission._id
                                    ]
                                    : submission.marks ?? "";

                            const currentFeedback =
                                feedback[
                                    submission._id
                                ] !== undefined
                                    ? feedback[
                                        submission._id
                                    ]
                                    : submission.feedback || "";

                            const hasEvaluation =
                                submission.marks !== null &&
                                submission.marks !== undefined;

                            return (

                                <div
                                    className="submission-card"
                                    key={submission._id}
                                >

                                    {/* ==================================
                                        CARD HEADER
                                    ================================== */}

                                    <div className="submission-card-header">

                                        <div className="submission-title-area">

                                            <div className="submission-icon">
                                                📝
                                            </div>

                                            <div>

                                                <h2>
                                                    {
                                                        assignment?.title ||
                                                        "Assignment"
                                                    }
                                                </h2>

                                                <p>
                                                    {
                                                        subject?.name ||
                                                        "-"
                                                    }

                                                    {" ("}

                                                    {
                                                        subject?.code ||
                                                        "-"
                                                    }

                                                    {")"}
                                                </p>

                                            </div>

                                        </div>


                                        <span
                                            className={`submission-status-badge ${
                                                submission.status === "Late"
                                                    ? "late"
                                                    : "submitted"
                                            }`}
                                        >
                                            <span className="status-dot"></span>
                                            {submission.status}
                                        </span>

                                    </div>


                                    {/* ==================================
                                        STUDENT DETAILS
                                    ================================== */}

                                    <div className="submission-student-section">

                                        <div className="student-avatar">

                                            {
                                                student?.fullName
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                "S"
                                            }

                                        </div>

                                        <div className="student-submission-info">

                                            <strong>
                                                {
                                                    student?.fullName ||
                                                    "-"
                                                }
                                            </strong>

                                            <span>
                                                {
                                                    student?.email ||
                                                    "-"
                                                }
                                            </span>

                                        </div>

                                    </div>


                                    {/* ==================================
                                        SUBMISSION DETAILS
                                    ================================== */}

                                    <div className="submission-details">

                                        <div className="submission-detail-item">

                                            <span>
                                                Assignment
                                            </span>

                                            <strong>
                                                {
                                                    assignment?.title ||
                                                    "-"
                                                }
                                            </strong>

                                        </div>


                                        <div className="submission-detail-item">

                                            <span>
                                                Subject
                                            </span>

                                            <strong>
                                                {
                                                    subject?.name ||
                                                    "-"
                                                }
                                            </strong>

                                        </div>


                                        <div className="submission-detail-item">

                                            <span>
                                                Due Date
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    assignment?.dueDate
                                                )}
                                            </strong>

                                        </div>


                                        <div className="submission-detail-item">

                                            <span>
                                                Submitted On
                                            </span>

                                            <strong>
                                                {formatDateTime(
                                                    submission.submittedAt
                                                )}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* ==================================
                                        STUDENT ANSWER
                                    ================================== */}

                                    <div className="student-answer-section">

                                        <div className="content-section-heading">

                                            <div>
                                                <h3>
                                                    Student Answer
                                                </h3>

                                                <p>
                                                    Answer submitted by the student
                                                </p>
                                            </div>

                                        </div>

                                        {submission.answer ? (

                                            <div className="student-answer-box">
                                                {submission.answer}
                                            </div>

                                        ) : (

                                            <div className="no-answer">
                                                No written answer provided.
                                            </div>

                                        )}

                                    </div>


                                    {/* ==================================
                                        FILE
                                    ================================== */}

                                    <div className="submission-file-section">

                                        <div className="content-section-heading">

                                            <div>
                                                <h3>
                                                    Attached File
                                                </h3>

                                                <p>
                                                    Supporting document submitted by student
                                                </p>
                                            </div>

                                        </div>


                                        {submission.submissionFile ? (

                                            <div className="attached-file-box">

                                                <div className="attached-file-info">

                                                    <span className="file-icon">
                                                        📎
                                                    </span>

                                                    <div>

                                                        <strong>
                                                            Submission File
                                                        </strong>

                                                        <small>
                                                            {
                                                                submission.submissionFile
                                                            }
                                                        </small>

                                                    </div>

                                                </div>

                                                <button
                                                    type="button"
                                                    className="view-file-btn"
                                                    onClick={() =>
                                                        handleOpenFile(
                                                            submission.submissionFile
                                                        )
                                                    }
                                                >
                                                    View File
                                                </button>

                                            </div>

                                        ) : (

                                            <div className="no-file">
                                                No file attached.
                                            </div>

                                        )}

                                    </div>


                                    {/* ==================================
                                        EVALUATION
                                    ================================== */}

                                    <div className="evaluation-section">

                                        <div className="evaluation-header">

                                            <div>

                                                <div className="evaluation-title-row">

                                                    <div className="evaluation-icon">
                                                        ✓
                                                    </div>

                                                    <div>

                                                        <h3>
                                                            Evaluation
                                                        </h3>

                                                        <p>
                                                            Give marks and feedback
                                                            to the student
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                            {hasEvaluation && (
                                                <span className="evaluated-badge">
                                                    Evaluated
                                                </span>
                                            )}

                                        </div>


                                        <div className="evaluation-form">

                                            <div className="marks-group">

                                                <label>
                                                    Marks
                                                </label>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder="Enter marks"
                                                    value={
                                                        currentMarks
                                                    }
                                                    onChange={(e) =>
                                                        handleMarksChange(
                                                            submission._id,
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="feedback-group">

                                                <label>
                                                    Feedback
                                                </label>

                                                <textarea
                                                    rows="3"
                                                    placeholder="Write feedback for the student..."
                                                    value={
                                                        currentFeedback
                                                    }
                                                    onChange={(e) =>
                                                        handleFeedbackChange(
                                                            submission._id,
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>

                                        </div>


                                        <button
                                            type="button"
                                            className="evaluate-submission-btn"
                                            onClick={() =>
                                                handleEvaluate(
                                                    submission._id
                                                )
                                            }
                                            disabled={
                                                evaluatingId ===
                                                submission._id
                                            }
                                        >

                                            {evaluatingId ===
                                            submission._id ? (
                                                <>
                                                    <span className="evaluation-spinner"></span>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    ✓{" "}
                                                    {hasEvaluation
                                                        ? "Update Evaluation"
                                                        : "Save Evaluation"}
                                                </>
                                            )}

                                        </button>

                                    </div>


                                    {/* ==================================
                                        CURRENT EVALUATION
                                    ================================== */}

                                    {hasEvaluation && (

                                        <div className="current-evaluation">

                                            <div className="current-marks-box">

                                                <span>
                                                    Current Marks
                                                </span>

                                                <strong>
                                                    {submission.marks}
                                                </strong>

                                            </div>


                                            {submission.feedback && (

                                                <div className="current-feedback">

                                                    <span>
                                                        Feedback
                                                    </span>

                                                    <p>
                                                        {
                                                            submission.feedback
                                                        }
                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    )}

                                </div>

                            );
                        }
                    )}

                </div>

            )}

        </div>
    );
};

export default AssignmentSubmissions;