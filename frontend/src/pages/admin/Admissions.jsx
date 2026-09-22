
import { useEffect, useState } from "react";
import "./Admissions.css";

function Admissions() {
    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // ===============================
    // FETCH ADMISSIONS
    // ===============================

    useEffect(() => {
        const fetchAdmissions = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/admissions/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setAdmissions(data.admissions || []);
                } else {
                    console.log(data.message);
                    setAdmissions([]);
                }
            } catch (error) {
                console.log(
                    "Admissions fetch error:",
                    error
                );

                setAdmissions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmissions();
    }, []);

    // ===============================
    // APPROVE / REJECT ADMISSION
    // ===============================

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/admissions/${id}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        status: status
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            // Update admission status on screen
            setAdmissions((prevAdmissions) =>
                prevAdmissions.map((admission) =>
                    admission._id === id
                        ? {
                            ...admission,
                            status: status
                        }
                        : admission
                )
            );

            alert(data.message);
        } catch (error) {
            console.log(
                "Status update error:",
                error
            );

            alert("Something went wrong");
        }
    };

    // ===============================
    // ADMISSION COUNTS
    // ===============================

    const pendingCount = admissions.filter(
        (admission) =>
            admission.status === "pending"
    ).length;

    const approvedCount = admissions.filter(
        (admission) =>
            admission.status === "approved"
    ).length;

    const rejectedCount = admissions.filter(
        (admission) =>
            admission.status === "rejected"
    ).length;

    // ===============================
    // SEARCH + STATUS FILTER
    // ===============================

    const filteredAdmissions = admissions.filter(
        (admission) => {

            const searchText = search.toLowerCase();

            const matchesSearch =
                admission.student?.fullName
                    ?.toLowerCase()
                    .includes(searchText) ||

                admission.student?.email
                    ?.toLowerCase()
                    .includes(searchText) ||

                admission.course
                    ?.toLowerCase()
                    .includes(searchText) ||

                admission.branch
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                statusFilter === "all" ||
                admission.status === statusFilter;

            return matchesSearch && matchesStatus;
        }
    );

    // ===============================
    // LOADING
    // ===============================

    if (loading) {
        return (
            <div className="admissions-page">

                <div className="admissions-loading">
                    <div className="admissions-loader"></div>

                    <p>
                        Loading admissions...
                    </p>
                </div>

            </div>
        );
    }

    // ===============================
    // MAIN UI
    // ===============================

    return (
        <div className="admissions-page">

            {/* ===============================
                HEADER
            =============================== */}

            <div className="admissions-header">

                <div className="admissions-title-content">

                    <div className="admissions-title-icon">
                        🎓
                    </div>

                    <div>

                        <h1>
                            Admission Management
                        </h1>

                        <p>
                            Review and manage student admission applications
                        </p>

                    </div>

                </div>

                <div className="admissions-header-summary">

                    <span>
                        Total Applications:
                    </span>

                    <strong>
                        {admissions.length}
                    </strong>

                </div>

            </div>


            {/* ===============================
                ADMISSION SUMMARY
            =============================== */}

            <div className="admission-summary-grid">

                {/* TOTAL */}

                <div className="admission-summary-card total">

                    <div className="summary-card-icon">
                        📋
                    </div>

                    <div>

                        <span>
                            Total Applications
                        </span>

                        <strong>
                            {admissions.length}
                        </strong>

                    </div>

                </div>


                {/* PENDING */}

                <div className="admission-summary-card pending">

                    <div className="summary-card-icon">
                        ⏳
                    </div>

                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            {pendingCount}
                        </strong>

                    </div>

                </div>


                {/* APPROVED */}

                <div className="admission-summary-card approved">

                    <div className="summary-card-icon">
                        ✓
                    </div>

                    <div>

                        <span>
                            Approved
                        </span>

                        <strong>
                            {approvedCount}
                        </strong>

                    </div>

                </div>


                {/* REJECTED */}

                <div className="admission-summary-card rejected">

                    <div className="summary-card-icon">
                        ✕
                    </div>

                    <div>

                        <span>
                            Rejected
                        </span>

                        <strong>
                            {rejectedCount}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ===============================
                ADMISSIONS CARD
            =============================== */}

            <div className="admissions-card">

                {/* ===============================
                    TABLE HEADER
                =============================== */}

                <div className="admissions-table-header">

                    <div>

                        <h2>
                            Admission Applications
                        </h2>

                        <span className="pending-count">
                            Pending: {pendingCount}
                        </span>

                    </div>


                    {/* ===============================
                        SEARCH + FILTER
                    =============================== */}

                    <div className="admission-filters">

                        <div className="admission-search-box">

                            <span>
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search student, email, course..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="admission-search"
                            />

                        </div>


                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="admission-status-filter"
                        >

                            <option value="all">
                                All Status
                            </option>

                            <option value="pending">
                                Pending
                            </option>

                            <option value="approved">
                                Approved
                            </option>

                            <option value="rejected">
                                Rejected
                            </option>

                        </select>

                    </div>

                </div>


                {/* ===============================
                    TABLE
                =============================== */}

                <div className="admissions-table-wrapper">

                    <table className="admissions-table">

                        <thead>

                            <tr>

                                <th>
                                    Student
                                </th>

                                <th>
                                    Student ID
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Course
                                </th>

                                <th>
                                    Branch
                                </th>

                                <th>
                                    Year
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredAdmissions.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >

                                        <div className="admission-empty-state">

                                            <div className="empty-state-icon">
                                                📭
                                            </div>

                                            <strong>
                                                No admission applications found
                                            </strong>

                                            <span>
                                                Try changing your search or status filter.
                                            </span>

                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                filteredAdmissions.map(
                                    (admission) => (

                                        <tr
                                            key={admission._id}
                                        >

                                            {/* STUDENT */}

                                            <td>

                                                <div className="admission-student">

                                                    <div className="student-avatar">
                                                        {admission.student?.fullName
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || "S"}
                                                    </div>

                                                    <strong>
                                                        {admission.student?.fullName || "-"}
                                                    </strong>

                                                </div>

                                            </td>


                                            {/* STUDENT ID */}

                                            <td>

                                                <span className="student-id-value">

                                                    {admission.student?._id
                                                        ? `${admission.student._id.slice(0, 8)}...`
                                                        : "-"}

                                                </span>

                                            </td>


                                            {/* EMAIL */}

                                            <td>
                                                {admission.student?.email || "-"}
                                            </td>


                                            {/* COURSE */}

                                            <td>
                                                {admission.course || "-"}
                                            </td>


                                            {/* BRANCH */}

                                            <td>
                                                {admission.branch || "-"}
                                            </td>


                                            {/* YEAR */}

                                            <td>
                                                {admission.admissionYear || "-"}
                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`status-badge ${admission.status}`}
                                                >

                                                    {admission.status === "approved"
                                                        ? "✓ Approved"
                                                        : admission.status === "rejected"
                                                            ? "✕ Rejected"
                                                            : "⏳ Pending"}

                                                </span>

                                            </td>


                                            {/* ACTION */}

                                            <td>

                                                {admission.status === "pending" ? (

                                                    <div className="admission-actions">

                                                        <button
                                                            className="approve-btn"
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    admission._id,
                                                                    "approved"
                                                                )
                                                            }
                                                        >
                                                            ✓ Approve
                                                        </button>


                                                        <button
                                                            className="reject-btn"
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    admission._id,
                                                                    "rejected"
                                                                )
                                                            }
                                                        >
                                                            ✕ Reject
                                                        </button>

                                                    </div>

                                                ) : (

                                                    <span className="no-admission-action">

                                                        Already {admission.status}

                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Admissions;