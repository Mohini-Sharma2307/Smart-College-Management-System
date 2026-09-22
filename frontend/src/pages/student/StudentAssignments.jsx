import React, { useEffect, useState } from "react";
import "./StudentAssignments.css";

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submittingId, setSubmittingId] = useState(null);

    const [answers, setAnswers] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({});

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH ASSIGNMENTS
    // ==========================================

    const fetchAssignments = async () => {
        try {
            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/assignments/my-assignments",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setAssignments(data.assignments || []);
            } else {
                setAssignments([]);
            }
        } catch (error) {
            console.log("Assignment fetch error:", error);
            setAssignments([]);
        }
    };

    // ==========================================
    // FETCH MY SUBMISSIONS
    // ==========================================

    const fetchSubmissions = async () => {
        try {
            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/assignment-submissions/my-submissions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSubmissions(data.submissions || []);
            } else {
                setSubmissions([]);
            }
        } catch (error) {
            console.log("Submission fetch error:", error);
            setSubmissions([]);
        }
    };

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            await Promise.all([
                fetchAssignments(),
                fetchSubmissions()
            ]);

            setLoading(false);
        };

        loadData();
    }, []);

    // ==========================================
    // GET SUBMISSION FOR ASSIGNMENT
    // ==========================================

    const getSubmission = (assignmentId) => {
        return submissions.find(
            (submission) =>
                submission.assignment?._id === assignmentId
        );
    };

    // ==========================================
    // ANSWER CHANGE
    // ==========================================

    const handleAnswerChange = (assignmentId, value) => {
        setAnswers((prev) => ({
            ...prev,
            [assignmentId]: value
        }));
    };

    // ==========================================
    // FILE CHANGE
    // ==========================================

    const handleFileChange = (assignmentId, file) => {
        if (!file) {
            return;
        }

        // Maximum 5 MB
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5 MB.");

            setSelectedFiles((prev) => ({
                ...prev,
                [assignmentId]: null
            }));

            return;
        }

        setSelectedFiles((prev) => ({
            ...prev,
            [assignmentId]: file
        }));
    };

    // ==========================================
    // SUBMIT ASSIGNMENT
    // ==========================================

    const handleSubmitAssignment = async (assignmentId) => {
        try {
            const answer = answers[assignmentId] || "";
            const file = selectedFiles[assignmentId];

            if (!answer.trim() && !file) {
                alert(
                    "Please write an answer or attach a file before submitting."
                );

                return;
            }

            setSubmittingId(assignmentId);

            const formData = new FormData();

            formData.append(
                "assignment",
                assignmentId
            );

            formData.append(
                "answer",
                answer
            );

            if (file) {
                formData.append(
                    "submissionFile",
                    file
                );
            }

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/assignment-submissions",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Unable to submit assignment"
                );

                return;
            }

            alert("Assignment submitted successfully!");

            // Clear form
            setAnswers((prev) => ({
                ...prev,
                [assignmentId]: ""
            }));

            setSelectedFiles((prev) => ({
                ...prev,
                [assignmentId]: null
            }));

            // Refresh submissions
            await fetchSubmissions();

        } catch (error) {
            console.log(
                "Assignment submission error:",
                error
            );

            alert(
                "Unable to submit assignment"
            );
        } finally {
            setSubmittingId(null);
        }
    };

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
                year: "numeric"
            }
        );
    };

    // ==========================================
    // DUE STATUS
    // ==========================================

    const getDueStatus = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);

        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const difference =
            Math.ceil(
                (due - today) /
                (1000 * 60 * 60 * 24)
            );

        if (difference < 0) {
            return {
                text: "Overdue",
                className: "overdue"
            };
        }

        if (difference === 0) {
            return {
                text: "Due Today",
                className: "due-today"
            };
        }

        if (difference === 1) {
            return {
                text: "Due Tomorrow",
                className: "due-tomorrow"
            };
        }

        return {
            text: `${difference} days left`,
            className: "days-left"
        };
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="student-assignment-loading">
                <div className="assignment-loader"></div>

                <p>
                    Loading assignments...
                </p>
            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="student-assignments-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="student-assignment-header">

                <div>
                    <h1>
                        My Assignments
                    </h1>

                    <p>
                        View and submit your assignments
                    </p>
                </div>

                <div className="assignment-count">
                    <span>
                        {assignments.length}
                    </span>

                    <small>
                        Assignments
                    </small>
                </div>

            </div>


            {/* ==========================================
                NO ASSIGNMENTS
            ========================================== */}

            {assignments.length === 0 ? (

                <div className="no-assignments">

                    <div className="empty-assignment-icon">
                        📝
                    </div>

                    <h3>
                        No Assignments Available
                    </h3>

                    <p>
                        There are currently no assignments
                        available for you.
                    </p>

                </div>

            ) : (

                <div className="student-assignment-list">

                    {assignments.map((assignment) => {

                        const submission =
                            getSubmission(
                                assignment._id
                            );

                        const dueStatus =
                            getDueStatus(
                                assignment.dueDate
                            );

                        const selectedFile =
                            selectedFiles[
                                assignment._id
                            ];

                        return (

                            <div
                                className="student-assignment-card"
                                key={assignment._id}
                            >

                                {/* ==========================================
                                    CARD HEADER
                                ========================================== */}

                                <div className="assignment-card-header">

                                    <div className="assignment-title-area">

                                        <div className="assignment-icon">
                                            📝
                                        </div>

                                        <div>

                                            <h2>
                                                {assignment.title}
                                            </h2>

                                            <p>
                                                {assignment.subject?.name ||
                                                    "-"}
                                                {" "}
                                                (
                                                {assignment.subject?.code ||
                                                    "-"}
                                                )
                                            </p>

                                        </div>

                                    </div>


                                    <span
                                        className={`due-status ${dueStatus.className}`}
                                    >
                                        {dueStatus.text}
                                    </span>

                                </div>


                                {/* ==========================================
                                    ASSIGNMENT DETAILS
                                ========================================== */}

                                <div className="assignment-details">

                                    <div className="assignment-detail">

                                        <span>
                                            Subject
                                        </span>

                                        <strong>
                                            {assignment.subject?.name ||
                                                "-"}
                                        </strong>

                                    </div>


                                    <div className="assignment-detail">

                                        <span>
                                            Subject Code
                                        </span>

                                        <strong>
                                            {assignment.subject?.code ||
                                                "-"}
                                        </strong>

                                    </div>


                                    <div className="assignment-detail">

                                        <span>
                                            Due Date
                                        </span>

                                        <strong>
                                            {formatDate(
                                                assignment.dueDate
                                            )}
                                        </strong>

                                    </div>


                                    <div className="assignment-detail">

                                        <span>
                                            Created By
                                        </span>

                                        <strong>
                                            {assignment.createdBy?.fullName ||
                                                "-"}
                                        </strong>

                                    </div>

                                </div>


                                {/* ==========================================
                                    DESCRIPTION
                                ========================================== */}

                                <div className="assignment-description">

                                    <h3>
                                        Assignment Description
                                    </h3>

                                    <p>
                                        {assignment.description}
                                    </p>

                                </div>


                                {/* ==========================================
                                    SUBMISSION SECTION
                                ========================================== */}

                                {submission ? (

                                    <div className="submitted-assignment">

                                        <div className="submitted-header">

                                            <div>

                                                <span className="submitted-icon">
                                                    ✓
                                                </span>

                                                <strong>
                                                    Assignment Submitted
                                                </strong>

                                            </div>

                                            <span
                                                className={`submission-status ${
                                                    submission.status ===
                                                    "Late"
                                                        ? "late"
                                                        : "submitted"
                                                }`}
                                            >
                                                {submission.status}
                                            </span>

                                        </div>


                                        {/* ==========================================
                                            SUBMISSION INFO
                                        ========================================== */}

                                        <div className="submission-info">

                                            {/* Submitted Date */}

                                            <div>

                                                <span>
                                                    Submitted On
                                                </span>

                                                <strong>
                                                    {formatDate(
                                                        submission.submittedAt
                                                    )}
                                                </strong>

                                            </div>


                                            {/* Marks */}

                                            <div>

                                                <span>
                                                    Marks
                                                </span>

                                                <strong>
                                                    {submission.marks !== null &&
                                                    submission.marks !==
                                                        undefined
                                                        ? submission.marks
                                                        : "Not evaluated"}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* ==========================================
                                            FEEDBACK
                                        ========================================== */}

                                        {submission.feedback && (

                                            <div className="submission-feedback">

                                                <div className="feedback-header">

                                                    <span>
                                                        💬
                                                    </span>

                                                    <strong>
                                                        Teacher Feedback
                                                    </strong>

                                                </div>

                                                <p>
                                                    {submission.feedback}
                                                </p>

                                            </div>

                                        )}


                                        {/* ==========================================
                                            SUBMITTED ANSWER
                                        ========================================== */}

                                        {submission.answer && (

                                            <div className="submitted-answer">

                                                <span>
                                                    Your Answer
                                                </span>

                                                <p>
                                                    {submission.answer}
                                                </p>

                                            </div>

                                        )}


                                        {/* ==========================================
                                            SUBMITTED FILE
                                        ========================================== */}

                                        {submission.submissionFile && (

                                            <div className="submitted-file">

                                                <span>
                                                    📎
                                                </span>

                                                <div>

                                                    <strong>
                                                        File Attached
                                                    </strong>

                                                    <small>
                                                        {submission.submissionFile}
                                                    </small>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                ) : (

                                    <div className="submit-assignment-section">

                                        <h3>
                                            Submit Assignment
                                        </h3>


                                        {/* Answer */}

                                        <textarea
                                            value={
                                                answers[
                                                    assignment._id
                                                ] || ""
                                            }
                                            onChange={(event) =>
                                                handleAnswerChange(
                                                    assignment._id,
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Write your answer here..."
                                            rows="5"
                                        />


                                        {/* File Upload */}

                                        <div className="file-upload-area">

                                            <label
                                                htmlFor={`file-${assignment._id}`}
                                                className="file-upload-label"
                                            >

                                                <span>
                                                    📎
                                                </span>

                                                <div>

                                                    <strong>
                                                        Choose File
                                                    </strong>

                                                    <small>
                                                        PDF, DOC or DOCX • Max 5 MB
                                                    </small>

                                                </div>

                                            </label>


                                            <input
                                                id={`file-${assignment._id}`}
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(event) =>
                                                    handleFileChange(
                                                        assignment._id,
                                                        event.target.files[0]
                                                    )
                                                }
                                            />

                                        </div>


                                        {/* Selected File */}

                                        {selectedFile && (

                                            <div className="selected-file">

                                                <span>
                                                    📄
                                                </span>

                                                <div>

                                                    <strong>
                                                        {selectedFile.name}
                                                    </strong>

                                                    <small>
                                                        {(
                                                            selectedFile.size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2)}
                                                        {" "}
                                                        MB
                                                    </small>

                                                </div>

                                            </div>

                                        )}


                                        {/* Submit Button */}

                                        <button
                                            className="submit-assignment-btn"
                                            onClick={() =>
                                                handleSubmitAssignment(
                                                    assignment._id
                                                )
                                            }
                                            disabled={
                                                submittingId ===
                                                assignment._id
                                            }
                                        >

                                            {submittingId ===
                                            assignment._id
                                                ? "Submitting..."
                                                : "Submit Assignment"}

                                        </button>

                                    </div>

                                )}

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
};

export default StudentAssignments;
