// import { useEffect, useState } from "react";
// import "./FeeManagement.css";

// function FeeManagement() {
//     const [students, setStudents] = useState([]);

//     const [formData, setFormData] = useState({
//         student: "",
//         totalFee: "",
//         paidFee: ""
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
//                     "http://localhost:5000/api/students",
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
//                 "http://localhost:5000/api/fees", 
//                 { 
//                     method: "POST", 
//                     headers: { 
//                         "Content-Type": "application/json", 
//                         Authorization: `Bearer ${token}` 
//                     }, 
//                     body: JSON.stringify({ 
//                         student: formData.student, 
//                         totalFee: Number(formData.totalFee), 
//                         paidFee: Number(formData.paidFee) 
//                     }) 
//                 } 
//             ); 
 
//             const data = await response.json(); 
 
//             if (response.ok) { 
//                 setMessage(data.message); 
 
//                 setFormData({ 
//                     student: "", 
//                     totalFee: "", 
//                     paidFee: "" 
//                 }); 
//             } else { 
//                 setMessage(data.message); 
//             } 
 
//         } catch (error) { 
//             console.log("Create fee error:", error); 
//             setMessage("Unable to connect to server"); 
//         } finally { 
//             setSubmitting(false); 
//         } 
//     }; 
 
//     if (loading) { 
//         return ( 
//             <div className="fee-management-page"> 
//                 <p>Loading students...</p> 
//             </div> 
//         ); 
//     } 
 
//     return ( 
//         <div className="fee-management-page"> 
 
//             <div className="fee-management-header"> 
//                 <h1>Fee Management</h1> 
//                 <p> 
//                     Manage student fee records and payments 
//                 </p> 
//             </div> 
 
//             <div className="fee-management-card"> 
 
//                 <h2>Create Fee Record</h2> 
 
//                 <form onSubmit={handleSubmit}> 
 
//                     <div className="fee-form-group"> 
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
 
//                     <div className="fee-form-group"> 
//                         <label>Total Fee</label> 
 
//                         <input 
//                             type="number" 
//                             name="totalFee" 
//                             placeholder="Enter total fee" 
//                             value={formData.totalFee} 
//                             onChange={handleChange} 
//                             min="0" 
//                             required 
//                         /> 
//                     </div> 
 
//                     <div className="fee-form-group"> 
//                         <label>Paid Fee</label> 
 
//                         <input 
//                             type="number" 
//                             name="paidFee" 
//                             placeholder="Enter paid amount" 
//                             value={formData.paidFee} 
//                             onChange={handleChange} 
//                             min="0" 
//                             required 
//                         /> 
//                     </div> 
 
//                     <button 
//                         type="submit" 
//                         className="create-fee-btn" 
//                         disabled={submitting} 
//                     > 
//                         {submitting 
//                             ? "Creating..." 
//                             : "Create Fee Record"} 
//                     </button> 
 
//                 </form> 
 
//                 {message && ( 
//                     <p className="fee-management-message"> 
//                         {message} 
//                     </p> 
//                 )} 
 
//             </div> 
 
//         </div> 
//     ); 
// } 
 
// export default FeeManagement; 



import { useEffect, useState } from "react";
import "./FeeManagement.css";

function FeeManagement() {
    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState({
        student: "",
        totalFee: "",
        paidFee: ""
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
                    "http://localhost:5000/api/students",
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
    // CREATE FEE RECORD
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/fees",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        student: formData.student,
                        totalFee: Number(formData.totalFee),
                        paidFee: Number(formData.paidFee)
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);

                setFormData({
                    student: "",
                    totalFee: "",
                    paidFee: ""
                });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log("Create fee error:", error);
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
            <div className="fee-management-page">

                <div className="fee-loading-card">
                    <div className="fee-loader"></div>

                    <h3>Loading Fee Management</h3>

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
        <div className="fee-management-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="fee-management-header">

                <div className="fee-header-icon">
                    ₹
                </div>

                <div>
                    <h1>Fee Management</h1>

                    <p>
                        Manage student fee records and payments
                    </p>
                </div>

            </div>


            {/* ==========================================
                SUMMARY CARDS
            ========================================== */}

            <div className="fee-summary-grid">

                <div className="fee-summary-card">

                    <div className="fee-summary-icon">
                        👨‍🎓
                    </div>

                    <div>
                        <span>Total Students</span>

                        <strong>
                            {students.length}
                        </strong>
                    </div>

                </div>


                <div className="fee-summary-card">

                    <div className="fee-summary-icon">
                        💳
                    </div>

                    <div>
                        <span>Fee Management</span>

                        <strong>
                            Active
                        </strong>
                    </div>

                </div>


                <div className="fee-summary-card">

                    <div className="fee-summary-icon">
                        🔒
                    </div>

                    <div>
                        <span>Access</span>

                        <strong>
                            Admin
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==========================================
                CREATE FEE CARD
            ========================================== */}

            <div className="fee-management-card">

                <div className="fee-card-header">

                    <div className="fee-card-icon">
                        💰
                    </div>

                    <div>
                        <h2>
                            Create Fee Record
                        </h2>

                        <p>
                            Add a new fee record for a student
                        </p>
                    </div>

                </div>


                {/* ==========================================
                    FORM
                ========================================== */}

                <form onSubmit={handleSubmit}>

                    {/* STUDENT */}

                    <div className="fee-form-group">

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
                                Select a student
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


                    {/* FEE AMOUNTS */}

                    <div className="fee-amount-grid">

                        {/* TOTAL FEE */}

                        <div className="fee-form-group">

                            <label htmlFor="totalFee">
                                Total Fee
                            </label>

                            <div className="fee-input-wrapper">

                                <span>
                                    ₹
                                </span>

                                <input
                                    id="totalFee"
                                    type="number"
                                    name="totalFee"
                                    placeholder="Enter total fee"
                                    value={formData.totalFee}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />

                            </div>

                        </div>


                        {/* PAID FEE */}

                        <div className="fee-form-group">

                            <label htmlFor="paidFee">
                                Paid Fee
                            </label>

                            <div className="fee-input-wrapper">

                                <span>
                                    ₹
                                </span>

                                <input
                                    id="paidFee"
                                    type="number"
                                    name="paidFee"
                                    placeholder="Enter paid amount"
                                    value={formData.paidFee}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        FEE PREVIEW
                    ========================================== */}

                    {(formData.totalFee || formData.paidFee) && (

                        <div className="fee-preview">

                            <div className="fee-preview-item">

                                <span>
                                    Total Fee
                                </span>

                                <strong>
                                    ₹{Number(formData.totalFee || 0).toLocaleString("en-IN")}
                                </strong>

                            </div>


                            <div className="fee-preview-divider"></div>


                            <div className="fee-preview-item">

                                <span>
                                    Paid Amount
                                </span>

                                <strong>
                                    ₹{Number(formData.paidFee || 0).toLocaleString("en-IN")}
                                </strong>

                            </div>


                            <div className="fee-preview-divider"></div>


                            <div className="fee-preview-item remaining">

                                <span>
                                    Remaining
                                </span>

                                <strong>
                                    ₹{Math.max(
                                        Number(formData.totalFee || 0) -
                                        Number(formData.paidFee || 0),
                                        0
                                    ).toLocaleString("en-IN")}
                                </strong>

                            </div>

                        </div>

                    )}


                    {/* ==========================================
                        SUBMIT BUTTON
                    ========================================== */}

                    <button
                        type="submit"
                        className="create-fee-btn"
                        disabled={submitting}
                    >

                        {submitting ? (
                            <>
                                <span className="button-loader"></span>
                                Creating...
                            </>
                        ) : (
                            <>
                                <span>
                                    +
                                </span>

                                Create Fee Record
                            </>
                        )}

                    </button>

                </form>


                {/* ==========================================
                    MESSAGE
                ========================================== */}

                {message && (

                    <div className="fee-management-message">

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

            <div className="fee-page-note">

                <span>🔒</span>

                <p>
                    Fee records are securely managed through the
                    college administration system.
                </p>

            </div>

        </div>
    );
}

export default FeeManagement;