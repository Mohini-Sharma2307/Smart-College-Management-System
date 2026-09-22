// import { useEffect, useState } from "react";
// import "./FeeReceiptManagement.css";

// function FeeReceiptManagement() {
//     const [students, setStudents] = useState([]);
//     const [receipts, setReceipts] = useState([]);

//     const [formData, setFormData] = useState({
//         student: "",
//         receiptNumber: "",
//         amount: "",
//         paymentDate: "",
//         paymentMode: "",
//         description: ""
//     });

//     const [loading, setLoading] = useState(true);
//     const [receiptsLoading, setReceiptsLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);
//     const [downloadingId, setDownloadingId] = useState(null);

//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchStudents();
//         fetchReceipts();
//     }, []);

//     // ==========================================
//     // FETCH STUDENTS
//     // ==========================================

//     const fetchStudents = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/students",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setStudents(data.students || []);
//             } else {
//                 setError(
//                     data.message ||
//                     "Unable to fetch students"
//                 );
//             }

//         } catch (error) {
//             console.log(
//                 "Students fetch error:",
//                 error
//             );

//             setError(
//                 "Unable to connect to server"
//             );

//         } finally {
//             setLoading(false);
//         }
//     };


//     // ==========================================
//     // FETCH RECEIPTS
//     // ==========================================

//     const fetchReceipts = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/fee-receipts",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setReceipts(data.receipts || []);
//             } else {
//                 setError(
//                     data.message ||
//                     "Unable to fetch receipts"
//                 );
//             }

//         } catch (error) {
//             console.log(
//                 "Receipts fetch error:",
//                 error
//             );

//             setError(
//                 "Unable to fetch fee receipts"
//             );

//         } finally {
//             setReceiptsLoading(false);
//         }
//     };


//     // ==========================================
//     // HANDLE FORM CHANGE
//     // ==========================================

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };


//     // ==========================================
//     // CREATE FEE RECEIPT
//     // ==========================================

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setSubmitting(true);
//         setMessage("");
//         setError("");

//         try {
//             const token = localStorage.getItem("token");

//             const response = await fetch(
//                 "https://smart-college-management-backend.onrender.com/api/fee-receipts",
//                 {
//                     method: "POST",

//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },

//                     body: JSON.stringify({
//                         student: formData.student,
//                         receiptNumber:
//                             formData.receiptNumber,
//                         amount:
//                             Number(formData.amount),
//                         paymentDate:
//                             formData.paymentDate,
//                         paymentMode:
//                             formData.paymentMode,
//                         description:
//                             formData.description
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {

//                 setMessage(data.message);

//                 setFormData({
//                     student: "",
//                     receiptNumber: "",
//                     amount: "",
//                     paymentDate: "",
//                     paymentMode: "",
//                     description: ""
//                 });

//                 fetchReceipts();

//             } else {

//                 setError(
//                     data.message ||
//                     "Unable to create fee receipt"
//                 );
//             }

//         } catch (error) {

//             console.log(
//                 "Create fee receipt error:",
//                 error
//             );

//             setError(
//                 "Unable to connect to server"
//             );

//         } finally {
//             setSubmitting(false);
//         }
//     };


//     // ==========================================
//     // DOWNLOAD FEE RECEIPT PDF
//     // ==========================================

//     const handleDownloadPDF = async (receipt) => {
//         try {

//             setDownloadingId(receipt._id);
//             setError("");

//             const token =
//                 localStorage.getItem("token");

//             const response = await fetch(
//                 `https://smart-college-management-backend.onrender.com/api/fee-receipts/${receipt._id}/pdf`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             if (!response.ok) {

//                 const data =
//                     await response.json();

//                 setError(
//                     data.message ||
//                     "Unable to download fee receipt"
//                 );

//                 return;
//             }

//             const blob =
//                 await response.blob();

//             const url =
//                 window.URL.createObjectURL(blob);

//             const link =
//                 document.createElement("a");

//             link.href = url;

//             link.download =
//                 `${receipt.receiptNumber}.pdf`;

//             document.body.appendChild(link);

//             link.click();

//             link.remove();

//             window.URL.revokeObjectURL(url);

//         } catch (error) {

//             console.log(
//                 "Fee receipt PDF download error:",
//                 error
//             );

//             setError(
//                 "Unable to download fee receipt PDF"
//             );

//         } finally {

//             setDownloadingId(null);
//         }
//     };


//     // ==========================================
//     // LOADING
//     // ==========================================

//     if (loading) {
//         return (
//             <div className="fee-receipt-page">

//                 <div className="fee-receipt-loading">
//                     Loading fee receipt management...
//                 </div>

//             </div>
//         );
//     }


//     // ==========================================
//     // MAIN UI
//     // ==========================================

//     return (
//         <div className="fee-receipt-page">

//             {/* ==========================================
//                 PAGE HEADER
//             ========================================== */}

//             <div className="fee-receipt-header">

//                 <div>

//                     <h1>
//                         Fee Receipt Management
//                     </h1>

//                     <p>
//                         Generate and manage student payment receipts
//                     </p>

//                 </div>

//                 <div className="fee-receipt-header-icon">
//                     🧾
//                 </div>

//             </div>


//             {/* ==========================================
//                 GENERATE RECEIPT
//             ========================================== */}

//             <div className="fee-receipt-card">

//                 <div className="fee-receipt-card-header">

//                     <div>

//                         <h2>
//                             Generate Fee Receipt
//                         </h2>

//                         <p>
//                             Create an official receipt for a student payment
//                         </p>

//                     </div>

//                 </div>


//                 <form
//                     className="fee-receipt-form"
//                     onSubmit={handleSubmit}
//                 >

//                     {/* STUDENT */}

//                     <div className="fee-receipt-form-group">

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


//                     {/* RECEIPT NUMBER */}

//                     <div className="fee-receipt-form-group">

//                         <label>
//                             Receipt Number
//                         </label>

//                         <input
//                             type="text"
//                             name="receiptNumber"
//                             placeholder="Example: FEE-2026-002"
//                             value={formData.receiptNumber}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>


//                     {/* AMOUNT */}

//                     <div className="fee-receipt-form-group">

//                         <label>
//                             Amount Paid
//                         </label>

//                         <input
//                             type="number"
//                             name="amount"
//                             placeholder="Enter amount"
//                             value={formData.amount}
//                             onChange={handleChange}
//                             min="1"
//                             required
//                         />

//                     </div>


//                     {/* PAYMENT DATE */}

//                     <div className="fee-receipt-form-group">

//                         <label>
//                             Payment Date
//                         </label>

//                         <input
//                             type="date"
//                             name="paymentDate"
//                             value={formData.paymentDate}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>


//                     {/* PAYMENT MODE */}

//                     <div className="fee-receipt-form-group">

//                         <label>
//                             Payment Mode
//                         </label>

//                         <select
//                             name="paymentMode"
//                             value={formData.paymentMode}
//                             onChange={handleChange}
//                             required
//                         >

//                             <option value="">
//                                 Select Payment Mode
//                             </option>

//                             <option value="Cash">
//                                 Cash
//                             </option>

//                             <option value="UPI">
//                                 UPI
//                             </option>

//                             <option value="Card">
//                                 Card
//                             </option>

//                             <option value="Bank Transfer">
//                                 Bank Transfer
//                             </option>

//                         </select>

//                     </div>


//                     {/* DESCRIPTION */}

//                     <div className="fee-receipt-form-group full-width">

//                         <label>
//                             Description
//                         </label>

//                         <textarea
//                             name="description"
//                             placeholder="Example: Semester 3 Tuition Fee"
//                             value={formData.description}
//                             onChange={handleChange}
//                             rows="4"
//                         />

//                     </div>


//                     {/* SUBMIT */}

//                     <div className="fee-receipt-submit-area">

//                         <button
//                             type="submit"
//                             className="generate-receipt-btn"
//                             disabled={submitting}
//                         >
//                             {submitting
//                                 ? "Generating..."
//                                 : "Generate Fee Receipt"}
//                         </button>

//                     </div>

//                 </form>


//                 {/* SUCCESS */}

//                 {message && (
//                     <div className="fee-receipt-success">
//                         ✓ {message}
//                     </div>
//                 )}


//                 {/* ERROR */}

//                 {error && (
//                     <div className="fee-receipt-error">
//                         {error}
//                     </div>
//                 )}

//             </div>


//             {/* ==========================================
//                 RECEIPT HISTORY
//             ========================================== */}

//             <div className="fee-receipt-card">

//                 <div className="receipt-history-header">

//                     <div>

//                         <h2>
//                             Fee Receipt History
//                         </h2>

//                         <p>
//                             All generated student payment receipts
//                         </p>

//                     </div>

//                     <div className="receipt-total">

//                         {receipts.length}

//                         <span>
//                             Receipts
//                         </span>

//                     </div>

//                 </div>


//                 {receiptsLoading ? (

//                     <div className="fee-receipt-loading">
//                         Loading receipts...
//                     </div>

//                 ) : receipts.length === 0 ? (

//                     <div className="fee-receipt-empty">

//                         <div>
//                             🧾
//                         </div>

//                         <h3>
//                             No Receipts Found
//                         </h3>

//                         <p>
//                             Generated fee receipts will appear here.
//                         </p>

//                     </div>

//                 ) : (

//                     <div className="receipt-table-wrapper">

//                         <table className="receipt-table">

//                             <thead>

//                                 <tr>

//                                     <th>
//                                         Receipt Number
//                                     </th>

//                                     <th>
//                                         Student
//                                     </th>

//                                     <th>
//                                         Amount
//                                     </th>

//                                     <th>
//                                         Payment Mode
//                                     </th>

//                                     <th>
//                                         Payment Date
//                                     </th>

//                                     <th>
//                                         Status
//                                     </th>

//                                     <th>
//                                         Action
//                                     </th>

//                                 </tr>

//                             </thead>


//                             <tbody>

//                                 {receipts.map((receipt) => (

//                                     <tr key={receipt._id}>

//                                         {/* RECEIPT NUMBER */}

//                                         <td>

//                                             <strong className="receipt-number">
//                                                 {receipt.receiptNumber}
//                                             </strong>

//                                         </td>


//                                         {/* STUDENT */}

//                                         <td>

//                                             <div className="receipt-student">

//                                                 <strong>
//                                                     {receipt.student?.fullName || "-"}
//                                                 </strong>

//                                                 <span>
//                                                     {receipt.student?.email || "-"}
//                                                 </span>

//                                             </div>

//                                         </td>


//                                         {/* AMOUNT */}

//                                         <td>

//                                             <strong className="receipt-amount">

//                                                 ₹
//                                                 {Number(
//                                                     receipt.amount
//                                                 ).toLocaleString("en-IN")}

//                                             </strong>

//                                         </td>


//                                         {/* PAYMENT MODE */}

//                                         <td>

//                                             <span className="payment-mode-badge">
//                                                 {receipt.paymentMode}
//                                             </span>

//                                         </td>


//                                         {/* PAYMENT DATE */}

//                                         <td>

//                                             {receipt.paymentDate
//                                                 ? new Date(
//                                                     receipt.paymentDate
//                                                 ).toLocaleDateString(
//                                                     "en-IN",
//                                                     {
//                                                         day: "2-digit",
//                                                         month: "short",
//                                                         year: "numeric"
//                                                     }
//                                                 )
//                                                 : "-"}

//                                         </td>


//                                         {/* STATUS */}

//                                         <td>

//                                             <span className="receipt-status-badge">
//                                                 {receipt.status}
//                                             </span>

//                                         </td>


//                                         {/* DOWNLOAD */}

//                                         <td>

//                                             <button
//                                                 type="button"
//                                                 className="download-receipt-btn"
//                                                 onClick={() =>
//                                                     handleDownloadPDF(
//                                                         receipt
//                                                     )
//                                                 }
//                                                 disabled={
//                                                     downloadingId ===
//                                                     receipt._id
//                                                 }
//                                             >

//                                                 {downloadingId ===
//                                                 receipt._id
//                                                     ? "Downloading..."
//                                                     : "↓ Download PDF"}

//                                             </button>

//                                         </td>

//                                     </tr>

//                                 ))}

//                             </tbody>

//                         </table>

//                     </div>

//                 )}

//             </div>

//         </div>
//     );
// }

// export default FeeReceiptManagement;


import { useEffect, useState } from "react";
import "./FeeReceiptManagement.css";

function FeeReceiptManagement() {
    const [students, setStudents] = useState([]);
    const [receipts, setReceipts] = useState([]);

    const [formData, setFormData] = useState({
        student: "",
        receiptNumber: "",
        amount: "",
        paymentDate: "",
        paymentMode: "",
        description: ""
    });

    const [loading, setLoading] = useState(true);
    const [receiptsLoading, setReceiptsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [downloadingId, setDownloadingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // FETCH DATA
    // ==========================================

    useEffect(() => {
        fetchStudents();
        fetchReceipts();
    }, []);

    // ==========================================
    // FETCH STUDENTS
    // ==========================================

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
                setError(
                    data.message ||
                    "Unable to fetch students"
                );
            }
        } catch (error) {
            console.log(
                "Students fetch error:",
                error
            );

            setError(
                "Unable to connect to server"
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // FETCH RECEIPTS
    // ==========================================

    const fetchReceipts = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/fee-receipts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setReceipts(data.receipts || []);
            } else {
                setError(
                    data.message ||
                    "Unable to fetch receipts"
                );
            }
        } catch (error) {
            console.log(
                "Receipts fetch error:",
                error
            );

            setError(
                "Unable to fetch fee receipts"
            );
        } finally {
            setReceiptsLoading(false);
        }
    };

    // ==========================================
    // HANDLE FORM CHANGE
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setMessage("");
        setError("");
    };

    // ==========================================
    // CREATE FEE RECEIPT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/fee-receipts",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        student:
                            formData.student,

                        receiptNumber:
                            formData.receiptNumber,

                        amount:
                            Number(formData.amount),

                        paymentDate:
                            formData.paymentDate,

                        paymentMode:
                            formData.paymentMode,

                        description:
                            formData.description
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(
                    data.message ||
                    "Fee receipt generated successfully."
                );

                setFormData({
                    student: "",
                    receiptNumber: "",
                    amount: "",
                    paymentDate: "",
                    paymentMode: "",
                    description: ""
                });

                fetchReceipts();
            } else {
                setError(
                    data.message ||
                    "Unable to create fee receipt"
                );
            }
        } catch (error) {
            console.log(
                "Create fee receipt error:",
                error
            );

            setError(
                "Unable to connect to server"
            );
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // DOWNLOAD PDF
    // ==========================================

    const handleDownloadPDF = async (receipt) => {
        try {
            setDownloadingId(receipt._id);
            setError("");

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `https://smart-college-management-backend.onrender.com/api/fee-receipts/${receipt._id}/pdf`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const data =
                    await response.json();

                setError(
                    data.message ||
                    "Unable to download fee receipt"
                );

                return;
            }

            const blob =
                await response.blob();

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `${receipt.receiptNumber}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(
                "Fee receipt PDF download error:",
                error
            );

            setError(
                "Unable to download fee receipt PDF"
            );
        } finally {
            setDownloadingId(null);
        }
    };

    // ==========================================
    // INITIALS
    // ==========================================

    const getInitials = (name = "") => {
        const words =
            name.trim().split(" ");

        if (words.length === 1) {
            return (
                words[0]
                    ?.charAt(0)
                    .toUpperCase() || "S"
            );
        }

        return (
            words[0]?.charAt(0) +
            words[words.length - 1]?.charAt(0)
        ).toUpperCase();
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    // ==========================================
    // TOTAL AMOUNT
    // ==========================================

    const totalAmount = receipts.reduce(
        (total, receipt) =>
            total + Number(receipt.amount || 0),
        0
    );

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="fee-receipt-page">

                <div className="fee-receipt-loading">

                    <div className="fee-loading-spinner"></div>

                    <p>
                        Loading fee receipt management...
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="fee-receipt-page">

            {/* ==================================
                HEADER
            ================================== */}

            <div className="fee-receipt-header">

                <div className="fee-header-left">

                    <div className="fee-header-icon">
                        <span>₹</span>
                    </div>

                    <div>

                        <div className="fee-breadcrumb">
                            Finance
                            <span>/</span>
                            Fee Management
                        </div>

                        <h1>
                            Fee Receipt Management
                        </h1>

                        <p>
                            Generate and manage student payment receipts
                        </p>

                    </div>

                </div>


                <div className="fee-header-summary">

                    <strong>
                        {receipts.length}
                    </strong>

                    <span>
                        Total Receipts
                    </span>

                </div>

            </div>


            {/* ==================================
                SUMMARY CARDS
            ================================== */}

            <div className="fee-summary-grid">

                <div className="fee-summary-card">

                    <div className="fee-summary-icon receipts">
                        #
                    </div>

                    <div>
                        <span>
                            Total Receipts
                        </span>

                        <strong>
                            {receipts.length}
                        </strong>
                    </div>

                </div>


                <div className="fee-summary-card">

                    <div className="fee-summary-icon students">
                        S
                    </div>

                    <div>
                        <span>
                            Students
                        </span>

                        <strong>
                            {students.length}
                        </strong>
                    </div>

                </div>


                <div className="fee-summary-card">

                    <div className="fee-summary-icon amount">
                        ₹
                    </div>

                    <div>
                        <span>
                            Total Collected
                        </span>

                        <strong>
                            ₹
                            {totalAmount.toLocaleString(
                                "en-IN"
                            )}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ==================================
                GLOBAL MESSAGE
            ================================== */}

            {message && (
                <div className="fee-alert fee-success">

                    <span className="fee-alert-icon">
                        ✓
                    </span>

                    <div>
                        <strong>
                            Receipt Generated
                        </strong>

                        <p>
                            {message}
                        </p>
                    </div>

                </div>
            )}


            {error && (
                <div className="fee-alert fee-error">

                    <span className="fee-alert-icon">
                        !
                    </span>

                    <div>
                        <strong>
                            Something went wrong
                        </strong>

                        <p>
                            {error}
                        </p>
                    </div>

                </div>
            )}


            {/* ==================================
                GENERATE RECEIPT
            ================================== */}

            <div className="fee-receipt-card">

                <div className="fee-card-heading">

                    <div className="fee-card-title-icon">
                        +
                    </div>

                    <div>

                        <h2>
                            Generate Fee Receipt
                        </h2>

                        <p>
                            Create an official receipt for a student payment
                        </p>

                    </div>

                </div>


                <form
                    className="fee-receipt-form"
                    onSubmit={handleSubmit}
                >

                    {/* STUDENT */}

                    <div className="fee-form-group">

                        <label>
                            Student
                            <span>*</span>
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

                            {students.map(
                                (student) => (
                                    <option
                                        key={
                                            student._id
                                        }
                                        value={
                                            student._id
                                        }
                                    >
                                        {
                                            student.fullName
                                        }{" "}
                                        -{" "}
                                        {
                                            student.email
                                        }
                                    </option>
                                )
                            )}

                        </select>

                    </div>


                    {/* RECEIPT NUMBER */}

                    <div className="fee-form-group">

                        <label>
                            Receipt Number
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="receiptNumber"
                            placeholder="FEE-2026-002"
                            value={
                                formData.receiptNumber
                            }
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* AMOUNT */}

                    <div className="fee-form-group">

                        <label>
                            Amount Paid
                            <span>*</span>
                        </label>

                        <div className="fee-amount-input">

                            <span>
                                ₹
                            </span>

                            <input
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                value={
                                    formData.amount
                                }
                                onChange={handleChange}
                                min="1"
                                required
                            />

                        </div>

                    </div>


                    {/* PAYMENT DATE */}

                    <div className="fee-form-group">

                        <label>
                            Payment Date
                            <span>*</span>
                        </label>

                        <input
                            type="date"
                            name="paymentDate"
                            value={
                                formData.paymentDate
                            }
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* PAYMENT MODE */}

                    <div className="fee-form-group">

                        <label>
                            Payment Mode
                            <span>*</span>
                        </label>

                        <select
                            name="paymentMode"
                            value={
                                formData.paymentMode
                            }
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Payment Mode
                            </option>

                            <option value="Cash">
                                Cash
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Card">
                                Card
                            </option>

                            <option value="Bank Transfer">
                                Bank Transfer
                            </option>

                        </select>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="fee-form-group fee-full-width">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Example: Semester 3 Tuition Fee"
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                            rows="4"
                        />

                    </div>


                    {/* SUBMIT */}

                    <div className="fee-form-actions">

                        <button
                            type="submit"
                            className="generate-receipt-btn"
                            disabled={submitting}
                        >

                            {submitting ? (
                                <>
                                    <span className="fee-button-spinner"></span>

                                    Generating Receipt...
                                </>
                            ) : (
                                <>
                                    Generate Fee Receipt
                                    <span>
                                        →
                                    </span>
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>


            {/* ==================================
                RECEIPT HISTORY
            ================================== */}

            <div className="fee-receipt-card">

                <div className="receipt-history-header">

                    <div>

                        <div className="history-label">
                            PAYMENT RECORDS
                        </div>

                        <h2>
                            Fee Receipt History
                        </h2>

                        <p>
                            All generated student payment receipts
                        </p>

                    </div>

                    <div className="receipt-total">

                        <strong>
                            {receipts.length}
                        </strong>

                        <span>
                            Receipts
                        </span>

                    </div>

                </div>


                {/* RECEIPTS LOADING */}

                {receiptsLoading ? (

                    <div className="fee-history-loading">

                        <div className="fee-loading-spinner"></div>

                        <p>
                            Loading receipts...
                        </p>

                    </div>

                ) : receipts.length === 0 ? (

                    /* EMPTY */

                    <div className="fee-receipt-empty">

                        <div className="empty-fee-icon">
                            ₹
                        </div>

                        <h3>
                            No Receipts Found
                        </h3>

                        <p>
                            Generated fee receipts will
                            appear here.
                        </p>

                    </div>

                ) : (

                    /* RECEIPT LIST */

                    <div className="receipt-table-wrapper">

                        <table className="receipt-table">

                            <thead>

                                <tr>

                                    <th>
                                        Receipt
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Amount
                                    </th>

                                    <th>
                                        Payment
                                    </th>

                                    <th>
                                        Date
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

                                {receipts.map(
                                    (receipt) => (

                                        <tr
                                            key={
                                                receipt._id
                                            }
                                        >

                                            {/* RECEIPT */}

                                            <td>

                                                <div className="receipt-number-cell">

                                                    <span className="receipt-document-icon">
                                                        #
                                                    </span>

                                                    <div>

                                                        <strong>
                                                            {
                                                                receipt.receiptNumber
                                                            }
                                                        </strong>

                                                        <small>
                                                            Official Receipt
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* STUDENT */}

                                            <td>

                                                <div className="receipt-student">

                                                    <div className="receipt-student-avatar">
                                                        {getInitials(
                                                            receipt
                                                                .student
                                                                ?.fullName
                                                        )}
                                                    </div>

                                                    <div className="receipt-student-info">

                                                        <strong>
                                                            {
                                                                receipt
                                                                    .student
                                                                    ?.fullName ||
                                                                "-"
                                                            }
                                                        </strong>

                                                        <span>
                                                            {
                                                                receipt
                                                                    .student
                                                                    ?.email ||
                                                                "-"
                                                            }
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* AMOUNT */}

                                            <td>

                                                <strong className="receipt-amount">
                                                    ₹
                                                    {Number(
                                                        receipt.amount
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </strong>

                                            </td>


                                            {/* PAYMENT MODE */}

                                            <td>

                                                <span
                                                    className={`payment-mode-badge ${String(
                                                        receipt.paymentMode ||
                                                        ""
                                                    )
                                                        .toLowerCase()
                                                        .replace(
                                                            /\s+/g,
                                                            "-"
                                                        )}`}
                                                >
                                                    {
                                                        receipt.paymentMode
                                                    }
                                                </span>

                                            </td>


                                            {/* DATE */}

                                            <td>

                                                <span className="receipt-date">
                                                    {formatDate(
                                                        receipt.paymentDate
                                                    )}
                                                </span>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span className="receipt-status-badge">
                                                    <span>
                                                        ✓
                                                    </span>

                                                    {
                                                        receipt.status ||
                                                        "Paid"
                                                    }
                                                </span>

                                            </td>


                                            {/* DOWNLOAD */}

                                            <td>

                                                <button
                                                    type="button"
                                                    className="download-receipt-btn"
                                                    onClick={() =>
                                                        handleDownloadPDF(
                                                            receipt
                                                        )
                                                    }
                                                    disabled={
                                                        downloadingId ===
                                                        receipt._id
                                                    }
                                                >

                                                    {downloadingId ===
                                                    receipt._id ? (
                                                        <>
                                                            <span className="download-spinner"></span>

                                                            Downloading...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>
                                                                ↓
                                                            </span>

                                                            Download PDF
                                                        </>
                                                    )}

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default FeeReceiptManagement;
