
// import React, { useEffect, useState } from "react";
// import "./AttendanceManagement.css";

// const AttendanceManagement = () => {
//     const [students, setStudents] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const [attendance, setAttendance] = useState([]);

//     const [student, setStudent] = useState("");
//     const [subject, setSubject] = useState("");
//     const [date, setDate] = useState("");
//     const [status, setStatus] = useState("Present");

//     // Search & Filters
//     const [search, setSearch] = useState("");
//     const [subjectFilter, setSubjectFilter] = useState("");
//     const [statusFilter, setStatusFilter] = useState("");

//     const token = localStorage.getItem("token");

//     // ==============================
//     // Fetch Students
//     // ==============================

//     const fetchStudents = async () => {
//         try {
//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/students",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setStudents(data.students || []);
//             } else {
//                 console.log(data.message);
//             }
//         } catch (error) {
//             console.log("Students fetch error:", error);
//         }
//     };

//     // ==============================
//     // Fetch Subjects
//     // ==============================

//     const fetchSubjects = async () => {
//         try {
//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/subjects",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setSubjects(data.subjects || []);
//             } else {
//                 console.log(data.message);
//             }
//         } catch (error) {
//             console.log("Subjects fetch error:", error);
//         }
//     };

//     // ==============================
//     // Fetch Attendance
//     // ==============================

//     const fetchAttendance = async () => {
//         try {
//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/attendance",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setAttendance(data.attendance || []);
//             } else {
//                 console.log(data.message);
//             }
//         } catch (error) {
//             console.log("Attendance fetch error:", error);
//         }
//     };

//     // ==============================
//     // Load Data
//     // ==============================

//     useEffect(() => {
//         fetchStudents();
//         fetchSubjects();
//         fetchAttendance();
//     }, []);

//     // ==============================
//     // Mark Attendance
//     // ==============================

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!student || !subject || !date || !status) {
//             alert("Please fill all fields");
//             return;
//         }

//         try {
//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/attendance",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({
//                         student,
//                         subject,
//                         date,
//                         status,
//                     }),
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 alert("Attendance marked successfully");

//                 setStudent("");
//                 setSubject("");
//                 setDate("");
//                 setStatus("Present");

//                 fetchAttendance();
//             } else {
//                 alert(
//                     data.message ||
//                     "Failed to mark attendance"
//                 );
//             }
//         } catch (error) {
//             console.log(
//                 "Mark attendance error:",
//                 error
//             );

//             alert("Server error");
//         }
//     };

//     // ==============================
//     // SEARCH + FILTER
//     // ==============================

//     const filteredAttendance = attendance.filter(
//         (item) => {

//             const studentName =
//                 item.student?.fullName?.toLowerCase() || "";

//             const studentEmail =
//                 item.student?.email?.toLowerCase() || "";

//             const subjectName =
//                 item.subject?.name?.toLowerCase() || "";

//             const subjectCode =
//                 item.subject?.code?.toLowerCase() || "";

//             const searchText =
//                 search.toLowerCase();

//             const matchesSearch =
//                 studentName.includes(searchText) ||
//                 studentEmail.includes(searchText) ||
//                 subjectName.includes(searchText) ||
//                 subjectCode.includes(searchText);

//             const matchesSubject =
//                 subjectFilter === "" ||
//                 item.subject?._id === subjectFilter;

//             const matchesStatus =
//                 statusFilter === "" ||
//                 item.status === statusFilter;

//             return (
//                 matchesSearch &&
//                 matchesSubject &&
//                 matchesStatus
//             );
//         }
//     );

//     // ==============================
//     // CLEAR FILTERS
//     // ==============================

//     const clearFilters = () => {
//         setSearch("");
//         setSubjectFilter("");
//         setStatusFilter("");
//     };

//     return (
//         <div className="attendance-management">

//             <h1>Attendance Management</h1>

//             {/* =================================
//                 ATTENDANCE FORM
//             ================================= */}

//             <form onSubmit={handleSubmit}>

//                 <div>
//                     <label>Student</label>

//                     <select
//                         value={student}
//                         onChange={(e) =>
//                             setStudent(e.target.value)
//                         }
//                     >
//                         <option value="">
//                             Select Student
//                         </option>

//                         {students.map((item) => (
//                             <option
//                                 key={item._id}
//                                 value={item._id}
//                             >
//                                 {item.fullName} - {item.email}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label>Subject</label>

//                     <select
//                         value={subject}
//                         onChange={(e) =>
//                             setSubject(e.target.value)
//                         }
//                     >
//                         <option value="">
//                             Select Subject
//                         </option>

//                         {subjects.map((item) => (
//                             <option
//                                 key={item._id}
//                                 value={item._id}
//                             >
//                                 {item.name} ({item.code})
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label>Date</label>

//                     <input
//                         type="date"
//                         value={date}
//                         onChange={(e) =>
//                             setDate(e.target.value)
//                         }
//                     />
//                 </div>

//                 <div>
//                     <label>Status</label>

//                     <select
//                         value={status}
//                         onChange={(e) =>
//                             setStatus(e.target.value)
//                         }
//                     >
//                         <option value="Present">
//                             Present
//                         </option>

//                         <option value="Absent">
//                             Absent
//                         </option>
//                     </select>
//                 </div>

//                 <button type="submit">
//                     Mark Attendance
//                 </button>

//             </form>


//             {/* =================================
//                 ATTENDANCE RECORDS
//             ================================= */}

//             <h2>Attendance Records</h2>


//             {/* =================================
//                 SEARCH & FILTERS
//             ================================= */}

//             <div className="attendance-filters">

//                 <input
//                     type="text"
//                     placeholder="Search student, email or subject..."
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(e.target.value)
//                     }
//                 />

//                 <select
//                     value={subjectFilter}
//                     onChange={(e) =>
//                         setSubjectFilter(e.target.value)
//                     }
//                 >
//                     <option value="">
//                         All Subjects
//                     </option>

//                     {subjects.map((item) => (
//                         <option
//                             key={item._id}
//                             value={item._id}
//                         >
//                             {item.name} ({item.code})
//                         </option>
//                     ))}
//                 </select>

//                 <select
//                     value={statusFilter}
//                     onChange={(e) =>
//                         setStatusFilter(e.target.value)
//                     }
//                 >
//                     <option value="">
//                         All Status
//                     </option>

//                     <option value="Present">
//                         Present
//                     </option>

//                     <option value="Absent">
//                         Absent
//                     </option>
//                 </select>

//                 <button
//                     type="button"
//                     className="clear-filter-btn"
//                     onClick={clearFilters}
//                 >
//                     Clear
//                 </button>

//             </div>


//             {/* =================================
//                 TABLE
//             ================================= */}

//             <table>

//                 <thead>
//                     <tr>
//                         <th>Student</th>
//                         <th>Email</th>
//                         <th>Subject</th>
//                         <th>Code</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>

//                 <tbody>

//                     {filteredAttendance.length === 0 ? (

//                         <tr>
//                             <td colSpan="6">
//                                 No attendance records found
//                             </td>
//                         </tr>

//                     ) : (

//                         filteredAttendance.map((item) => (

//                             <tr key={item._id}>

//                                 <td>
//                                     {item.student?.fullName}
//                                 </td>

//                                 <td>
//                                     {item.student?.email}
//                                 </td>

//                                 <td>
//                                     {item.subject?.name}
//                                 </td>

//                                 <td>
//                                     {item.subject?.code}
//                                 </td>

//                                 <td>
//                                     {new Date(
//                                         item.date
//                                     ).toLocaleDateString("en-IN")}
//                                 </td>

//                                 <td>
//                                     <span
//                                         className={
//                                             item.status === "Present"
//                                                 ? "attendance-present"
//                                                 : "attendance-absent"
//                                         }
//                                     >
//                                         {item.status}
//                                     </span>
//                                 </td>

//                             </tr>

//                         ))

//                     )}

//                 </tbody>

//             </table>

//         </div>
//     );
// };

// export default AttendanceManagement;




import React, { useEffect, useState } from "react";
import "./AttendanceManagement.css";

const AttendanceManagement = () => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [attendance, setAttendance] = useState([]);

    const [student, setStudent] = useState("");
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Present");

    const [search, setSearch] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const token = localStorage.getItem("token");

    // ======================================================
    // FETCH STUDENTS
    // ======================================================

    const fetchStudents = async () => {
        try {
            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/students",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                setStudents(data.students || []);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log("Students fetch error:", error);
        }
    };

    // ======================================================
    // FETCH SUBJECTS
    // ======================================================

    const fetchSubjects = async () => {
        try {
            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/subjects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSubjects(data.subjects || []);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log("Subjects fetch error:", error);
        }
    };

    // ======================================================
    // FETCH ATTENDANCE
    // ======================================================

    const fetchAttendance = async () => {
        try {
            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/attendance",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                setAttendance(data.attendance || []);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log("Attendance fetch error:", error);
        }
    };

    // ======================================================
    // LOAD DATA
    // ======================================================

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            await Promise.all([
                fetchStudents(),
                fetchSubjects(),
                fetchAttendance(),
            ]);

            setLoading(false);
        };

        loadData();
    }, []);

    // ======================================================
    // MARK ATTENDANCE
    // ======================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!student || !subject || !date || !status) {
            alert("Please fill all fields");
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/attendance",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        student,
                        subject,
                        date,
                        status,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Attendance marked successfully");

                setStudent("");
                setSubject("");
                setDate("");
                setStatus("Present");

                await fetchAttendance();
            } else {
                alert(
                    data.message ||
                    "Failed to mark attendance"
                );
            }
        } catch (error) {
            console.log(
                "Mark attendance error:",
                error
            );

            alert("Server error");
        } finally {
            setSubmitting(false);
        }
    };

    // ======================================================
    // SEARCH + FILTER
    // ======================================================

    const filteredAttendance = attendance.filter(
        (item) => {
            const studentName =
                item.student?.fullName?.toLowerCase() || "";

            const studentEmail =
                item.student?.email?.toLowerCase() || "";

            const subjectName =
                item.subject?.name?.toLowerCase() || "";

            const subjectCode =
                item.subject?.code?.toLowerCase() || "";

            const searchText =
                search.toLowerCase().trim();

            const matchesSearch =
                studentName.includes(searchText) ||
                studentEmail.includes(searchText) ||
                subjectName.includes(searchText) ||
                subjectCode.includes(searchText);

            const matchesSubject =
                subjectFilter === "" ||
                item.subject?._id === subjectFilter;

            const matchesStatus =
                statusFilter === "" ||
                item.status === statusFilter;

            return (
                matchesSearch &&
                matchesSubject &&
                matchesStatus
            );
        }
    );

    // ======================================================
    // CLEAR FILTERS
    // ======================================================

    const clearFilters = () => {
        setSearch("");
        setSubjectFilter("");
        setStatusFilter("");
    };

    // ======================================================
    // FORMAT DATE
    // ======================================================

    const formatDate = (dateValue) => {
        if (!dateValue) return "-";

        return new Date(
            dateValue
        ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // ======================================================
    // SUMMARY
    // ======================================================

    const totalPresent = attendance.filter(
        (item) => item.status === "Present"
    ).length;

    const totalAbsent = attendance.filter(
        (item) => item.status === "Absent"
    ).length;

    // ======================================================
    // MAIN UI
    // ======================================================

    return (
        <div className="attendance-management">

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="attendance-header">

                <div className="attendance-header-left">

                    <div className="attendance-header-icon">
                        📋
                    </div>

                    <div>
                        <h1>
                            Attendance Management
                        </h1>

                        <p>
                            Manage and track student attendance records
                        </p>
                    </div>

                </div>

                <div className="attendance-total-badge">
                    <span>Total Records</span>
                    <strong>
                        {attendance.length}
                    </strong>
                </div>

            </div>


            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="attendance-summary-grid">

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        👨‍🎓
                    </div>

                    <div>
                        <span>Total Students</span>
                        <strong>
                            {students.length}
                        </strong>
                    </div>

                </div>


                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        📚
                    </div>

                    <div>
                        <span>Total Subjects</span>
                        <strong>
                            {subjects.length}
                        </strong>
                    </div>

                </div>


                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        ✓
                    </div>

                    <div>
                        <span>Present Records</span>
                        <strong>
                            {totalPresent}
                        </strong>
                    </div>

                </div>


                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        !
                    </div>

                    <div>
                        <span>Absent Records</span>
                        <strong>
                            {totalAbsent}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==================================================
                MARK ATTENDANCE
            ================================================== */}

            <div className="attendance-form-card">

                <div className="attendance-form-header">

                    <div className="attendance-form-icon">
                        ✓
                    </div>

                    <div>
                        <h2>
                            Mark Attendance
                        </h2>

                        <p>
                            Select student, subject and attendance status
                        </p>
                    </div>

                </div>


                <form
                    className="attendance-form"
                    onSubmit={handleSubmit}
                >

                    {/* Student */}

                    <div className="attendance-form-group">

                        <label>
                            Student
                        </label>

                        <select
                            value={student}
                            onChange={(e) =>
                                setStudent(e.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select Student
                            </option>

                            {students.map((item) => (
                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.fullName}
                                    {" - "}
                                    {item.email}
                                </option>
                            ))}

                        </select>

                    </div>


                    {/* Subject */}

                    <div className="attendance-form-group">

                        <label>
                            Subject
                        </label>

                        <select
                            value={subject}
                            onChange={(e) =>
                                setSubject(e.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select Subject
                            </option>

                            {subjects.map((item) => (
                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.name}
                                    {" ("}
                                    {item.code}
                                    {")"}
                                </option>
                            ))}

                        </select>

                    </div>


                    {/* Date */}

                    <div className="attendance-form-group">

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Status */}

                    <div className="attendance-form-group">

                        <label>
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            required
                        >
                            <option value="Present">
                                Present
                            </option>

                            <option value="Absent">
                                Absent
                            </option>
                        </select>

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="mark-attendance-btn"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <span className="attendance-spinner"></span>
                                Marking...
                            </>
                        ) : (
                            <>
                                ✓ Mark Attendance
                            </>
                        )}
                    </button>

                </form>

            </div>


            {/* ==================================================
                ATTENDANCE RECORDS
            ================================================== */}

            <div className="attendance-records-card">

                <div className="attendance-records-header">

                    <div>

                        <h2>
                            Attendance Records
                        </h2>

                        <p>
                            View and filter all student attendance
                        </p>

                    </div>

                    <div className="records-count">
                        Showing {filteredAttendance.length}
                    </div>

                </div>


                {/* ==================================================
                    FILTERS
                ================================================== */}

                <div className="attendance-filters">

                    {/* Search */}

                    <div className="attendance-search-wrapper">

                        <span className="attendance-search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search student, email or subject..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    {/* Subject */}

                    <select
                        value={subjectFilter}
                        onChange={(e) =>
                            setSubjectFilter(e.target.value)
                        }
                    >
                        <option value="">
                            All Subjects
                        </option>

                        {subjects.map((item) => (
                            <option
                                key={item._id}
                                value={item._id}
                            >
                                {item.name}
                                {" ("}
                                {item.code}
                                {")"}
                            </option>
                        ))}

                    </select>


                    {/* Status */}

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="Present">
                            Present
                        </option>

                        <option value="Absent">
                            Absent
                        </option>

                    </select>


                    {/* Clear */}

                    <button
                        type="button"
                        className="clear-filter-btn"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>

                </div>


                {/* ==================================================
                    LOADING
                ================================================== */}

                {loading ? (

                    <div className="attendance-loading">

                        <div className="attendance-large-spinner"></div>

                        <h3>
                            Loading attendance records...
                        </h3>

                        <p>
                            Please wait while we fetch the data.
                        </p>

                    </div>

                ) : (

                    /* ==================================================
                       TABLE
                    ================================================== */

                    <div className="attendance-table-container">

                        <table className="attendance-table">

                            <thead>

                                <tr>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Code
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredAttendance.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="attendance-empty"
                                        >

                                            <div className="attendance-empty-icon">
                                                📋
                                            </div>

                                            <strong>
                                                No attendance records found
                                            </strong>

                                            <span>
                                                Try changing your search or filters.
                                            </span>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredAttendance.map(
                                        (item) => (

                                            <tr
                                                key={item._id}
                                            >

                                                {/* Student */}

                                                <td>

                                                    <div className="attendance-student">

                                                        <div className="attendance-avatar">
                                                            {
                                                                item.student
                                                                    ?.fullName
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() ||
                                                                "S"
                                                            }
                                                        </div>

                                                        <strong>
                                                            {
                                                                item.student
                                                                    ?.fullName ||
                                                                "-"
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>


                                                {/* Email */}

                                                <td>

                                                    <span className="attendance-email">
                                                        {
                                                            item.student
                                                                ?.email ||
                                                            "-"
                                                        }
                                                    </span>

                                                </td>


                                                {/* Subject */}

                                                <td>

                                                    <div className="attendance-subject">

                                                        <strong>
                                                            {
                                                                item.subject
                                                                    ?.name ||
                                                                "-"
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>


                                                {/* Code */}

                                                <td>

                                                    <span className="subject-code">
                                                        {
                                                            item.subject
                                                                ?.code ||
                                                            "-"
                                                        }
                                                    </span>

                                                </td>


                                                {/* Date */}

                                                <td>

                                                    <span className="attendance-date">
                                                        {formatDate(
                                                            item.date
                                                        )}
                                                    </span>

                                                </td>


                                                {/* Status */}

                                                <td>

                                                    <span
                                                        className={
                                                            item.status ===
                                                            "Present"
                                                                ? "attendance-status present"
                                                                : "attendance-status absent"
                                                        }
                                                    >

                                                        <span className="status-dot"></span>

                                                        {
                                                            item.status
                                                        }

                                                    </span>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default AttendanceManagement;

