
// import { useEffect, useState } from "react";
// import "./ResultManagement.css";

// function ResultManagement() {
//     const [students, setStudents] = useState([]);

//     const [formData, setFormData] = useState({
//         student: "",
//         subject: "",
//         subjectCode: "",
//         semester: "",
//         marks: "",
//         totalMarks: "",
//         grade: "",
//         status: "Pass"
//     });

//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);

//     // Fetch students
//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const token = localStorage.getItem("token");

//                 const response = await fetch(
//                     "https://smart-college-management-backend.onrender.com/api/students",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );

//                 const data = await response.json();

//                 if (response.ok) {
//                     setStudents(data.students);
//                 } else {
//                     setMessage(data.message);
//                 }

//             } catch (error) {
//                 console.log("Students fetch error:", error);
//                 setMessage("Unable to connect to server");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStudents();
//     }, []);

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
//                 "https://smart-college-management-backend.onrender.com/api/results",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         student: formData.student,
//                         subject: formData.subject,
//                         subjectCode: formData.subjectCode,
//                         semester: Number(formData.semester),
//                         marks: Number(formData.marks),
//                         totalMarks: Number(formData.totalMarks),
//                         grade: formData.grade,
//                         status: formData.status
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setMessage(data.message);

//                 setFormData({
//                     student: "",
//                     subject: "",
//                     subjectCode: "",
//                     semester: "",
//                     marks: "",
//                     totalMarks: "",
//                     grade: "",
//                     status: "Pass"
//                 });

//             } else {
//                 setMessage(data.message);
//             }

//         } catch (error) {
//             console.log("Create result error:", error);
//             setMessage("Unable to connect to server");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="result-management-page">
//                 <p>Loading students...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="result-management-page">

//             <div className="result-management-header">
//                 <h1>Result Management</h1>
//                 <p>
//                     Add and manage student examination results
//                 </p>
//             </div>

//             <div className="result-management-card">

//                 <h2>Add Student Result</h2>

//                 <form onSubmit={handleSubmit}>

//                     {/* Student */}
//                     <div className="result-form-group">
//                         <label>Student</label>

//                         <select
//                             name="student"
//                             value={formData.student}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">
//                                 Select Student
//                             </option>

//                             {students.map((student) => (
//                                 <option
//                                     key={student._id}
//                                     value={student._id}
//                                 >
//                                     {student.fullName} - {student.email}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Subject */}
//                     <div className="result-form-group">
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

//                     {/* Subject Code */}
//                     <div className="result-form-group">
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

//                     {/* Semester */}
//                     <div className="result-form-group">
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

//                     {/* Marks */}
//                     <div className="result-form-row">

//                         <div className="result-form-group">
//                             <label>Marks</label>

//                             <input
//                                 type="number"
//                                 name="marks"
//                                 placeholder="Obtained marks"
//                                 min="0"
//                                 value={formData.marks}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="result-form-group">
//                             <label>Total Marks</label>

//                             <input
//                                 type="number"
//                                 name="totalMarks"
//                                 placeholder="Total marks"
//                                 min="1"
//                                 value={formData.totalMarks}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                     </div>

//                     {/* Grade */}
//                     <div className="result-form-group">
//                         <label>Grade</label>

//                         <select
//                             name="grade"
//                             value={formData.grade}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">
//                                 Select Grade
//                             </option>
//                             <option value="A+">A+</option>
//                             <option value="A">A</option>
//                             <option value="B+">B+</option>
//                             <option value="B">B</option>
//                             <option value="C">C</option>
//                             <option value="D">D</option>
//                             <option value="F">F</option>
//                         </select>
//                     </div>

//                     {/* Status */}
//                     <div className="result-form-group">
//                         <label>Status</label>

//                         <select
//                             name="status"
//                             value={formData.status}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="Pass">
//                                 Pass
//                             </option>
//                             <option value="Fail">
//                                 Fail
//                             </option>
//                         </select>
//                     </div>

//                     <button
//                         type="submit"
//                         className="create-result-btn"
//                         disabled={submitting}
//                     >
//                         {submitting
//                             ? "Adding Result..."
//                             : "Add Result"}
//                     </button>

//                 </form>

//                 {message && (
//                     <p className="result-management-message">
//                         {message}
//                     </p>
//                 )}

//             </div>

//         </div>
//     );
// }

// export default ResultManagement;




import { useEffect, useState } from "react";
import "./ResultManagement.css";

function ResultManagement() {
    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState({
        student: "",
        subject: "",
        subjectCode: "",
        semester: "",
        marks: "",
        totalMarks: "",
        grade: "",
        status: "Pass"
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // ==========================================
    // FETCH STUDENTS
    // ==========================================

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "https://smart-college-management-backend.onrender.com/api/students",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setStudents(data.students || []);
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                console.log("Students fetch error:", error);
                setMessage("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

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
    // ADD RESULT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/results",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        student: formData.student,
                        subject: formData.subject,
                        subjectCode: formData.subjectCode,
                        semester: Number(formData.semester),
                        marks: Number(formData.marks),
                        totalMarks: Number(formData.totalMarks),
                        grade: formData.grade,
                        status: formData.status
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);

                setFormData({
                    student: "",
                    subject: "",
                    subjectCode: "",
                    semester: "",
                    marks: "",
                    totalMarks: "",
                    grade: "",
                    status: "Pass"
                });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log("Create result error:", error);
            setMessage("Unable to connect to server");
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="result-management-page">

                <div className="result-loading-card">

                    <div className="result-loader"></div>

                    <h3>
                        Loading Result Management
                    </h3>

                    <p>
                        Fetching student information...
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="result-management-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="result-management-header">

                <div className="result-header-icon">
                    📊
                </div>

                <div>
                    <h1>
                        Result Management
                    </h1>

                    <p>
                        Add and manage student examination results
                    </p>
                </div>

            </div>


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="result-summary-grid">

                <div className="result-summary-card">

                    <div className="result-summary-icon">
                        👨‍🎓
                    </div>

                    <div>
                        <span>
                            Total Students
                        </span>

                        <strong>
                            {students.length}
                        </strong>
                    </div>

                </div>


                <div className="result-summary-card">

                    <div className="result-summary-icon">
                        📝
                    </div>

                    <div>
                        <span>
                            Result Module
                        </span>

                        <strong>
                            Active
                        </strong>
                    </div>

                </div>


                <div className="result-summary-card">

                    <div className="result-summary-icon">
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
                ADD RESULT CARD
            ========================================== */}

            <div className="result-management-card">

                <div className="result-card-header">

                    <div className="result-card-icon">
                        📝
                    </div>

                    <div>
                        <h2>
                            Add Student Result
                        </h2>

                        <p>
                            Enter examination result details
                        </p>
                    </div>

                </div>


                {/* ==========================================
                    FORM
                ========================================== */}

                <form onSubmit={handleSubmit}>

                    {/* STUDENT */}

                    <div className="result-form-group">

                        <label htmlFor="student">
                            Student
                        </label>

                        <select
                            id="student"
                            name="student"
                            value={formData.student}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Student
                            </option>

                            {students.map((student) => (

                                <option
                                    key={student._id}
                                    value={student._id}
                                >
                                    {student.fullName} - {student.email}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* SUBJECT + SUBJECT CODE */}

                    <div className="result-form-row">

                        <div className="result-form-group">

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


                        <div className="result-form-group">

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


                    {/* SEMESTER */}

                    <div className="result-form-group">

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


                    {/* MARKS */}

                    <div className="result-form-row">

                        <div className="result-form-group">

                            <label htmlFor="marks">
                                Marks
                            </label>

                            <input
                                id="marks"
                                type="number"
                                name="marks"
                                placeholder="Obtained marks"
                                min="0"
                                value={formData.marks}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="result-form-group">

                            <label htmlFor="totalMarks">
                                Total Marks
                            </label>

                            <input
                                id="totalMarks"
                                type="number"
                                name="totalMarks"
                                placeholder="Total marks"
                                min="1"
                                value={formData.totalMarks}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* GRADE + STATUS */}

                    <div className="result-form-row">

                        <div className="result-form-group">

                            <label htmlFor="grade">
                                Grade
                            </label>

                            <select
                                id="grade"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Grade
                                </option>

                                <option value="A+">
                                    A+
                                </option>

                                <option value="A">
                                    A
                                </option>

                                <option value="B+">
                                    B+
                                </option>

                                <option value="B">
                                    B
                                </option>

                                <option value="C">
                                    C
                                </option>

                                <option value="D">
                                    D
                                </option>

                                <option value="F">
                                    F
                                </option>

                            </select>

                        </div>


                        <div className="result-form-group">

                            <label htmlFor="status">
                                Status
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >

                                <option value="Pass">
                                    Pass
                                </option>

                                <option value="Fail">
                                    Fail
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* SUBMIT BUTTON */}

                    <button
                        type="submit"
                        className="create-result-btn"
                        disabled={submitting}
                    >

                        {submitting ? (
                            <>
                                <span className="result-button-loader"></span>
                                Adding Result...
                            </>
                        ) : (
                            <>
                                <span className="result-add-icon">
                                    +
                                </span>

                                Add Result
                            </>
                        )}

                    </button>

                </form>


                {/* ==========================================
                    MESSAGE
                ========================================== */}

                {message && (

                    <div className="result-management-message">

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
                FOOTER NOTE
            ========================================== */}

            <div className="result-page-note">

                <span>
                    🔒
                </span>

                <p>
                    Examination results are securely managed
                    through the college administration system.
                </p>

            </div>

        </div>
    );
}

export default ResultManagement;
