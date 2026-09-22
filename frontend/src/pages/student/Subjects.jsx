
// import { useEffect, useState } from "react";
// import "./Subjects.css";

// function Subjects() {
//     const [subjects, setSubjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         const fetchSubjects = async () => {
//             try {
//                 const token = localStorage.getItem("token");

//                 const response = await fetch(
//                     "https://smart-college-management-backend.onrender.com/api/subjects",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );

//                 const data = await response.json();

//                 if (response.ok) {
//                     setSubjects(data.subjects);
//                 } else {
//                     setMessage(data.message);
//                 }

//             } catch (error) {
//                 console.log(
//                     "Subjects fetch error:",
//                     error
//                 );

//                 setMessage(
//                     "Unable to connect to server"
//                 );

//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSubjects();
//     }, []);

//     if (loading) {
//         return (
//             <div className="subjects-page">
//                 <p>Loading subjects...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="subjects-page">

//             <div className="subjects-header">
//                 <h1>My Subjects</h1>
//                 <p>View your current semester subjects</p>
//             </div>

//             <div className="subjects-card">

//                 <div className="subjects-card-header">
//                     <h2>Semester Subjects</h2>

//                     <span>
//                         {subjects.length} Subjects
//                     </span>
//                 </div>

//                 {message && (
//                     <p>{message}</p>
//                 )}

//                 <div className="subjects-table">

//                     <div className="table-row table-heading">
//                         <span>Code</span>
//                         <span>Subject Name</span>
//                         <span>Semester</span>
//                         <span>Credits</span>
//                     </div>

//                     {subjects.length === 0 ? (

//                         <div className="table-row">
//                             <span>
//                                 No subjects found
//                             </span>
//                         </div>

//                     ) : (

//                         subjects.map((subject) => (

//                             <div
//                                 className="table-row"
//                                 key={subject._id}
//                             >
//                                 <span>
//                                     {subject.code}
//                                 </span>

//                                 <strong>
//                                     {subject.name}
//                                 </strong>

//                                 <span>
//                                     {subject.semester}
//                                 </span>

//                                 <span>
//                                     {subject.credits}
//                                 </span>
//                             </div>

//                         ))

//                     )}

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default Subjects;





import { useEffect, useState } from "react";
import "./Subjects.css";

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "https://smart-college-management-backend.onrender.com/api/subjects",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setSubjects(data.subjects || []);
                } else {
                    setMessage(
                        data.message || "Unable to load subjects"
                    );
                }
            } catch (error) {
                console.log("Subjects fetch error:", error);

                setMessage(
                    "Unable to connect to server"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="subjects-page">
                <div className="subjects-loading">
                    <div className="subjects-loader"></div>
                    <p>Loading your subjects...</p>
                </div>
            </div>
        );
    }

    // ==========================================
    // CALCULATIONS
    // ==========================================

    const totalCredits = subjects.reduce(
        (total, subject) =>
            total + Number(subject.credits || 0),
        0
    );

    const semesters = [
        ...new Set(
            subjects
                .map((subject) => subject.semester)
                .filter(Boolean)
        )
    ];

    const currentSemester =
        semesters.length > 0
            ? Math.min(...semesters)
            : "-";

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="subjects-page">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="subjects-header">

                <div className="subjects-title-section">

                    <div className="subjects-title-icon">
                        📚
                    </div>

                    <div>
                        <h1>My Subjects</h1>

                        <p>
                            View your current semester academic subjects
                        </p>
                    </div>

                </div>

            </div>


            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {message && (
                <div className="subjects-message">
                    <span>⚠️</span>
                    <p>{message}</p>
                </div>
            )}


            {/* ==========================================
                SUMMARY CARDS
            ========================================== */}

            <div className="subjects-summary">

                <div className="summary-card">

                    <div className="summary-icon">
                        📚
                    </div>

                    <div className="summary-content">

                        <span>
                            Total Subjects
                        </span>

                        <strong>
                            {subjects.length}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        🎓
                    </div>

                    <div className="summary-content">

                        <span>
                            Current Semester
                        </span>

                        <strong>
                            {currentSemester}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        ⭐
                    </div>

                    <div className="summary-content">

                        <span>
                            Total Credits
                        </span>

                        <strong>
                            {totalCredits}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==========================================
                SUBJECTS CARD
            ========================================== */}

            <div className="subjects-card">

                <div className="subjects-card-header">

                    <div>

                        <h2>
                            Semester Subjects
                        </h2>

                        <p>
                            Your currently assigned academic subjects
                        </p>

                    </div>

                    <span className="subject-count">
                        {subjects.length}{" "}
                        {subjects.length === 1
                            ? "Subject"
                            : "Subjects"}
                    </span>

                </div>


                {/* ==========================================
                    EMPTY STATE
                ========================================== */}

                {subjects.length === 0 ? (

                    <div className="subjects-empty">

                        <div className="empty-subject-icon">
                            📚
                        </div>

                        <h3>
                            No Subjects Found
                        </h3>

                        <p>
                            No subjects have been assigned
                            to your profile yet.
                        </p>

                    </div>

                ) : (

                    /* ==========================================
                       SUBJECT GRID
                    ========================================== */

                    <div className="subjects-grid">

                        {subjects.map((subject) => (

                            <div
                                className="subject-item"
                                key={subject._id}
                            >

                                {/* SUBJECT TOP */}

                                <div className="subject-item-top">

                                    <div className="subject-code">
                                        {subject.code}
                                    </div>

                                    <div className="subject-book">
                                        📖
                                    </div>

                                </div>


                                {/* SUBJECT NAME */}

                                <div className="subject-name">

                                    <h3>
                                        {subject.name}
                                    </h3>

                                    <p>
                                        Academic Subject
                                    </p>

                                </div>


                                {/* SUBJECT INFORMATION */}

                                <div className="subject-info">

                                    <div className="subject-info-item">

                                        <span>
                                            Semester
                                        </span>

                                        <strong>
                                            {subject.semester}
                                        </strong>

                                    </div>


                                    <div className="subject-info-divider"></div>


                                    <div className="subject-info-item">

                                        <span>
                                            Credits
                                        </span>

                                        <strong>
                                            {subject.credits}
                                        </strong>

                                    </div>

                                </div>


                                {/* FOOTER */}

                                <div className="subject-item-footer">

                                    <span>
                                        Subject Code
                                    </span>

                                    <strong>
                                        {subject.code}
                                    </strong>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* ==========================================
                FOOTER NOTE
            ========================================== */}

            {subjects.length > 0 && (
                <div className="subjects-footer-note">

                    <span>ℹ️</span>

                    <p>
                        These subjects are assigned to your
                        current academic semester.
                    </p>

                </div>
            )}

        </div>
    );
}

export default Subjects;
