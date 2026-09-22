
// import { useEffect, useState } from "react";
// import "./NoticeManagement.css";

// function NoticeManagement() {
//     const [notices, setNotices] = useState([]);

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         category: "",
//         publishDate: ""
//     });

//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);

//     useEffect(() => {
//         fetchNotices();
//     }, []);

//     const fetchNotices = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const response = await fetch(
//                 "http://localhost:5000/api/notices",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setNotices(data.notices);
//             } else {
//                 setMessage(data.message);
//             }

//         } catch (error) {
//             console.log("Fetch notices error:", error);
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
//                 "http://localhost:5000/api/notices",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         title: formData.title,
//                         description: formData.description,
//                         category: formData.category,
//                         publishDate: formData.publishDate
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setMessage(data.message);

//                 setFormData({
//                     title: "",
//                     description: "",
//                     category: "",
//                     publishDate: ""
//                 });

//                 fetchNotices();

//             } else {
//                 setMessage(data.message);
//             }

//         } catch (error) {
//             console.log("Create notice error:", error);
//             setMessage("Unable to connect to server");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString(
//             "en-IN",
//             {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric"
//             }
//         );
//     };

//     if (loading) {
//         return (
//             <div className="notice-management-page">
//                 <p>Loading notices...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="notice-management-page">

//             <div className="notice-management-header">
//                 <h1>Notice Management</h1>
//                 <p>
//                     Create and manage college announcements
//                 </p>
//             </div>

//             {/* Add Notice */}

//             <div className="notice-management-card">

//                 <h2>Create New Notice</h2>

//                 <form onSubmit={handleSubmit}>

//                     <div className="notice-form-group">
//                         <label>Notice Title</label>

//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Enter notice title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="notice-form-group">
//                         <label>Description</label>

//                         <textarea
//                             name="description"
//                             placeholder="Enter notice description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             rows="5"
//                             required
//                         />
//                     </div>

//                     <div className="notice-form-group">
//                         <label>Category</label>

//                         <select
//                             name="category"
//                             value={formData.category}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">
//                                 Select Category
//                             </option>

//                             <option value="General">
//                                 General
//                             </option>

//                             <option value="Exam">
//                                 Exam
//                             </option>

//                             <option value="Admission">
//                                 Admission
//                             </option>

//                             <option value="Fees">
//                                 Fees
//                             </option>

//                             <option value="Event">
//                                 Event
//                             </option>
//                         </select>
//                     </div>

//                     <div className="notice-form-group">
//                         <label>Publish Date</label>

//                         <input
//                             type="date"
//                             name="publishDate"
//                             value={formData.publishDate}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="create-notice-btn"
//                         disabled={submitting}
//                     >
//                         {submitting
//                             ? "Publishing..."
//                             : "Publish Notice"}
//                     </button>

//                 </form>

//                 {message && (
//                     <p className="notice-management-message">
//                         {message}
//                     </p>
//                 )}

//             </div>

//             {/* Existing Notices */}

//             <div className="notice-list-management-card">

//                 <h2>Existing Notices</h2>

//                 {notices.length === 0 ? (
//                     <p>No notices found.</p>
//                 ) : (
//                     <div className="notice-management-list">

//                         {notices.map((notice) => (
//                             <div
//                                 className="notice-management-item"
//                                 key={notice._id}
//                             >

//                                 <div className="notice-item-icon">
//                                     📢
//                                 </div>

//                                 <div className="notice-item-content">

//                                     <div className="notice-item-top">

//                                         <h3>
//                                             {notice.title}
//                                         </h3>

//                                         <span>
//                                             {notice.category}
//                                         </span>

//                                     </div>

//                                     <p>
//                                         {notice.description}
//                                     </p>

//                                     <small>
//                                         Published:{" "}
//                                         {formatDate(
//                                             notice.publishDate
//                                         )}
//                                     </small>

//                                 </div>

//                             </div>
//                         ))}

//                     </div>
//                 )}

//             </div>

//         </div>
//     );
// }

// export default NoticeManagement;



import { useEffect, useState } from "react";
import "./NoticeManagement.css";

function NoticeManagement() {
    const [notices, setNotices] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        publishDate: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // ==========================================
    // FETCH NOTICES
    // ==========================================

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/notices",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setNotices(data.notices || []);
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.log("Fetch notices error:", error);
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
    // CREATE NOTICE
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/notices",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        category: formData.category,
                        publishDate: formData.publishDate
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);

                setFormData({
                    title: "",
                    description: "",
                    category: "",
                    publishDate: ""
                });

                fetchNotices();

            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.log("Create notice error:", error);
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
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    };

    // ==========================================
    // CATEGORY CLASS
    // ==========================================

    const getCategoryClass = (category) => {
        return `notice-category notice-category-${category
            ?.toLowerCase()
            .replace(/\s+/g, "-")}`;
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="notice-management-page">

                <div className="notice-loading-card">

                    <div className="notice-loader"></div>

                    <h3>
                        Loading Notices
                    </h3>

                    <p>
                        Fetching college announcements...
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="notice-management-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="notice-management-header">

                <div className="notice-header-icon">
                    📢
                </div>

                <div>
                    <h1>
                        Notice Management
                    </h1>

                    <p>
                        Create and manage college announcements
                    </p>
                </div>

            </div>


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="notice-summary-grid">

                <div className="notice-summary-card">

                    <div className="notice-summary-icon">
                        📢
                    </div>

                    <div>
                        <span>
                            Total Notices
                        </span>

                        <strong>
                            {notices.length}
                        </strong>
                    </div>

                </div>


                <div className="notice-summary-card">

                    <div className="notice-summary-icon">
                        📅
                    </div>

                    <div>
                        <span>
                            Announcements
                        </span>

                        <strong>
                            Active
                        </strong>
                    </div>

                </div>


                <div className="notice-summary-card">

                    <div className="notice-summary-icon">
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
                CREATE NOTICE
            ========================================== */}

            <div className="notice-management-card">

                <div className="notice-card-header">

                    <div className="notice-card-icon">
                        📝
                    </div>

                    <div>
                        <h2>
                            Create New Notice
                        </h2>

                        <p>
                            Publish an announcement for students
                        </p>
                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* NOTICE TITLE */}

                    <div className="notice-form-group">

                        <label htmlFor="title">
                            Notice Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Enter notice title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="notice-form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter notice description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            required
                        />

                    </div>


                    {/* CATEGORY + DATE */}

                    <div className="notice-form-row">

                        <div className="notice-form-group">

                            <label htmlFor="category">
                                Category
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

                                <option value="General">
                                    General
                                </option>

                                <option value="Exam">
                                    Exam
                                </option>

                                <option value="Admission">
                                    Admission
                                </option>

                                <option value="Fees">
                                    Fees
                                </option>

                                <option value="Event">
                                    Event
                                </option>

                            </select>

                        </div>


                        <div className="notice-form-group">

                            <label htmlFor="publishDate">
                                Publish Date
                            </label>

                            <input
                                id="publishDate"
                                type="date"
                                name="publishDate"
                                value={formData.publishDate}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="create-notice-btn"
                        disabled={submitting}
                    >

                        {submitting ? (
                            <>
                                <span className="notice-button-loader"></span>
                                Publishing...
                            </>
                        ) : (
                            <>
                                <span className="notice-add-icon">
                                    +
                                </span>

                                Publish Notice
                            </>
                        )}

                    </button>

                </form>


                {/* MESSAGE */}

                {message && (

                    <div className="notice-management-message">

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
                EXISTING NOTICES
            ========================================== */}

            <div className="notice-list-management-card">

                <div className="notice-list-header">

                    <div>

                        <h2>
                            Existing Notices
                        </h2>

                        <p>
                            All college announcements
                        </p>

                    </div>

                    <div className="notice-count">
                        {notices.length} Notices
                    </div>

                </div>


                {notices.length === 0 ? (

                    <div className="notice-empty-state">

                        <div className="notice-empty-icon">
                            📢
                        </div>

                        <h3>
                            No Notices Found
                        </h3>

                        <p>
                            Create a new notice to display it here.
                        </p>

                    </div>

                ) : (

                    <div className="notice-management-list">

                        {notices.map((notice) => (

                            <div
                                className="notice-management-item"
                                key={notice._id}
                            >

                                {/* ICON */}

                                <div className="notice-item-icon">
                                    📢
                                </div>


                                {/* CONTENT */}

                                <div className="notice-item-content">

                                    <div className="notice-item-top">

                                        <h3>
                                            {notice.title}
                                        </h3>

                                        <span
                                            className={getCategoryClass(
                                                notice.category
                                            )}
                                        >
                                            {notice.category}
                                        </span>

                                    </div>


                                    <p>
                                        {notice.description}
                                    </p>


                                    <div className="notice-item-footer">

                                        <span>
                                            📅
                                        </span>

                                        <small>
                                            Published:{" "}
                                            {formatDate(
                                                notice.publishDate
                                            )}
                                        </small>

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

            <div className="notice-page-note">

                <span>
                    🔒
                </span>

                <p>
                    College announcements are managed securely
                    through the administration system.
                </p>

            </div>

        </div>
    );
}

export default NoticeManagement;