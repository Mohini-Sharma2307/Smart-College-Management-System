
import { useEffect, useState } from "react";
import "./ApplicationManagement.css";

const ApplicationManagement = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH ALL APPLICATIONS
    // ==========================================

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/job-applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setApplications(data.applications || []);
            } else {
                setApplications([]);
            }

        } catch (error) {
            console.error(
                "Fetch applications error:",
                error
            );

            setApplications([]);

        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // UPDATE APPLICATION STATUS
    // ==========================================

    const updateStatus = async (applicationId, status) => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/job-applications/${applicationId}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        status
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                setApplications((previousApplications) =>
                    previousApplications.map((application) =>
                        application._id === applicationId
                            ? {
                                ...application,
                                status
                            }
                            : application
                    )
                );

            } else {

                console.error(
                    data.message ||
                    "Unable to update application status"
                );

            }

        } catch (error) {

            console.error(
                "Update status error:",
                error
            );

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
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {

        switch (status) {

            case "Applied":
                return "status-applied";

            case "Shortlisted":
                return "status-shortlisted";

            case "Selected":
                return "status-selected";

            case "Rejected":
                return "status-rejected";

            default:
                return "status-applied";
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="application-management-loading">

                <div className="application-management-loader"></div>

                <p>
                    Loading applications...
                </p>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div className="application-management-page">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="application-management-header">

                <div>

                    <div className="application-management-breadcrumb">
                        Admin Portal › Placement › Applications
                    </div>

                    <h1>
                        Application Management
                    </h1>

                    <p>
                        Review and manage student placement
                        applications.
                    </p>

                </div>


                <div className="application-management-count">
                    📋 {applications.length} Applications
                </div>

            </div>


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="application-management-summary">


                <div className="application-summary-box">

                    <span>
                        📋
                    </span>

                    <div>

                        <small>
                            Total
                        </small>

                        <strong>
                            {applications.length}
                        </strong>

                    </div>

                </div>


                <div className="application-summary-box">

                    <span>
                        📨
                    </span>

                    <div>

                        <small>
                            Applied
                        </small>

                        <strong>
                            {
                                applications.filter(
                                    (application) =>
                                        application.status === "Applied"
                                ).length
                            }
                        </strong>

                    </div>

                </div>


                <div className="application-summary-box">

                    <span>
                        ⭐
                    </span>

                    <div>

                        <small>
                            Shortlisted
                        </small>

                        <strong>
                            {
                                applications.filter(
                                    (application) =>
                                        application.status === "Shortlisted"
                                ).length
                            }
                        </strong>

                    </div>

                </div>


                <div className="application-summary-box">

                    <span>
                        ✓
                    </span>

                    <div>

                        <small>
                            Selected
                        </small>

                        <strong>
                            {
                                applications.filter(
                                    (application) =>
                                        application.status === "Selected"
                                ).length
                            }
                        </strong>

                    </div>

                </div>


                <div className="application-summary-box">

                    <span>
                        ✕
                    </span>

                    <div>

                        <small>
                            Rejected
                        </small>

                        <strong>
                            {
                                applications.filter(
                                    (application) =>
                                        application.status === "Rejected"
                                ).length
                            }
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==========================================
                EMPTY STATE
            ========================================== */}

            {applications.length === 0 ? (

                <div className="application-management-empty">

                    <div>
                        📋
                    </div>

                    <h2>
                        No Applications Found
                    </h2>

                    <p>
                        Students have not submitted any placement
                        applications yet.
                    </p>

                </div>

            ) : (


                /* ==========================================
                    APPLICATION TABLE
                ========================================== */

                <div className="application-table-container">

                    <table className="application-table">

                        <thead>

                            <tr>

                                <th>
                                    Student
                                </th>

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
                                    Applied On
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {applications.map(
                                (application) => {

                                    const student =
                                        application.student || {};

                                    const job =
                                        application.job || {};

                                    return (

                                        <tr
                                            key={application._id}
                                        >

                                            {/* STUDENT */}

                                            <td>

                                                <div className="student-application-info">

                                                    <div className="student-application-avatar">
                                                        {student.fullName
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || "S"}
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {student.fullName ||
                                                                "-"}
                                                        </strong>

                                                        <span>
                                                            {student.email ||
                                                                "-"}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* JOB */}

                                            <td>

                                                <strong>
                                                    {job.jobTitle ||
                                                        "-"}
                                                </strong>

                                                <span className="table-sub-text">
                                                    {job.jobType ||
                                                        "-"}
                                                </span>

                                            </td>


                                            {/* COMPANY */}

                                            <td>

                                                {job.company?.name ||
                                                    job.company ||
                                                    "-"}

                                            </td>


                                            {/* LOCATION */}

                                            <td>

                                                📍{" "}

                                                {job.location ||
                                                    "-"}

                                            </td>


                                            {/* APPLIED DATE */}

                                            <td>

                                                {formatDate(
                                                    application.appliedAt ||
                                                    application.createdAt
                                                )}

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <select
                                                    className={`application-status-select ${getStatusClass(
                                                        application.status
                                                    )}`}
                                                    value={
                                                        application.status ||
                                                        "Applied"
                                                    }
                                                    onChange={(event) =>
                                                        updateStatus(
                                                            application._id,
                                                            event.target.value
                                                        )
                                                    }
                                                >

                                                    <option value="Applied">
                                                        Applied
                                                    </option>

                                                    <option value="Shortlisted">
                                                        Shortlisted
                                                    </option>

                                                    <option value="Selected">
                                                        Selected
                                                    </option>

                                                    <option value="Rejected">
                                                        Rejected
                                                    </option>

                                                </select>

                                            </td>

                                        </tr>

                                    );

                                }
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default ApplicationManagement;

