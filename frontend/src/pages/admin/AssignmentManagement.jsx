// import React, { useEffect, useState } from "react";
// import "./AssignmentManagement.css";

// const AssignmentManagement = () => {
//     const [assignments, setAssignments] = useState([]);
//     const [subjects, setSubjects] = useState([]);

//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [subject, setSubject] = useState("");
//     const [dueDate, setDueDate] = useState("");

//     const [loading, setLoading] = useState(true);
//     const [creating, setCreating] = useState(false);
//     const [error, setError] = useState("");

//     const token = localStorage.getItem("token");

//     // ==========================================
//     // FETCH SUBJECTS
//     // ==========================================

//     const fetchSubjects = async () => {
//         try {
//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/subjects",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setSubjects(data.subjects || []);
//             }
//         } catch (error) {
//             console.error("Subjects fetch error:", error);
//         }
//     };

//     // ==========================================
//     // FETCH ASSIGNMENTS
//     // ==========================================

//     const fetchAssignments = async () => {
//         try {
//             setLoading(true);

//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/assignments",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(
//                     data.message ||
//                     "Failed to fetch assignments"
//                 );
//             }

//             setAssignments(data.assignments || []);

//         } catch (error) {
//             console.error(
//                 "Assignments fetch error:",
//                 error
//             );

//             setError(error.message);

//         } finally {
//             setLoading(false);
//         }
//     };

//     // ==========================================
//     // INITIAL LOAD
//     // ==========================================

//     useEffect(() => {
//         fetchSubjects();
//         fetchAssignments();
//     }, []);

//     // ==========================================
//     // CREATE ASSIGNMENT
//     // ==========================================

//     const handleCreateAssignment = async (e) => {
//         e.preventDefault();

//         if (
//             !title ||
//             !description ||
//             !subject ||
//             !dueDate
//         ) {
//             alert("Please fill all required fields");
//             return;
//         }

//         try {
//             setCreating(true);

//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/assignments",
//                 {
//                     method: "POST",

//                     headers: {
//                         "Content-Type": "application/json",

//                         Authorization:
//                             `Bearer ${token}`
//                     },

//                     body: JSON.stringify({
//                         title,
//                         description,
//                         subject,
//                         dueDate,
//                         assignmentFile: ""
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(
//                     data.message ||
//                     "Failed to create assignment"
//                 );
//             }

//             alert(
//                 "Assignment created successfully"
//             );

//             // Clear form
//             setTitle("");
//             setDescription("");
//             setSubject("");
//             setDueDate("");

//             // Refresh assignments
//             fetchAssignments();

//         } catch (error) {

//             console.error(
//                 "Create assignment error:",
//                 error
//             );

//             alert(error.message);

//         } finally {
//             setCreating(false);
//         }
//     };

//     // ==========================================
//     // FORMAT DATE
//     // ==========================================

//     const formatDate = (date) => {
//         if (!date) {
//             return "-";
//         }

//         return new Date(date).toLocaleDateString(
//             "en-IN",
//             {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric"
//             }
//         );
//     };

//     // ==========================================
//     // LOADING
//     // ==========================================

//     if (loading) {
//         return (
//             <div className="assignment-management-page">

//                 <div className="assignment-loading">
//                     Loading assignments...
//                 </div>

//             </div>
//         );
//     }

//     // ==========================================
//     // MAIN UI
//     // ==========================================

//     return (
//         <div className="assignment-management-page">

//             {/* ==========================================
//                 PAGE HEADER
//             ========================================== */}

//             <div className="assignment-page-header">

//                 <div>

//                     <h1>
//                         Assignment Management
//                     </h1>

//                     <p>
//                         Create and manage student assignments
//                     </p>

//                 </div>

//                 <div className="assignment-count">

//                     {assignments.length} Assignment
//                     {assignments.length !== 1
//                         ? "s"
//                         : ""}

//                 </div>

//             </div>


//             {/* ==========================================
//                 ERROR
//             ========================================== */}

//             {error && (

//                 <div className="assignment-error">
//                     {error}
//                 </div>

//             )}


//             {/* ==========================================
//                 CREATE ASSIGNMENT
//             ========================================== */}

//             <div className="assignment-form-card">

//                 <div className="assignment-section-title">

//                     <div className="assignment-section-icon">
//                         📝
//                     </div>

//                     <div>

//                         <h2>
//                             Create Assignment
//                         </h2>

//                         <p>
//                             Add a new assignment for students
//                         </p>

//                     </div>

//                 </div>


//                 <form
//                     className="assignment-form"
//                     onSubmit={handleCreateAssignment}
//                 >

//                     {/* TITLE */}

//                     <div className="assignment-form-group">

//                         <label>
//                             Assignment Title
//                         </label>

//                         <input
//                             type="text"
//                             placeholder="Enter assignment title"
//                             value={title}
//                             onChange={(e) =>
//                                 setTitle(
//                                     e.target.value
//                                 )
//                             }
//                         />

//                     </div>


//                     {/* SUBJECT */}

//                     <div className="assignment-form-group">

//                         <label>
//                             Subject
//                         </label>

//                         <select
//                             value={subject}
//                             onChange={(e) =>
//                                 setSubject(
//                                     e.target.value
//                                 )
//                             }
//                         >

//                             <option value="">
//                                 Select Subject
//                             </option>

//                             {subjects.map((item) => (

//                                 <option
//                                     key={item._id}
//                                     value={item._id}
//                                 >
//                                     {item.name} (
//                                     {item.code}
//                                     )
//                                 </option>

//                             ))}

//                         </select>

//                     </div>


//                     {/* DUE DATE */}

//                     <div className="assignment-form-group">

//                         <label>
//                             Due Date
//                         </label>

//                         <input
//                             type="date"
//                             value={dueDate}
//                             onChange={(e) =>
//                                 setDueDate(
//                                     e.target.value
//                                 )
//                             }
//                         />

//                     </div>


//                     {/* DESCRIPTION */}

//                     <div className="assignment-form-group full-width">

//                         <label>
//                             Description
//                         </label>

//                         <textarea
//                             rows="4"
//                             placeholder="Enter assignment description"
//                             value={description}
//                             onChange={(e) =>
//                                 setDescription(
//                                     e.target.value
//                                 )
//                             }
//                         />

//                     </div>


//                     {/* BUTTON */}

//                     <div className="assignment-form-actions">

//                         <button
//                             type="submit"
//                             className="create-assignment-btn"
//                             disabled={creating}
//                         >

//                             {creating
//                                 ? "Creating..."
//                                 : "Create Assignment"}

//                         </button>

//                     </div>

//                 </form>

//             </div>


//             {/* ==========================================
//                 ASSIGNMENT LIST
//             ========================================== */}

//             <div className="assignment-list-card">

//                 <div className="assignment-list-header">

//                     <div>

//                         <h2>
//                             All Assignments
//                         </h2>

//                         <p>
//                             View assignments created for students
//                         </p>

//                     </div>

//                 </div>


//                 {assignments.length === 0 ? (

//                     <div className="assignment-empty">

//                         <div className="assignment-empty-icon">
//                             📝
//                         </div>

//                         <h3>
//                             No Assignments Found
//                         </h3>

//                         <p>
//                             Create your first assignment
//                             using the form above.
//                         </p>

//                     </div>

//                 ) : (

//                     <div className="assignment-table-container">

//                         <table className="assignment-table">

//                             <thead>

//                                 <tr>

//                                     <th>
//                                         Title
//                                     </th>

//                                     <th>
//                                         Subject
//                                     </th>

//                                     <th>
//                                         Due Date
//                                     </th>

//                                     <th>
//                                         Created By
//                                     </th>

//                                     <th>
//                                         Created On
//                                     </th>

//                                 </tr>

//                             </thead>


//                             <tbody>

//                                 {assignments.map(
//                                     (assignment) => (

//                                         <tr
//                                             key={
//                                                 assignment._id
//                                             }
//                                         >

//                                             <td>

//                                                 <strong>
//                                                     {
//                                                         assignment.title
//                                                     }
//                                                 </strong>

//                                                 <small>
//                                                     {
//                                                         assignment.description
//                                                     }
//                                                 </small>

//                                             </td>


//                                             <td>

//                                                 <div className="assignment-subject">

//                                                     <strong>
//                                                         {
//                                                             assignment
//                                                                 .subject
//                                                                 ?.name ||
//                                                             "-"
//                                                         }
//                                                     </strong>

//                                                     <span>
//                                                         {
//                                                             assignment
//                                                                 .subject
//                                                                 ?.code ||
//                                                             "-"
//                                                         }
//                                                     </span>

//                                                 </div>

//                                             </td>


//                                             <td>

//                                                 <span className="due-date-badge">

//                                                     {formatDate(
//                                                         assignment.dueDate
//                                                     )}

//                                                 </span>

//                                             </td>


//                                             <td>

//                                                 {
//                                                     assignment
//                                                         .createdBy
//                                                         ?.fullName ||
//                                                     "-"
//                                                 }

//                                             </td>


//                                             <td>

//                                                 {formatDate(
//                                                     assignment.createdAt
//                                                 )}

//                                             </td>

//                                         </tr>

//                                     )
//                                 )}

//                             </tbody>

//                         </table>

//                     </div>

//                 )}

//             </div>

//         </div>
//     );
// };

// export default AssignmentManagement;


import React, { useEffect, useState } from "react";
import "./AssignmentManagement.css";

const AssignmentManagement = () => {
    const [assignments, setAssignments] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    // ==========================================
    // FETCH SUBJECTS
    // ==========================================

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
            }
        } catch (error) {
            console.error("Subjects fetch error:", error);
        }
    };

    // ==========================================
    // FETCH ASSIGNMENTS
    // ==========================================

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/assignments",
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
                    "Failed to fetch assignments"
                );
            }

            setAssignments(data.assignments || []);
        } catch (error) {
            console.error(
                "Assignments fetch error:",
                error
            );

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {
        fetchSubjects();
        fetchAssignments();
    }, []);

    // ==========================================
    // CREATE ASSIGNMENT
    // ==========================================

    const handleCreateAssignment = async (e) => {
        e.preventDefault();

        if (
            !title.trim() ||
            !description.trim() ||
            !subject ||
            !dueDate
        ) {
            alert("Please fill all required fields");
            return;
        }

        try {
            setCreating(true);

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/assignments",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        title: title.trim(),
                        description: description.trim(),
                        subject,
                        dueDate,
                        assignmentFile: "",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to create assignment"
                );
            }

            alert("Assignment created successfully");

            // Clear form
            setTitle("");
            setDescription("");
            setSubject("");
            setDueDate("");

            // Refresh assignments
            await fetchAssignments();
        } catch (error) {
            console.error(
                "Create assignment error:",
                error
            );

            alert(error.message);
        } finally {
            setCreating(false);
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
                year: "numeric",
            }
        );
    };

    // ==========================================
    // GET DUE DATE STATUS
    // ==========================================

    const getDueDateStatus = (date) => {
        if (!date) {
            return "No Date";
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const due = new Date(date);
        due.setHours(0, 0, 0, 0);

        if (due < today) {
            return "Overdue";
        }

        if (due.getTime() === today.getTime()) {
            return "Due Today";
        }

        return "Upcoming";
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="assignment-management-page">
                <div className="assignment-loading">
                    <div className="assignment-loading-spinner"></div>

                    <h3>
                        Loading assignments...
                    </h3>

                    <p>
                        Please wait while we fetch the data.
                    </p>
                </div>
            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="assignment-management-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="assignment-page-header">

                <div className="assignment-header-left">

                    <div className="assignment-header-icon">
                        📝
                    </div>

                    <div>
                        <h1>
                            Assignment Management
                        </h1>

                        <p>
                            Create and manage student assignments
                        </p>
                    </div>

                </div>

                <div className="assignment-count">
                    <span>
                        Total Assignments
                    </span>

                    <strong>
                        {assignments.length}
                    </strong>
                </div>

            </div>


            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (
                <div className="assignment-error">
                    <span>!</span>
                    {error}
                </div>
            )}


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="assignment-summary-grid">

                <div className="assignment-summary-card">

                    <div className="assignment-summary-icon">
                        📝
                    </div>

                    <div>
                        <span>
                            Total Assignments
                        </span>

                        <strong>
                            {assignments.length}
                        </strong>
                    </div>

                </div>


                <div className="assignment-summary-card">

                    <div className="assignment-summary-icon">
                        📚
                    </div>

                    <div>
                        <span>
                            Total Subjects
                        </span>

                        <strong>
                            {subjects.length}
                        </strong>
                    </div>

                </div>


                <div className="assignment-summary-card">

                    <div className="assignment-summary-icon">
                        ⏰
                    </div>

                    <div>
                        <span>
                            Upcoming
                        </span>

                        <strong>
                            {
                                assignments.filter(
                                    (item) =>
                                        getDueDateStatus(
                                            item.dueDate
                                        ) === "Upcoming"
                                ).length
                            }
                        </strong>
                    </div>

                </div>


                <div className="assignment-summary-card">

                    <div className="assignment-summary-icon">
                        ✓
                    </div>

                    <div>
                        <span>
                            Created
                        </span>

                        <strong>
                            {assignments.length}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==========================================
                CREATE ASSIGNMENT
            ========================================== */}

            <div className="assignment-form-card">

                <div className="assignment-section-title">

                    <div className="assignment-section-icon">
                        📝
                    </div>

                    <div>
                        <h2>
                            Create Assignment
                        </h2>

                        <p>
                            Add a new assignment for students
                        </p>
                    </div>

                </div>


                <form
                    className="assignment-form"
                    onSubmit={handleCreateAssignment}
                >

                    {/* TITLE */}

                    <div className="assignment-form-group">

                        <label>
                            Assignment Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter assignment title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* SUBJECT */}

                    <div className="assignment-form-group">

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
                                    {item.name} ({item.code})
                                </option>
                            ))}

                        </select>

                    </div>


                    {/* DUE DATE */}

                    <div className="assignment-form-group">

                        <label>
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="assignment-form-group full-width">

                        <label>
                            Description
                        </label>

                        <textarea
                            rows="4"
                            placeholder="Enter assignment description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* BUTTON */}

                    <div className="assignment-form-actions">

                        <button
                            type="submit"
                            className="create-assignment-btn"
                            disabled={creating}
                        >

                            {creating ? (
                                <>
                                    <span className="assignment-spinner"></span>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <span>+</span>
                                    Create Assignment
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>


            {/* ==========================================
                ASSIGNMENT LIST
            ========================================== */}

            <div className="assignment-list-card">

                <div className="assignment-list-header">

                    <div>

                        <h2>
                            All Assignments
                        </h2>

                        <p>
                            View assignments created for students
                        </p>

                    </div>

                    <div className="assignment-list-count">
                        {assignments.length} Records
                    </div>

                </div>


                {assignments.length === 0 ? (

                    <div className="assignment-empty">

                        <div className="assignment-empty-icon">
                            📝
                        </div>

                        <h3>
                            No Assignments Found
                        </h3>

                        <p>
                            Create your first assignment
                            using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="assignment-table-container">

                        <table className="assignment-table">

                            <thead>

                                <tr>

                                    <th>
                                        Assignment
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Due Date
                                    </th>

                                    <th>
                                        Created By
                                    </th>

                                    <th>
                                        Created On
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {assignments.map(
                                    (assignment) => {

                                        const dueStatus =
                                            getDueDateStatus(
                                                assignment.dueDate
                                            );

                                        return (
                                            <tr
                                                key={
                                                    assignment._id
                                                }
                                            >

                                                {/* ASSIGNMENT */}

                                                <td>

                                                    <div className="assignment-title-cell">

                                                        <div className="assignment-row-icon">
                                                            📝
                                                        </div>

                                                        <div>

                                                            <strong>
                                                                {
                                                                    assignment.title
                                                                }
                                                            </strong>

                                                            <small>
                                                                {
                                                                    assignment.description
                                                                }
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* SUBJECT */}

                                                <td>

                                                    <div className="assignment-subject">

                                                        <strong>
                                                            {
                                                                assignment
                                                                    .subject
                                                                    ?.name ||
                                                                "-"
                                                            }
                                                        </strong>

                                                        <span>
                                                            {
                                                                assignment
                                                                    .subject
                                                                    ?.code ||
                                                                "-"
                                                            }
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* DUE DATE */}

                                                <td>

                                                    <div className="assignment-due-cell">

                                                        <span
                                                            className={`due-date-badge ${dueStatus
                                                                .toLowerCase()
                                                                .replace(
                                                                    " ",
                                                                    "-"
                                                                )}`}
                                                        >
                                                            {formatDate(
                                                                assignment.dueDate
                                                            )}
                                                        </span>

                                                        <small>
                                                            {dueStatus}
                                                        </small>

                                                    </div>

                                                </td>


                                                {/* CREATED BY */}

                                                <td>

                                                    <div className="assignment-created-by">

                                                        <div className="assignment-user-avatar">

                                                            {
                                                                assignment
                                                                    .createdBy
                                                                    ?.fullName
                                                                    ?.charAt(
                                                                        0
                                                                    )
                                                                    ?.toUpperCase() ||
                                                                "A"
                                                            }

                                                        </div>

                                                        <span>
                                                            {
                                                                assignment
                                                                    .createdBy
                                                                    ?.fullName ||
                                                                "-"
                                                            }
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* CREATED ON */}

                                                <td>

                                                    <span className="assignment-created-date">
                                                        {
                                                            formatDate(
                                                                assignment.createdAt
                                                            )
                                                        }
                                                    </span>

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

        </div>
    );
};

export default AssignmentManagement;
