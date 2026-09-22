import React, { useEffect, useState } from "react";
import "./StudentAttendance.css";

const StudentAttendance = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAttendanceSummary = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/attendance/my-attendance/summary",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch attendance"
                    );
                }

                setSummary(data);
            } catch (error) {
                console.error("Attendance error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceSummary();
    }, [token]);

    // =========================
    // Loading
    // =========================
    if (loading) {
        return (
            <div className="student-attendance-page">
                <div className="attendance-loading">
                    Loading attendance...
                </div>
            </div>
        );
    }

    // =========================
    // Error
    // =========================
    if (error) {
        return (
            <div className="student-attendance-page">
                <div className="attendance-error">
                    {error}
                </div>
            </div>
        );
    }

    // =========================
    // No Data
    // =========================
    if (!summary) {
        return (
            <div className="student-attendance-page">
                <div className="attendance-empty">
                    No attendance data available.
                </div>
            </div>
        );
    }

    const overall = summary.overall || {};
    const subjects = summary.subjects || [];

    return (
        <div className="student-attendance-page">

            {/* =========================
                Header
            ========================= */}
            <div className="attendance-header">
                <div>
                    <h1>Attendance</h1>
                    <p>
                        Track your overall and subject-wise attendance
                    </p>
                </div>
            </div>

            {/* =========================
                Overall Warning
            ========================= */}
            {overall.warning && (
                <div className="attendance-warning">
                    <strong>⚠ Attendance Warning</strong>
                    <p>{overall.warning}</p>
                </div>
            )}

            {/* =========================
                Summary Cards
            ========================= */}
            <div className="attendance-summary-grid">

                {/* Overall */}
                <div className="attendance-card overall-card">
                    <div className="attendance-card-icon">
                        📊
                    </div>

                    <div>
                        <p>Overall Attendance</p>

                        <h2>
                            {overall.percentage ?? 0}%
                        </h2>

                        <span
                            className={
                                overall.percentage >= 75
                                    ? "attendance-good"
                                    : "attendance-low"
                            }
                        >
                            {overall.attendanceStatus ||
                                "No Status"}
                        </span>
                    </div>
                </div>

                {/* Total Classes */}
                <div className="attendance-card">
                    <div className="attendance-card-icon">
                        📚
                    </div>

                    <div>
                        <p>Total Classes</p>
                        <h2>
                            {overall.totalClasses ?? 0}
                        </h2>
                    </div>
                </div>

                {/* Present */}
                <div className="attendance-card present-card">
                    <div className="attendance-card-icon">
                        ✅
                    </div>

                    <div>
                        <p>Present Classes</p>
                        <h2>
                            {overall.present ?? 0}
                        </h2>
                    </div>
                </div>

                {/* Absent */}
                <div className="attendance-card absent-card">
                    <div className="attendance-card-icon">
                        ❌
                    </div>

                    <div>
                        <p>Absent Classes</p>
                        <h2>
                            {overall.absent ?? 0}
                        </h2>
                    </div>
                </div>

            </div>

            {/* =========================
                Subject Wise Attendance
            ========================= */}
            <div className="subject-attendance-section">

                <div className="section-header">
                    <h2>Subject-wise Attendance</h2>
                    <span>
                        {subjects.length} Subject
                        {subjects.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {subjects.length === 0 ? (
                    <div className="attendance-empty">
                        No subject attendance records found.
                    </div>
                ) : (
                    <div className="attendance-table-container">

                        <table className="attendance-table">

                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Code</th>
                                    <th>Semester</th>
                                    <th>Total Classes</th>
                                    <th>Present</th>
                                    <th>Absent</th>
                                    <th>Percentage</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {subjects.map((subject, index) => {

                                    const percentage =
                                        subject.percentage ?? 0;

                                    return (
                                        <tr key={index}>

                                            <td>
                                                <strong>
                                                    {subject.subject ||
                                                        "N/A"}
                                                </strong>
                                            </td>

                                            <td>
                                                {subject.code || "N/A"}
                                            </td>

                                            <td>
                                                {subject.semester || "N/A"}
                                            </td>

                                            <td>
                                                {subject.totalClasses ?? 0}
                                            </td>

                                            <td className="present-text">
                                                {subject.present ?? 0}
                                            </td>

                                            <td className="absent-text">
                                                {subject.absent ?? 0}
                                            </td>

                                            <td>
                                                <div className="percentage-wrapper">

                                                    <div className="percentage-bar">
                                                        <div
                                                            className={
                                                                percentage >= 75
                                                                    ? "percentage-fill good-fill"
                                                                    : "percentage-fill low-fill"
                                                            }
                                                            style={{
                                                                width: `${Math.min(
                                                                    percentage,
                                                                    100
                                                                )}%`,
                                                            }}
                                                        ></div>
                                                    </div>

                                                    <span>
                                                        {percentage}%
                                                    </span>

                                                </div>
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        percentage >= 75
                                                            ? "status-badge good-status"
                                                            : "status-badge low-status"
                                                    }
                                                >
                                                    {subject.attendanceStatus ||
                                                        "No Status"}
                                                </span>
                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
};

export default StudentAttendance;