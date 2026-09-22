// import { useEffect, useState } from "react";
// import "./AdmitCardManagement.css";

// const AdmitCardManagement = () => {
//     const [students, setStudents] = useState([]);
//     const [exams, setExams] = useState([]);
//     const [admitCards, setAdmitCards] = useState([]);

//     const [loadingCards, setLoadingCards] = useState(true);
//     const [error, setError] = useState("");

//     const [selectedCard, setSelectedCard] = useState(null);

//     // PDF download loading
//     const [downloadingId, setDownloadingId] = useState(null);

//     const [formData, setFormData] = useState({
//         student: "",
//         exam: "",
//         rollNumber: "",
//         course: "",
//         branch: "",
//         semester: ""
//     });

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         fetchStudents();
//         fetchExams();
//         fetchAdmitCards();
//     }, []);

//     // ======================================================
//     // FETCH STUDENTS
//     // ======================================================

//     const fetchStudents = async () => {
//         try {
//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/students",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             setStudents(data.students || data);

//         } catch (error) {
//             console.log(
//                 "Students fetch error:",
//                 error
//             );
//         }
//     };


//     // ======================================================
//     // FETCH EXAMS
//     // ======================================================

//     const fetchExams = async () => {
//         try {
//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/exams",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             setExams(data.exams || data);

//         } catch (error) {
//             console.log(
//                 "Exams fetch error:",
//                 error
//             );
//         }
//     };


//     // ======================================================
//     // FETCH ADMIT CARDS
//     // ======================================================

//     const fetchAdmitCards = async () => {
//         try {
//             setLoadingCards(true);
//             setError("");

//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/admit-cards/",
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
//                     "Failed to fetch admit cards"
//                 );
//             }

//             setAdmitCards(
//                 data.admitCards || []
//             );

//         } catch (error) {
//             console.log(
//                 "Admit cards fetch error:",
//                 error
//             );

//             setError(error.message);

//         } finally {
//             setLoadingCards(false);
//         }
//     };


//     // ======================================================
//     // HANDLE FORM CHANGE
//     // ======================================================

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };


//     // ======================================================
//     // GENERATE ADMIT CARD
//     // ======================================================

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/admit-cards",
//                 {
//                     method: "POST",

//                     headers: {
//                         "Content-Type":
//                             "application/json",

//                         Authorization:
//                             `Bearer ${token}`
//                     },

//                     body: JSON.stringify({
//                         ...formData,

//                         semester:
//                             Number(
//                                 formData.semester
//                             )
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 alert(data.message);
//                 return;
//             }

//             alert(
//                 "Admit card generated successfully!"
//             );

//             setFormData({
//                 student: "",
//                 exam: "",
//                 rollNumber: "",
//                 course: "",
//                 branch: "",
//                 semester: ""
//             });

//             fetchAdmitCards();

//         } catch (error) {
//             console.log(
//                 "Admit card error:",
//                 error
//             );

//             alert("Server error");
//         }
//     };


//     // ======================================================
//     // VIEW ADMIT CARD
//     // ======================================================

//     const handleView = (card) => {
//         setSelectedCard(card);
//     };


//     const closeView = () => {
//         setSelectedCard(null);
//     };


//     // ======================================================
//     // DOWNLOAD ADMIT CARD PDF
//     // ======================================================

//     const handleDownloadPDF = async (card) => {
//         try {
//             setDownloadingId(card._id);

//             const response = await fetch(
//                 `https://smart-college-management-backend.onrender.com/api/admit-cards/${card._id}/pdf`,
//                 {
//                     method: "GET",

//                     headers: {
//                         Authorization:
//                             `Bearer ${token}`
//                     }
//                 }
//             );

//             // If backend returns JSON error
//             if (!response.ok) {
//                 let errorMessage =
//                     "Unable to download admit card";

//                 try {
//                     const data =
//                         await response.json();

//                     errorMessage =
//                         data.message ||
//                         errorMessage;

//                 } catch (error) {
//                     console.log(
//                         "Error response parsing failed:",
//                         error
//                     );
//                 }

//                 alert(errorMessage);
//                 return;
//             }

//             // Convert response to PDF blob
//             const blob =
//                 await response.blob();

//             // Create temporary URL
//             const url =
//                 window.URL.createObjectURL(
//                     blob
//                 );

//             // Create download link
//             const link =
//                 document.createElement("a");

//             link.href = url;

//             link.download =
//                 `admit-card-${card.rollNumber}.pdf`;

//             document.body.appendChild(link);

//             link.click();

//             // Cleanup
//             link.remove();

//             window.URL.revokeObjectURL(url);

//         } catch (error) {
//             console.log(
//                 "Download admit card error:",
//                 error
//             );

//             alert(
//                 "Unable to download admit card"
//             );

//         } finally {
//             setDownloadingId(null);
//         }
//     };


//     return (
//         <div className="admit-card-management">

//             {/* ======================================================
//                 HEADER
//             ====================================================== */}

//             <div className="admit-card-header">

//                 <div>
//                     <h1>
//                         Admit Card Management
//                     </h1>

//                     <p>
//                         Generate and manage student admit cards
//                     </p>
//                 </div>

//                 <div className="admit-card-count">
//                     Total: {admitCards.length}
//                 </div>

//             </div>


//             {/* ======================================================
//                 GENERATE FORM
//             ====================================================== */}

//             <div className="admit-card-form-card">

//                 <h2>
//                     Generate Admit Card
//                 </h2>

//                 <form
//                     className="admit-card-form"
//                     onSubmit={handleSubmit}
//                 >

//                     <div className="admit-form-group">

//                         <label>
//                             Student
//                         </label>

//                         <select
//                             name="student"
//                             value={formData.student}
//                             onChange={handleChange}
//                             required
//                         >

//                             <option value="">
//                                 Select Student
//                             </option>

//                             {students.map(
//                                 (student) => (

//                                     <option
//                                         key={
//                                             student._id
//                                         }
//                                         value={
//                                             student._id
//                                         }
//                                     >
//                                         {
//                                             student.fullName
//                                         }
//                                         {" - "}
//                                         {
//                                             student.email
//                                         }
//                                     </option>

//                                 )
//                             )}

//                         </select>

//                     </div>


//                     <div className="admit-form-group">

//                         <label>
//                             Exam
//                         </label>

//                         <select
//                             name="exam"
//                             value={formData.exam}
//                             onChange={handleChange}
//                             required
//                         >

//                             <option value="">
//                                 Select Exam
//                             </option>

//                             {exams.map(
//                                 (exam) => (

//                                     <option
//                                         key={
//                                             exam._id
//                                         }
//                                         value={
//                                             exam._id
//                                         }
//                                     >
//                                         {
//                                             exam.subject
//                                         }
//                                         {" - "}
//                                         {
//                                             exam.subjectCode
//                                         }
//                                     </option>

//                                 )
//                             )}

//                         </select>

//                     </div>


//                     <div className="admit-form-group">

//                         <label>
//                             Roll Number
//                         </label>

//                         <input
//                             type="text"
//                             name="rollNumber"
//                             placeholder="Enter roll number"
//                             value={
//                                 formData.rollNumber
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             required
//                         />

//                     </div>


//                     <div className="admit-form-group">

//                         <label>
//                             Course
//                         </label>

//                         <input
//                             type="text"
//                             name="course"
//                             placeholder="Example: B.E."
//                             value={
//                                 formData.course
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             required
//                         />

//                     </div>


//                     <div className="admit-form-group">

//                         <label>
//                             Branch
//                         </label>

//                         <input
//                             type="text"
//                             name="branch"
//                             placeholder="Example: Computer Science"
//                             value={
//                                 formData.branch
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             required
//                         />

//                     </div>


//                     <div className="admit-form-group">

//                         <label>
//                             Semester
//                         </label>

//                         <input
//                             type="number"
//                             name="semester"
//                             placeholder="Enter semester"
//                             min="1"
//                             max="8"
//                             value={
//                                 formData.semester
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             required
//                         />

//                     </div>


//                     <button
//                         type="submit"
//                         className="generate-admit-btn"
//                     >
//                         Generate Admit Card
//                     </button>

//                 </form>

//             </div>


//             {/* ======================================================
//                 GENERATED ADMIT CARDS
//             ====================================================== */}

//             <div className="generated-admit-section">

//                 <div className="generated-admit-header">

//                     <div>

//                         <h2>
//                             Generated Admit Cards
//                         </h2>

//                         <p>
//                             View all generated student admit cards
//                         </p>

//                     </div>

//                 </div>


//                 {loadingCards ? (

//                     <div className="admit-card-message">
//                         Loading admit cards...
//                     </div>

//                 ) : error ? (

//                     <div className="admit-card-error">
//                         {error}
//                     </div>

//                 ) : admitCards.length === 0 ? (

//                     <div className="admit-card-message">
//                         No admit cards found.
//                     </div>

//                 ) : (

//                     <div className="admit-card-table-container">

//                         <table className="admit-card-table">

//                             <thead>

//                                 <tr>

//                                     <th>
//                                         Student
//                                     </th>

//                                     <th>
//                                         Roll Number
//                                     </th>

//                                     <th>
//                                         Exam
//                                     </th>

//                                     <th>
//                                         Date
//                                     </th>

//                                     <th>
//                                         Time
//                                     </th>

//                                     <th>
//                                         Room
//                                     </th>

//                                     <th>
//                                         Status
//                                     </th>

//                                     <th>
//                                         Verification Code
//                                     </th>

//                                     <th>
//                                         Action
//                                     </th>

//                                 </tr>

//                             </thead>


//                             <tbody>

//                                 {admitCards.map(
//                                     (card) => (

//                                         <tr
//                                             key={
//                                                 card._id
//                                             }
//                                         >

//                                             <td>

//                                                 <div className="student-info">

//                                                     <strong>
//                                                         {
//                                                             card.student
//                                                                 ?.fullName ||
//                                                             "-"
//                                                         }
//                                                     </strong>

//                                                     <span>
//                                                         {
//                                                             card.student
//                                                                 ?.email ||
//                                                             "-"
//                                                         }
//                                                     </span>

//                                                 </div>

//                                             </td>


//                                             <td>
//                                                 {
//                                                     card.rollNumber ||
//                                                     "-"
//                                                 }
//                                             </td>


//                                             <td>

//                                                 <div className="exam-info">

//                                                     <strong>
//                                                         {
//                                                             card.exam
//                                                                 ?.subject ||
//                                                             "-"
//                                                         }
//                                                     </strong>

//                                                     <span>
//                                                         {
//                                                             card.exam
//                                                                 ?.subjectCode ||
//                                                             "-"
//                                                         }
//                                                     </span>

//                                                 </div>

//                                             </td>


//                                             <td>

//                                                 {
//                                                     card.exam
//                                                         ?.examDate
//                                                         ? new Date(
//                                                             card.exam.examDate
//                                                         ).toLocaleDateString(
//                                                             "en-IN"
//                                                         )
//                                                         : "-"
//                                                 }

//                                             </td>


//                                             <td>
//                                                 {
//                                                     card.exam
//                                                         ?.examTime ||
//                                                     "-"
//                                                 }
//                                             </td>


//                                             <td>
//                                                 {
//                                                     card.exam
//                                                         ?.room ||
//                                                     "-"
//                                                 }
//                                             </td>


//                                             <td>

//                                                 <span
//                                                     className={
//                                                         `admit-status ${
//                                                             card.status ===
//                                                             "Generated"
//                                                                 ? "generated"
//                                                                 : "cancelled"
//                                                         }`
//                                                     }
//                                                 >
//                                                     {
//                                                         card.status
//                                                     }
//                                                 </span>

//                                             </td>


//                                             <td>

//                                                 <span className="verification-code-text">

//                                                     {
//                                                         card.verificationCode ||
//                                                         "Not available"
//                                                     }

//                                                 </span>

//                                             </td>


//                                             {/* ACTION BUTTONS */}

//                                             <td>

//                                                 <div className="admit-action-buttons">

//                                                     {/* VIEW */}

//                                                     <button
//                                                         type="button"
//                                                         className="view-admit-btn"
//                                                         onClick={() =>
//                                                             handleView(
//                                                                 card
//                                                             )
//                                                         }
//                                                     >
//                                                         View
//                                                     </button>


//                                                     {/* DOWNLOAD */}

//                                                     <button
//                                                         type="button"
//                                                         className="download-admit-btn"
//                                                         onClick={() =>
//                                                             handleDownloadPDF(
//                                                                 card
//                                                             )
//                                                         }
//                                                         disabled={
//                                                             downloadingId ===
//                                                             card._id
//                                                         }
//                                                     >

//                                                         {
//                                                             downloadingId ===
//                                                             card._id
//                                                                 ? "Downloading..."
//                                                                 : "Download"
//                                                         }

//                                                     </button>

//                                                 </div>

//                                             </td>

//                                         </tr>

//                                     )
//                                 )}

//                             </tbody>

//                         </table>

//                     </div>

//                 )}

//             </div>


//             {/* ======================================================
//                 VIEW MODAL
//             ====================================================== */}

//             {selectedCard && (

//                 <div
//                     className="admit-view-overlay"
//                     onClick={closeView}
//                 >

//                     <div
//                         className="admit-view-modal"
//                         onClick={(e) =>
//                             e.stopPropagation()
//                         }
//                     >

//                         <div className="admit-view-header">

//                             <div>

//                                 <h2>
//                                     Admit Card Details
//                                 </h2>

//                                 <p>
//                                     Student examination information
//                                 </p>

//                             </div>


//                             <button
//                                 type="button"
//                                 className="close-admit-modal"
//                                 onClick={closeView}
//                             >
//                                 ×
//                             </button>

//                         </div>


//                         <div className="admit-view-content">

//                             {/* STUDENT INFORMATION */}

//                             <div className="admit-view-section">

//                                 <h3>
//                                     Student Information
//                                 </h3>


//                                 <div className="admit-view-grid">

//                                     <div>

//                                         <span>
//                                             Student Name
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .student
//                                                     ?.fullName ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Email
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .student
//                                                     ?.email ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Roll Number
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .rollNumber ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Course
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .course ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Branch
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .branch ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Semester
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .semester ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>

//                                 </div>

//                             </div>


//                             {/* EXAMINATION DETAILS */}

//                             <div className="admit-view-section">

//                                 <h3>
//                                     Examination Details
//                                 </h3>


//                                 <div className="admit-view-grid">

//                                     <div>

//                                         <span>
//                                             Subject
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .exam
//                                                     ?.subject ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Subject Code
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .exam
//                                                     ?.subjectCode ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Exam Date
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .exam
//                                                     ?.examDate
//                                                     ? new Date(
//                                                         selectedCard.exam.examDate
//                                                     ).toLocaleDateString(
//                                                         "en-IN"
//                                                     )
//                                                     : "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Exam Time
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .exam
//                                                     ?.examTime ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Exam Room
//                                         </span>

//                                         <strong>
//                                             {
//                                                 selectedCard
//                                                     .exam
//                                                     ?.room ||
//                                                 "-"
//                                             }
//                                         </strong>

//                                     </div>


//                                     <div>

//                                         <span>
//                                             Status
//                                         </span>

//                                         <strong
//                                             className={
//                                                 selectedCard.status ===
//                                                 "Generated"
//                                                     ? "modal-status-generated"
//                                                     : "modal-status-cancelled"
//                                             }
//                                         >
//                                             {
//                                                 selectedCard.status
//                                             }
//                                         </strong>

//                                     </div>

//                                 </div>

//                             </div>


//                             {/* VERIFICATION */}

//                             <div className="admit-verification-box">

//                                 <span>
//                                     Verification Code
//                                 </span>

//                                 <strong>
//                                     {
//                                         selectedCard
//                                             .verificationCode ||
//                                         "Not available"
//                                     }
//                                 </strong>

//                             </div>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>
//     );
// };

// export default AdmitCardManagement;


import { useEffect, useState } from "react";
import "./AdmitCardManagement.css";

const AdmitCardManagement = () => {
    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState([]);
    const [admitCards, setAdmitCards] = useState([]);

    const [loadingCards, setLoadingCards] = useState(true);
    const [error, setError] = useState("");

    const [selectedCard, setSelectedCard] = useState(null);
    const [downloadingId, setDownloadingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        student: "",
        exam: "",
        rollNumber: "",
        course: "",
        branch: "",
        semester: ""
    });

    const token = localStorage.getItem("token");

    // ======================================================
    // FETCH DATA
    // ======================================================

    useEffect(() => {
        fetchStudents();
        fetchExams();
        fetchAdmitCards();
    }, []);

    // ======================================================
    // FETCH STUDENTS
    // ======================================================

    const fetchStudents = async () => {
        try {
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
                setStudents(data.students || data || []);
            }
        } catch (error) {
            console.log("Students fetch error:", error);
        }
    };

    // ======================================================
    // FETCH EXAMS
    // ======================================================

    const fetchExams = async () => {
        try {
            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/exams",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setExams(data.exams || data || []);
            }
        } catch (error) {
            console.log("Exams fetch error:", error);
        }
    };

    // ======================================================
    // FETCH ADMIT CARDS
    // ======================================================

    const fetchAdmitCards = async () => {
        try {
            setLoadingCards(true);
            setError("");

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/admit-cards/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch admit cards"
                );
            }

            setAdmitCards(data.admitCards || []);
        } catch (error) {
            console.log("Admit cards fetch error:", error);
            setError(error.message);
        } finally {
            setLoadingCards(false);
        }
    };

    // ======================================================
    // HANDLE FORM CHANGE
    // ======================================================

    const handleChange = (e) => {
        setFormData((previous) => ({
            ...previous,
            [e.target.name]: e.target.value
        }));
    };

    // ======================================================
    // GENERATE ADMIT CARD
    // ======================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/admit-cards",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...formData,
                        semester: Number(formData.semester)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Unable to generate admit card"
                );
                return;
            }

            alert("Admit card generated successfully!");

            setFormData({
                student: "",
                exam: "",
                rollNumber: "",
                course: "",
                branch: "",
                semester: ""
            });

            fetchAdmitCards();
        } catch (error) {
            console.log("Admit card error:", error);
            alert("Server error");
        } finally {
            setSubmitting(false);
        }
    };

    // ======================================================
    // VIEW ADMIT CARD
    // ======================================================

    const handleView = (card) => {
        setSelectedCard(card);
    };

    const closeView = () => {
        setSelectedCard(null);
    };

    // ======================================================
    // DOWNLOAD ADMIT CARD PDF
    // ======================================================

    const handleDownloadPDF = async (card) => {
        try {
            setDownloadingId(card._id);

            const response = await fetch(
                `https://smart-college-management-backend.onrender.com/api/admit-cards/${card._id}/pdf`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                let errorMessage =
                    "Unable to download admit card";

                try {
                    const data = await response.json();

                    errorMessage =
                        data.message || errorMessage;
                } catch (error) {
                    console.log(
                        "Error response parsing failed:",
                        error
                    );
                }

                alert(errorMessage);
                return;
            }

            const blob = await response.blob();

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `admit-card-${card.rollNumber || "student"}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(
                "Download admit card error:",
                error
            );

            alert("Unable to download admit card");
        } finally {
            setDownloadingId(null);
        }
    };

    // ======================================================
    // FORMAT DATE
    // ======================================================

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

    // ======================================================
    // MAIN UI
    // ======================================================

    return (
        <div className="admit-card-management">

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="admit-card-header">

                <div className="admit-header-left">

                    <div className="admit-header-icon">
                        🎫
                    </div>

                    <div>
                        <h1>
                            Admit Card Management
                        </h1>

                        <p>
                            Generate and manage student admit cards
                        </p>
                    </div>

                </div>

                <div className="admit-card-count">
                    <span>Total</span>
                    <strong>
                        {admitCards.length}
                    </strong>
                </div>

            </div>


            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="admit-summary-grid">

                <div className="admit-summary-card">

                    <div className="summary-icon">
                        🎫
                    </div>

                    <div>
                        <span>Total Admit Cards</span>
                        <strong>
                            {admitCards.length}
                        </strong>
                    </div>

                </div>


                <div className="admit-summary-card">

                    <div className="summary-icon">
                        👨‍🎓
                    </div>

                    <div>
                        <span>Students</span>
                        <strong>
                            {students.length}
                        </strong>
                    </div>

                </div>


                <div className="admit-summary-card">

                    <div className="summary-icon">
                        📚
                    </div>

                    <div>
                        <span>Exams</span>
                        <strong>
                            {exams.length}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==================================================
                GENERATE ADMIT CARD
            ================================================== */}

            <div className="admit-card-form-card">

                <div className="form-card-header">

                    <div className="form-card-icon">
                        ✨
                    </div>

                    <div>
                        <h2>
                            Generate Admit Card
                        </h2>

                        <p>
                            Enter student and examination details
                        </p>
                    </div>

                </div>


                <form
                    className="admit-card-form"
                    onSubmit={handleSubmit}
                >

                    {/* Student */}

                    <div className="admit-form-group">

                        <label>
                            Student
                        </label>

                        <select
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
                                    {student.fullName}
                                    {" - "}
                                    {student.email}
                                </option>
                            ))}
                        </select>

                    </div>


                    {/* Exam */}

                    <div className="admit-form-group">

                        <label>
                            Exam
                        </label>

                        <select
                            name="exam"
                            value={formData.exam}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Exam
                            </option>

                            {exams.map((exam) => (
                                <option
                                    key={exam._id}
                                    value={exam._id}
                                >
                                    {exam.subject}
                                    {" - "}
                                    {exam.subjectCode}
                                </option>
                            ))}
                        </select>

                    </div>


                    {/* Roll Number */}

                    <div className="admit-form-group">

                        <label>
                            Roll Number
                        </label>

                        <input
                            type="text"
                            name="rollNumber"
                            placeholder="Enter roll number"
                            value={formData.rollNumber}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Course */}

                    <div className="admit-form-group">

                        <label>
                            Course
                        </label>

                        <input
                            type="text"
                            name="course"
                            placeholder="Example: B.E."
                            value={formData.course}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Branch */}

                    <div className="admit-form-group">

                        <label>
                            Branch
                        </label>

                        <input
                            type="text"
                            name="branch"
                            placeholder="Example: Computer Science"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Semester */}

                    <div className="admit-form-group">

                        <label>
                            Semester
                        </label>

                        <input
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


                    {/* Submit */}

                    <button
                        type="submit"
                        className="generate-admit-btn"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <span className="button-spinner"></span>
                                Generating...
                            </>
                        ) : (
                            <>
                                <span>🎫</span>
                                Generate Admit Card
                            </>
                        )}
                    </button>

                </form>

            </div>


            {/* ==================================================
                GENERATED ADMIT CARDS
            ================================================== */}

            <div className="generated-admit-section">

                <div className="generated-admit-header">

                    <div className="generated-title">

                        <div className="generated-title-icon">
                            📋
                        </div>

                        <div>
                            <h2>
                                Generated Admit Cards
                            </h2>

                            <p>
                                View all generated student admit cards
                            </p>
                        </div>

                    </div>

                </div>


                {/* Loading */}

                {loadingCards ? (

                    <div className="admit-card-message">

                        <div className="large-spinner"></div>

                        <h3>
                            Loading admit cards...
                        </h3>

                        <p>
                            Please wait while we fetch the records.
                        </p>

                    </div>

                ) : error ? (

                    <div className="admit-card-error">

                        <div className="error-icon">
                            !
                        </div>

                        <div>
                            <strong>
                                Unable to load admit cards
                            </strong>

                            <p>
                                {error}
                            </p>
                        </div>

                    </div>

                ) : admitCards.length === 0 ? (

                    <div className="admit-card-message">

                        <div className="empty-icon">
                            🎫
                        </div>

                        <h3>
                            No Admit Cards Found
                        </h3>

                        <p>
                            Generate an admit card using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="admit-card-table-container">

                        <table className="admit-card-table">

                            <thead>

                                <tr>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Roll Number
                                    </th>

                                    <th>
                                        Exam
                                    </th>

                                    <th>
                                        Exam Date
                                    </th>

                                    <th>
                                        Time
                                    </th>

                                    <th>
                                        Room
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Verification Code
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {admitCards.map((card) => (

                                    <tr
                                        key={card._id}
                                    >

                                        {/* Student */}

                                        <td>

                                            <div className="student-info">

                                                <div className="student-avatar">
                                                    {card.student?.fullName
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "S"}
                                                </div>

                                                <div>

                                                    <strong>
                                                        {
                                                            card.student
                                                                ?.fullName ||
                                                            "-"
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            card.student
                                                                ?.email ||
                                                            "-"
                                                        }
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Roll */}

                                        <td>

                                            <span className="roll-number">
                                                {
                                                    card.rollNumber ||
                                                    "-"
                                                }
                                            </span>

                                        </td>


                                        {/* Exam */}

                                        <td>

                                            <div className="exam-info">

                                                <strong>
                                                    {
                                                        card.exam
                                                            ?.subject ||
                                                        "-"
                                                    }
                                                </strong>

                                                <span>
                                                    {
                                                        card.exam
                                                            ?.subjectCode ||
                                                        "-"
                                                    }
                                                </span>

                                            </div>

                                        </td>


                                        {/* Date */}

                                        <td>

                                            <span className="date-value">
                                                {formatDate(
                                                    card.exam?.examDate
                                                )}
                                            </span>

                                        </td>


                                        {/* Time */}

                                        <td>

                                            <span className="table-value">
                                                {
                                                    card.exam
                                                        ?.examTime ||
                                                    "-"
                                                }
                                            </span>

                                        </td>


                                        {/* Room */}

                                        <td>

                                            <span className="room-value">
                                                {
                                                    card.exam?.room ||
                                                    "-"
                                                }
                                            </span>

                                        </td>


                                        {/* Status */}

                                        <td>

                                            <span
                                                className={
                                                    `admit-status ${
                                                        card.status ===
                                                        "Generated"
                                                            ? "generated"
                                                            : "cancelled"
                                                    }`
                                                }
                                            >
                                                <span className="status-dot"></span>

                                                {
                                                    card.status ||
                                                    "-"
                                                }

                                            </span>

                                        </td>


                                        {/* Verification */}

                                        <td>

                                            <span
                                                className={
                                                    `verification-code-text ${
                                                        !card.verificationCode
                                                            ? "not-available"
                                                            : ""
                                                    }`
                                                }
                                            >
                                                {
                                                    card.verificationCode ||
                                                    "Not available"
                                                }
                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td>

                                            <div className="admit-action-buttons">

                                                <button
                                                    type="button"
                                                    className="view-admit-btn"
                                                    onClick={() =>
                                                        handleView(card)
                                                    }
                                                >
                                                    👁 View
                                                </button>


                                                <button
                                                    type="button"
                                                    className="download-admit-btn"
                                                    onClick={() =>
                                                        handleDownloadPDF(
                                                            card
                                                        )
                                                    }
                                                    disabled={
                                                        downloadingId ===
                                                        card._id
                                                    }
                                                >
                                                    {downloadingId ===
                                                    card._id ? (
                                                        <>
                                                            <span className="button-spinner"></span>
                                                            Downloading
                                                        </>
                                                    ) : (
                                                        <>
                                                            ↓ Download
                                                        </>
                                                    )}
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ==================================================
                VIEW MODAL
            ================================================== */}

            {selectedCard && (

                <div
                    className="admit-view-overlay"
                    onClick={closeView}
                >

                    <div
                        className="admit-view-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* Modal Header */}

                        <div className="admit-view-header">

                            <div className="modal-title-wrapper">

                                <div className="modal-icon">
                                    🎫
                                </div>

                                <div>
                                    <h2>
                                        Admit Card Details
                                    </h2>

                                    <p>
                                        Student examination information
                                    </p>
                                </div>

                            </div>


                            <button
                                type="button"
                                className="close-admit-modal"
                                onClick={closeView}
                            >
                                ×
                            </button>

                        </div>


                        {/* Modal Content */}

                        <div className="admit-view-content">

                            {/* Student Information */}

                            <div className="admit-view-section">

                                <div className="modal-section-heading">

                                    <span>
                                        👨‍🎓
                                    </span>

                                    <h3>
                                        Student Information
                                    </h3>

                                </div>


                                <div className="admit-view-grid">

                                    <div>
                                        <span>
                                            Student Name
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.student
                                                    ?.fullName ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Email
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.student
                                                    ?.email ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Roll Number
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.rollNumber ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Course
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.course ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Branch
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.branch ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Semester
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.semester ||
                                                "-"
                                            }
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* Examination Details */}

                            <div className="admit-view-section">

                                <div className="modal-section-heading">

                                    <span>
                                        📚
                                    </span>

                                    <h3>
                                        Examination Details
                                    </h3>

                                </div>


                                <div className="admit-view-grid">

                                    <div>
                                        <span>
                                            Subject
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.exam
                                                    ?.subject ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Subject Code
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.exam
                                                    ?.subjectCode ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Exam Date
                                        </span>

                                        <strong>
                                            {formatDate(
                                                selectedCard.exam
                                                    ?.examDate
                                            )}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Exam Time
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.exam
                                                    ?.examTime ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Exam Room
                                        </span>

                                        <strong>
                                            {
                                                selectedCard.exam
                                                    ?.room ||
                                                "-"
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Status
                                        </span>

                                        <strong
                                            className={
                                                selectedCard.status ===
                                                "Generated"
                                                    ? "modal-status-generated"
                                                    : "modal-status-cancelled"
                                            }
                                        >
                                            {
                                                selectedCard.status ||
                                                "-"
                                            }
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* Verification */}

                            <div className="admit-verification-box">

                                <div className="verification-icon">
                                    ✓
                                </div>

                                <div>

                                    <span>
                                        Verification Code
                                    </span>

                                    <strong>
                                        {
                                            selectedCard.verificationCode ||
                                            "Not available"
                                        }
                                    </strong>

                                </div>

                            </div>

                        </div>


                        {/* Modal Footer */}

                        <div className="admit-view-footer">

                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={closeView}
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="modal-download-btn"
                                onClick={() =>
                                    handleDownloadPDF(
                                        selectedCard
                                    )
                                }
                                disabled={
                                    downloadingId ===
                                    selectedCard._id
                                }
                            >
                                {downloadingId ===
                                selectedCard._id
                                    ? "Downloading..."
                                    : "↓ Download PDF"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default AdmitCardManagement;


