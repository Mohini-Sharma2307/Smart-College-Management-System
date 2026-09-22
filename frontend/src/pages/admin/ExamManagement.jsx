// import { useEffect, useState } from "react";
// import "./ExamManagement.css";

// function ExamManagement() {
//     const [exams, setExams] = useState([]);

//     const [formData, setFormData] = useState({
//         subject: "",
//         subjectCode: "",
//         semester: "",
//         examDate: "",
//         examTime: "",
//         room: ""
//     });

//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);

//     useEffect(() => {
//         fetchExams();
//     }, []);

//     const fetchExams = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const response = await fetch(
//                 "http://localhost:5000/api/exams",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setExams(data.exams);
//             } else {
//                 setMessage(data.message);
//             }

//         } catch (error) {
//             console.log("Fetch exams error:", error);
//             setMessage("Unable to connect to server");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setSubmitting(true);
//         setMessage("");

//         try {
//             const token = localStorage.getItem("token");

//             const response = await fetch(
//                 "http://localhost:5000/api/exams",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         subject: formData.subject,
//                         subjectCode: formData.subjectCode,
//                         semester: Number(formData.semester),
//                         examDate: formData.examDate,
//                         examTime: formData.examTime,
//                         room: formData.room
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setMessage(data.message);

//                 setFormData({
//                     subject: "",
//                     subjectCode: "",
//                     semester: "",
//                     examDate: "",
//                     examTime: "",
//                     room: ""
//                 });

//                 fetchExams();

//             } else {
//                 setMessage(data.message);
//             }

//         } catch (error) {
//             console.log("Create exam error:", error);
//             setMessage("Unable to connect to server");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="exam-management-page">
//                 <p>Loading exams...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="exam-management-page">

//             <div className="exam-management-header">
//                 <h1>Exam Timetable Management</h1>
//                 <p>
//                     Add and manage student examination schedules
//                 </p>
//             </div>

//             <div className="exam-management-card">

//                 <h2>Add Exam Schedule</h2>

//                 <form onSubmit={handleSubmit}>

//                     <div className="exam-form-group">
//                         <label>Subject</label>

//                         <input
//                             type="text"
//                             name="subject"
//                             placeholder="Enter subject name"
//                             value={formData.subject}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="exam-form-group">
//                         <label>Subject Code</label>

//                         <input
//                             type="text"
//                             name="subjectCode"
//                             placeholder="Example: CS201"
//                             value={formData.subjectCode}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="exam-form-group">
//                         <label>Semester</label>

//                         <input
//                             type="number"
//                             name="semester"
//                             placeholder="Enter semester"
//                             min="1"
//                             max="8"
//                             value={formData.semester}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="exam-form-group">
//                         <label>Exam Date</label>

//                         <input
//                             type="date"
//                             name="examDate"
//                             value={formData.examDate}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="exam-form-group">
//                         <label>Exam Time</label>

//                         <input
//                             type="text"
//                             name="examTime"
//                             placeholder="Example: 10:00 AM - 1:00 PM"
//                             value={formData.examTime}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="exam-form-group">
//                         <label>Room</label>

//                         <input
//                             type="text"
//                             name="room"
//                             placeholder="Example: Room 101"
//                             value={formData.room}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="create-exam-btn"
//                         disabled={submitting}
//                     >
//                         {submitting
//                             ? "Adding Exam..."
//                             : "Add Exam"}
//                     </button>

//                 </form>

//                 {message && (
//                     <p className="exam-management-message">
//                         {message}
//                     </p>
//                 )}

//             </div>

//             <div className="exam-list-card">

//                 <h2>Existing Exam Schedules</h2>

//                 {exams.length === 0 ? (
//                     <p>No exam schedules found.</p>
//                 ) : (
//                     <div className="exam-list">

//                         {exams.map((exam) => (
//                             <div
//                                 className="exam-list-item"
//                                 key={exam._id}
//                             >
//                                 <div>
//                                     <strong>
//                                         {exam.subject}
//                                     </strong>

//                                     <span>
//                                         {exam.subjectCode}
//                                     </span>
//                                 </div>

//                                 <div>
//                                     <span>
//                                         Semester {exam.semester}
//                                     </span>

//                                     <span>
//                                         {new Date(
//                                             exam.examDate
//                                         ).toLocaleDateString("en-IN")}
//                                     </span>

//                                     <span>
//                                         {exam.examTime}
//                                     </span>

//                                     <span>
//                                         {exam.room}
//                                     </span>
//                                 </div>
//                             </div>
//                         ))}

//                     </div>
//                 )}

//             </div>

//         </div>
//     );
// }

// export default ExamManagement;


import { useEffect, useState } from "react";
import "./ExamManagement.css";

function ExamManagement() {
    const [exams, setExams] = useState([]);

    const [formData, setFormData] = useState({
        subject: "",
        subjectCode: "",
        semester: "",
        examDate: "",
        examTime: "",
        room: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // ==========================================
    // FETCH EXAMS
    // ==========================================

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/exams",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setExams(data.exams || []);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log("Fetch exams error:", error);
            setMessage("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setMessage("");
    };

    // ==========================================
    // ADD EXAM
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/exams",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        subject: formData.subject,
                        subjectCode: formData.subjectCode,
                        semester: Number(formData.semester),
                        examDate: formData.examDate,
                        examTime: formData.examTime,
                        room: formData.room
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);

                setFormData({
                    subject: "",
                    subjectCode: "",
                    semester: "",
                    examDate: "",
                    examTime: "",
                    room: ""
                });

                fetchExams();
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log("Create exam error:", error);
            setMessage("Unable to connect to server");
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    const getDay = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                weekday: "long"
            }
        );
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="exam-management-page">

                <div className="exam-loading-card">

                    <div className="exam-loader"></div>

                    <h3>
                        Loading Exam Timetable
                    </h3>

                    <p>
                        Fetching examination schedules...
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="exam-management-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="exam-management-header">

                <div className="exam-header-icon">
                    📅
                </div>

                <div>
                    <h1>
                        Exam Timetable Management
                    </h1>

                    <p>
                        Add and manage student examination schedules
                    </p>
                </div>

            </div>


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="exam-summary-grid">

                <div className="exam-summary-card">

                    <div className="exam-summary-icon">
                        📚
                    </div>

                    <div>
                        <span>
                            Total Exams
                        </span>

                        <strong>
                            {exams.length}
                        </strong>
                    </div>

                </div>


                <div className="exam-summary-card">

                    <div className="exam-summary-icon">
                        🗓️
                    </div>

                    <div>
                        <span>
                            Timetable
                        </span>

                        <strong>
                            Active
                        </strong>
                    </div>

                </div>


                <div className="exam-summary-card">

                    <div className="exam-summary-icon">
                        🔒
                    </div>

                    <div>
                        <span>
                            Access
                        </span>

                        <strong>
                            Admin
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==========================================
                ADD EXAM CARD
            ========================================== */}

            <div className="exam-management-card">

                <div className="exam-card-header">

                    <div className="exam-card-icon">
                        📝
                    </div>

                    <div>
                        <h2>
                            Add Exam Schedule
                        </h2>

                        <p>
                            Enter examination schedule details
                        </p>
                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* SUBJECT + CODE */}

                    <div className="exam-form-row">

                        <div className="exam-form-group">

                            <label htmlFor="subject">
                                Subject
                            </label>

                            <input
                                id="subject"
                                type="text"
                                name="subject"
                                placeholder="Enter subject name"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="exam-form-group">

                            <label htmlFor="subjectCode">
                                Subject Code
                            </label>

                            <input
                                id="subjectCode"
                                type="text"
                                name="subjectCode"
                                placeholder="Example: CS201"
                                value={formData.subjectCode}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* SEMESTER + DATE */}

                    <div className="exam-form-row">

                        <div className="exam-form-group">

                            <label htmlFor="semester">
                                Semester
                            </label>

                            <input
                                id="semester"
                                type="number"
                                name="semester"
                                placeholder="Enter semester"
                                min="1"
                                max="8"
                                value={formData.semester}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="exam-form-group">

                            <label htmlFor="examDate">
                                Exam Date
                            </label>

                            <input
                                id="examDate"
                                type="date"
                                name="examDate"
                                value={formData.examDate}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* TIME + ROOM */}

                    <div className="exam-form-row">

                        <div className="exam-form-group">

                            <label htmlFor="examTime">
                                Exam Time
                            </label>

                            <input
                                id="examTime"
                                type="text"
                                name="examTime"
                                placeholder="Example: 10:00 AM - 1:00 PM"
                                value={formData.examTime}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="exam-form-group">

                            <label htmlFor="room">
                                Room
                            </label>

                            <input
                                id="room"
                                type="text"
                                name="room"
                                placeholder="Example: Room 101"
                                value={formData.room}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* ADD BUTTON */}

                    <button
                        type="submit"
                        className="create-exam-btn"
                        disabled={submitting}
                    >

                        {submitting ? (
                            <>
                                <span className="exam-button-loader"></span>
                                Adding Exam...
                            </>
                        ) : (
                            <>
                                <span className="exam-add-icon">
                                    +
                                </span>

                                Add Exam
                            </>
                        )}

                    </button>

                </form>


                {/* MESSAGE */}

                {message && (

                    <div className="exam-management-message">

                        <span>
                            ✓
                        </span>

                        <p>
                            {message}
                        </p>

                    </div>

                )}

            </div>


            {/* ==========================================
                EXISTING EXAMS
            ========================================== */}

            <div className="exam-list-card">

                <div className="exam-list-header">

                    <div>

                        <h2>
                            Existing Exam Schedules
                        </h2>

                        <p>
                            All scheduled examinations
                        </p>

                    </div>

                    <div className="exam-count">
                        {exams.length} Exams
                    </div>

                </div>


                {exams.length === 0 ? (

                    <div className="exam-empty-state">

                        <div className="exam-empty-icon">
                            📅
                        </div>

                        <h3>
                            No Exam Schedules Found
                        </h3>

                        <p>
                            Add an examination schedule to see it here.
                        </p>

                    </div>

                ) : (

                    <div className="exam-list">

                        {exams.map((exam) => (

                            <div
                                className="exam-list-item"
                                key={exam._id}
                            >

                                {/* DATE */}

                                <div className="exam-date-box">

                                    <span>
                                        {new Date(
                                            exam.examDate
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit"
                                            }
                                        )}
                                    </span>

                                    <small>
                                        {new Date(
                                            exam.examDate
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                month: "short"
                                            }
                                        )}
                                    </small>

                                </div>


                                {/* SUBJECT */}

                                <div className="exam-subject-info">

                                    <div className="exam-subject-top">

                                        <h3>
                                            {exam.subject}
                                        </h3>

                                        <span className="exam-code">
                                            {exam.subjectCode}
                                        </span>

                                    </div>

                                    <p>
                                        {getDay(exam.examDate)}
                                    </p>

                                </div>


                                {/* DETAILS */}

                                <div className="exam-details-grid">

                                    <div className="exam-detail">

                                        <span>
                                            Semester
                                        </span>

                                        <strong>
                                            {exam.semester}
                                        </strong>

                                    </div>


                                    <div className="exam-detail">

                                        <span>
                                            Exam Date
                                        </span>

                                        <strong>
                                            {formatDate(exam.examDate)}
                                        </strong>

                                    </div>


                                    <div className="exam-detail">

                                        <span>
                                            Exam Time
                                        </span>

                                        <strong>
                                            {exam.examTime}
                                        </strong>

                                    </div>


                                    <div className="exam-detail">

                                        <span>
                                            Room
                                        </span>

                                        <strong>
                                            {exam.room || "-"}
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* ==========================================
                FOOTER NOTE
            ========================================== */}

            <div className="exam-page-note">

                <span>
                    🔒
                </span>

                <p>
                    Examination schedules are securely managed
                    through the college administration system.
                </p>

            </div>

        </div>
    );
}

export default ExamManagement;