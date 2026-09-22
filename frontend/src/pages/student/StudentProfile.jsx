
// import { useEffect, useState } from "react";
// import "./StudentProfile.css";

// function StudentProfile() {

//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const [isEditing, setIsEditing] = useState(false);
//     const [fullName, setFullName] = useState("");
//     const [saving, setSaving] = useState(false);
//     const [message, setMessage] = useState("");


//     // ===============================
//     // FETCH PROFILE
//     // ===============================

//     useEffect(() => {

//         const fetchProfile = async () => {

//             try {

//                 const token = localStorage.getItem("token");

//                 if (!token) {
//                     setError("Please login first");
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await fetch(
//                     "http://localhost:5000/api/auth/profile",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );

//                 const data = await response.json();

//                 if (response.ok) {

//                     const storedUser =
//                         JSON.parse(
//                             localStorage.getItem("user")
//                         );

//                     const profileUser = {
//                         ...storedUser,
//                         ...data.user
//                     };

//                     setUser(profileUser);
//                     setFullName(profileUser.fullName || "");

//                     localStorage.setItem(
//                         "user",
//                         JSON.stringify(profileUser)
//                     );

//                 } else {

//                     setError(
//                         data.message ||
//                         "Unable to load profile"
//                     );

//                 }

//             } catch (error) {

//                 console.log(
//                     "Profile fetch error:",
//                     error
//                 );

//                 setError(
//                     "Unable to connect to server"
//                 );

//             } finally {

//                 setLoading(false);

//             }
//         };

//         fetchProfile();

//     }, []);


//     // ===============================
//     // START EDITING
//     // ===============================

//     const handleEdit = () => {

//         setFullName(user?.fullName || "");
//         setMessage("");
//         setIsEditing(true);

//     };


//     // ===============================
//     // CANCEL EDIT
//     // ===============================

//     const handleCancel = () => {

//         setFullName(user?.fullName || "");
//         setMessage("");
//         setIsEditing(false);

//     };


//     // ===============================
//     // UPDATE PROFILE
//     // ===============================

//     const handleSave = async () => {

//         if (!fullName.trim()) {

//             setMessage("Full name is required");
//             return;

//         }

//         try {

//             setSaving(true);
//             setMessage("");

//             const token = localStorage.getItem("token");

//             const response = await fetch(
//                 "http://localhost:5000/api/auth/profile",
//                 {
//                     method: "PUT",

//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },

//                     body: JSON.stringify({
//                         fullName: fullName.trim()
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {

//                 setMessage(
//                     data.message ||
//                     "Unable to update profile"
//                 );

//                 return;

//             }


//             // Update state
//             setUser(data.user);

//             setFullName(data.user.fullName);


//             // Update localStorage
//             localStorage.setItem(
//                 "user",
//                 JSON.stringify(data.user)
//             );


//             setMessage(data.message);
//             setIsEditing(false);

//         } catch (error) {

//             console.log(
//                 "Profile update error:",
//                 error
//             );

//             setMessage(
//                 "Unable to connect to server"
//             );

//         } finally {

//             setSaving(false);

//         }
//     };


//     // ===============================
//     // LOADING
//     // ===============================

//     if (loading) {

//         return (
//             <div className="profile-page">
//                 <p>Loading profile...</p>
//             </div>
//         );

//     }


//     // ===============================
//     // ERROR
//     // ===============================

//     if (error) {

//         return (
//             <div className="profile-page">
//                 <p>{error}</p>
//             </div>
//         );

//     }


//     return (
//         <div className="profile-page">

//             <div className="profile-header">

//                 <div>
//                     <h1>
//                         My Profile
//                     </h1>

//                     <p>
//                         View and manage your account information
//                     </p>
//                 </div>

//             </div>


//             <div className="profile-card">

//                 {/* ===============================
//                     AVATAR
//                 =============================== */}

//                 <div className="profile-avatar">

//                     {user?.fullName
//                         ?.charAt(0)
//                         .toUpperCase()}

//                 </div>


//                 {/* ===============================
//                     PROFILE DETAILS
//                 =============================== */}

//                 <div className="profile-details">

//                     {/* FULL NAME */}

//                     <div className="profile-field">

//                         <span>
//                             Full Name
//                         </span>

//                         {isEditing ? (

//                             <input
//                                 type="text"
//                                 value={fullName}
//                                 onChange={(e) =>
//                                     setFullName(e.target.value)
//                                 }
//                                 className="profile-input"
//                                 placeholder="Enter your full name"
//                             />

//                         ) : (

//                             <strong>
//                                 {user?.fullName ||
//                                     "Not available"}
//                             </strong>

//                         )}

//                     </div>


//                     {/* EMAIL */}

//                     <div className="profile-field">

//                         <span>
//                             Email Address
//                         </span>

//                         <strong>
//                             {user?.email ||
//                                 "Not available"}
//                         </strong>

//                     </div>


//                     {/* ROLE */}

//                     <div className="profile-field">

//                         <span>
//                             Account Role
//                         </span>

//                         <strong className="role-badge">

//                             {user?.role ||
//                                 "student"}

//                         </strong>

//                     </div>


//                     {/* STATUS */}

//                     <div className="profile-field">

//                         <span>
//                             Account Status
//                         </span>

//                         <strong className="status-badge">
//                             Active
//                         </strong>

//                     </div>


//                     {/* ===============================
//                         BUTTONS
//                     =============================== */}

//                     <div className="profile-actions">

//                         {isEditing ? (

//                             <>

//                                 <button
//                                     className="save-profile-btn"
//                                     onClick={handleSave}
//                                     disabled={saving}
//                                 >
//                                     {saving
//                                         ? "Saving..."
//                                         : "Save Changes"}
//                                 </button>


//                                 <button
//                                     className="cancel-profile-btn"
//                                     onClick={handleCancel}
//                                     disabled={saving}
//                                 >
//                                     Cancel
//                                 </button>

//                             </>

//                         ) : (

//                             <button
//                                 className="edit-profile-btn"
//                                 onClick={handleEdit}
//                             >
//                                 Edit Profile
//                             </button>

//                         )}

//                     </div>


//                     {/* ===============================
//                         MESSAGE
//                     =============================== */}

//                     {message && (

//                         <p className="profile-message">
//                             {message}
//                         </p>

//                     )}

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default StudentProfile;




import { useEffect, useState } from "react";
import "./StudentProfile.css";

function StudentProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    // EDIT FIELDS
    const [fullName, setFullName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [course, setCourse] = useState("");
    const [branch, setBranch] = useState("");
    const [semester, setSemester] = useState("");
    const [rollNumber, setRollNumber] = useState("");

    // PROFILE PHOTO
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [photoMessage, setPhotoMessage] = useState("");

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // CHANGE PASSWORD
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");

    // ==========================================
    // FETCH PROFILE
    // ==========================================

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login first");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    const storedUser =
                        JSON.parse(localStorage.getItem("user")) || {};

                    const profileUser = {
                        ...storedUser,
                        ...data.user
                    };

                    setUser(profileUser);

                    setFullName(profileUser.fullName || "");
                    setContactNumber(profileUser.contactNumber || "");
                    setCourse(profileUser.course || "");
                    setBranch(profileUser.branch || "");

                    setSemester(
                        profileUser.semester !== null &&
                        profileUser.semester !== undefined
                            ? profileUser.semester
                            : ""
                    );

                    setRollNumber(profileUser.rollNumber || "");

                    localStorage.setItem(
                        "user",
                        JSON.stringify(profileUser)
                    );
                } else {
                    setError(
                        data.message ||
                        "Unable to load profile"
                    );
                }

            } catch (error) {

                console.log(
                    "Profile fetch error:",
                    error
                );

                setError(
                    "Unable to connect to server"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProfile();
    }, []);

    // ==========================================
    // SELECT PROFILE PHOTO
    // ==========================================

    const handlePhotoSelect = (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Check image type
        if (!file.type.startsWith("image/")) {

            setPhotoMessage(
                "Please select an image file"
            );

            return;
        }

        // Check file size - 5MB
        if (file.size > 5 * 1024 * 1024) {

            setPhotoMessage(
                "Profile photo must be less than 5MB"
            );

            return;
        }

        setSelectedPhoto(file);
        setPhotoMessage("");
    };

    // ==========================================
    // UPLOAD PROFILE PHOTO
    // ==========================================

    const handleUploadPhoto = async () => {

        if (!selectedPhoto) {

            setPhotoMessage(
                "Please select a photo first"
            );

            return;
        }

        try {

            setUploadingPhoto(true);
            setPhotoMessage("");

            const token =
                localStorage.getItem("token");

            const formData = new FormData();

            formData.append(
                "profilePhoto",
                selectedPhoto
            );

            const response = await fetch(
                "http://localhost:5000/api/auth/profile/photo",
                {
                    method: "PUT",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    },

                    body: formData
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                setPhotoMessage(
                    data.message ||
                    "Unable to upload profile photo"
                );

                return;
            }

            // Update user
            setUser(data.user);

            // Update local storage
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setSelectedPhoto(null);

            setPhotoMessage(
                "Profile photo uploaded successfully"
            );

        } catch (error) {

            console.log(
                "Profile photo upload error:",
                error
            );

            setPhotoMessage(
                "Unable to connect to server"
            );

        } finally {

            setUploadingPhoto(false);

        }
    };

    // ==========================================
    // START EDITING
    // ==========================================

    const handleEdit = () => {

        setFullName(
            user?.fullName || ""
        );

        setContactNumber(
            user?.contactNumber || ""
        );

        setCourse(
            user?.course || ""
        );

        setBranch(
            user?.branch || ""
        );

        setSemester(
            user?.semester !== null &&
            user?.semester !== undefined
                ? user.semester
                : ""
        );

        setRollNumber(
            user?.rollNumber || ""
        );

        setMessage("");
        setIsEditing(true);
    };

    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const handleCancel = () => {

        setFullName(
            user?.fullName || ""
        );

        setContactNumber(
            user?.contactNumber || ""
        );

        setCourse(
            user?.course || ""
        );

        setBranch(
            user?.branch || ""
        );

        setSemester(
            user?.semester !== null &&
            user?.semester !== undefined
                ? user.semester
                : ""
        );

        setRollNumber(
            user?.rollNumber || ""
        );

        setMessage("");
        setIsEditing(false);
    };

    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    const handleSave = async () => {

        if (!fullName.trim()) {

            setMessage(
                "Full name is required"
            );

            return;
        }

        if (
            semester !== "" &&
            (!Number.isInteger(Number(semester)) ||
                Number(semester) < 1)
        ) {

            setMessage(
                "Semester must be a valid number"
            );

            return;
        }

        try {

            setSaving(true);
            setMessage("");

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/auth/profile",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        fullName:
                            fullName.trim(),

                        contactNumber:
                            contactNumber.trim(),

                        course:
                            course.trim(),

                        branch:
                            branch.trim(),

                        semester:
                            semester === ""
                                ? null
                                : Number(semester),

                        rollNumber:
                            rollNumber.trim()

                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                setMessage(
                    data.message ||
                    "Unable to update profile"
                );

                return;
            }

            setUser(data.user);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setMessage(
                data.message ||
                "Profile updated successfully"
            );

            setIsEditing(false);

        } catch (error) {

            console.log(
                "Profile update error:",
                error
            );

            setMessage(
                "Unable to connect to server"
            );

        } finally {

            setSaving(false);

        }
    };

    // ==========================================
    // CHANGE PASSWORD
    // ==========================================

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordMessage("Please fill all password fields");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage("New password must be at least 6 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage("New password and confirm password do not match");
            return;
        }

        try {
            setChangingPassword(true);
            setPasswordMessage("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/auth/change-password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setPasswordMessage(
                    data.message || "Unable to change password"
                );
                return;
            }

            setPasswordMessage(
                data.message || "Password changed successfully"
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setIsChangingPassword(false);

        } catch (error) {
            console.log("Change password error:", error);
            setPasswordMessage("Unable to connect to server");
        } finally {
            setChangingPassword(false);
        }
    };

    const handleCancelPasswordChange = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMessage("");
        setIsChangingPassword(false);
    };

    // ==========================================
    // DATE FORMAT
    // ==========================================

    const formatDate = (date) => {

        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    // ==========================================
    // DATE + TIME FORMAT
    // ==========================================

    const formatDateTime = (date) => {

        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };

    // ==========================================
    // PROFILE COMPLETION
    // ==========================================

    const profileFields = [
        user?.fullName,
        user?.email,
        user?.contactNumber,
        user?.course,
        user?.branch,
        user?.semester,
        user?.rollNumber
    ];

    const completedFields =
        profileFields.filter(
            (field) =>
                field !== undefined &&
                field !== null &&
                String(field).trim() !== ""
        ).length;

    const profileCompletion = Math.round(
        (completedFields /
            profileFields.length) *
            100
    );

    // ==========================================
    // AVATAR LETTER
    // ==========================================

    const avatarLetter =
        user?.fullName
            ?.charAt(0)
            .toUpperCase() || "S";

    // ==========================================
    // PROFILE PHOTO URL
    // ==========================================

    const profilePhotoUrl =
        user?.profilePhoto
            ? `http://localhost:5000${user.profilePhoto}`
            : "";

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="profile-page">

                <div className="profile-loading">

                    <div className="profile-spinner"></div>

                    <p>
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (
            <div className="profile-page">

                <div className="profile-error">

                    <div className="error-icon">
                        !
                    </div>

                    <h3>
                        Unable to Load Profile
                    </h3>

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div className="profile-page">

            {/* ==========================================
                SUCCESS MESSAGE
            ========================================== */}

            {message && !isEditing && (

                <div className="profile-message">

                    <span>
                        ✓
                    </span>

                    {message}

                </div>

            )}

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="profile-header">

                <div>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        View and manage your account information
                    </p>

                </div>

            </div>


            {/* ==========================================
                PROFILE HERO
            ========================================== */}

            <div className="profile-hero">

                <div className="profile-hero-left">

                    {/* PROFILE PHOTO */}

                    <div className="profile-avatar">

                        {profilePhotoUrl ? (

                            <img
                                src={profilePhotoUrl}
                                alt="Profile"
                                className="profile-avatar-image"
                            />

                        ) : (

                            avatarLetter

                        )}

                    </div>


                    <div className="profile-hero-info">

                        <h2>
                            {user?.fullName ||
                                "Student"}
                        </h2>

                        <p>
                            {user?.email ||
                                "Email not available"}
                        </p>

                        <div className="profile-hero-badges">

                            <span className="student-badge">
                                Student
                            </span>

                            <span className="active-badge">

                                <span className="active-dot"></span>

                                Active

                            </span>

                        </div>

                    </div>

                </div>


                {!isEditing && (

                    <button
                        className="edit-profile-btn"
                        onClick={handleEdit}
                    >
                        <span>
                            ✏️
                        </span>

                        Edit Profile

                    </button>

                )}

            </div>


            {/* ==========================================
                PROFILE PHOTO
            ========================================== */}

            <div className="profile-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Profile Photo
                        </h2>

                        <p>
                            Upload a photo for your profile
                        </p>

                    </div>

                </div>


                <div className="photo-upload-content">

                    <label
                        htmlFor="profilePhotoInput"
                        className="choose-photo-btn"
                    >
                        📷 Choose Photo
                    </label>

                    <input
                        id="profilePhotoInput"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        style={{
                            display: "none"
                        }}
                    />

                    {selectedPhoto && (

                        <button
                            className="upload-photo-btn"
                            onClick={handleUploadPhoto}
                            disabled={uploadingPhoto}
                        >
                            {uploadingPhoto
                                ? "Uploading..."
                                : "⬆️ Upload Photo"}
                        </button>

                    )}

                    <small>
                        JPG, PNG or other image format • Maximum 5MB
                    </small>

                    {selectedPhoto && (
                        <small>
                            Selected: {selectedPhoto.name}
                        </small>
                    )}

                    {photoMessage && (

                        <div className="photo-message">
                            {photoMessage}
                        </div>

                    )}

                </div>

            </div>


            {/* ==========================================
                EDIT PROFILE
            ========================================== */}

            {isEditing ? (

                <div className="profile-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Edit Profile
                            </h2>

                            <p>
                                Update your personal and academic information
                            </p>

                        </div>

                    </div>


                    <div className="edit-profile-form">

                        {/* FULL NAME */}

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(
                                        e.target.value
                                    )
                                }
                                className="profile-input"
                                placeholder="Enter your full name"
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={
                                    user?.email || ""
                                }
                                disabled
                                className="profile-input disabled-input"
                            />

                            <small>
                                Email address cannot be changed from this profile.
                            </small>

                        </div>


                        {/* CONTACT NUMBER */}

                        <div className="form-group">

                            <label>
                                Contact Number
                            </label>

                            <input
                                type="tel"
                                value={contactNumber}
                                onChange={(e) =>
                                    setContactNumber(
                                        e.target.value
                                    )
                                }
                                className="profile-input"
                                placeholder="Enter contact number"
                            />

                        </div>


                        {/* COURSE */}

                        <div className="form-group">

                            <label>
                                Course
                            </label>

                            <input
                                type="text"
                                value={course}
                                onChange={(e) =>
                                    setCourse(
                                        e.target.value
                                    )
                                }
                                className="profile-input"
                                placeholder="Enter your course"
                            />

                        </div>


                        {/* BRANCH */}

                        <div className="form-group">

                            <label>
                                Branch
                            </label>

                            <input
                                type="text"
                                value={branch}
                                onChange={(e) =>
                                    setBranch(
                                        e.target.value
                                    )
                                }
                                className="profile-input"
                                placeholder="Enter your branch"
                            />

                        </div>


                        {/* SEMESTER */}

                        <div className="form-group">

                            <label>
                                Semester
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={semester}
                                onChange={(e) =>
                                    setSemester(
                                        e.target.value
                                    )
                                }
                                className="profile-input"
                                placeholder="Enter semester"
                            />

                        </div>


                        {/* ROLL NUMBER */}

                        <div className="form-group">

                            <label>
                                Roll Number
                            </label>

                            <input
                                type="text"
                                value={rollNumber}
                                onChange={(e) =>
                                    setRollNumber(
                                        e.target.value
                                    )
                                }
                                className="profile-input"
                                placeholder="Enter roll number"
                            />

                        </div>


                        {/* MESSAGE */}

                        {message && (

                            <div className="profile-edit-message">
                                {message}
                            </div>

                        )}


                        {/* ACTIONS */}

                        <div className="edit-actions">

                            <button
                                className="save-profile-btn"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "✓ Save Changes"}
                            </button>

                            <button
                                className="cancel-profile-btn"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            ) : (

                <>

                    {/* ==========================================
                        PERSONAL INFORMATION
                    ========================================== */}

                    <div className="profile-section">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Personal Information
                                </h2>

                                <p>
                                    Your personal account information
                                </p>

                            </div>

                        </div>


                        <div className="profile-info-grid">

                            <div className="info-item">

                                <div className="info-icon">
                                    👤
                                </div>

                                <div>

                                    <span>
                                        Full Name
                                    </span>

                                    <strong>
                                        {user?.fullName ||
                                            "Not available"}
                                    </strong>

                                </div>

                            </div>


                            <div className="info-item">

                                <div className="info-icon">
                                    ✉️
                                </div>

                                <div>

                                    <span>
                                        Email Address
                                    </span>

                                    <strong>
                                        {user?.email ||
                                            "Not available"}
                                    </strong>

                                </div>

                            </div>


                            <div className="info-item">

                                <div className="info-icon">
                                    📱
                                </div>

                                <div>

                                    <span>
                                        Contact Number
                                    </span>

                                    <strong>
                                        {user?.contactNumber ||
                                            "Not available"}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        ACADEMIC INFORMATION
                    ========================================== */}

                    <div className="profile-section">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Academic Information
                                </h2>

                                <p>
                                    Your college and academic details
                                </p>

                            </div>

                        </div>


                        <div className="profile-info-grid">

                            <div className="info-item">

                                <div className="info-icon">
                                    🎓
                                </div>

                                <div>

                                    <span>
                                        Course
                                    </span>

                                    <strong>
                                        {user?.course ||
                                            "Not available"}
                                    </strong>

                                </div>

                            </div>


                            <div className="info-item">

                                <div className="info-icon">
                                    💻
                                </div>

                                <div>

                                    <span>
                                        Branch
                                    </span>

                                    <strong>
                                        {user?.branch ||
                                            "Not available"}
                                    </strong>

                                </div>

                            </div>


                            <div className="info-item">

                                <div className="info-icon">
                                    📚
                                </div>

                                <div>

                                    <span>
                                        Semester
                                    </span>

                                    <strong>
                                        {user?.semester ||
                                            "Not available"}
                                    </strong>

                                </div>

                            </div>


                            <div className="info-item">

                                <div className="info-icon">
                                    🪪
                                </div>

                                <div>

                                    <span>
                                        Roll Number
                                    </span>

                                    <strong>
                                        {user?.rollNumber ||
                                            "Not available"}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        PROFILE COMPLETION
                    ========================================== */}

                    <div className="profile-section">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Profile Completion
                                </h2>

                                <p>
                                    Complete your profile information
                                </p>

                            </div>

                            <strong className="completion-percentage">
                                {profileCompletion}%
                            </strong>

                        </div>


                        <div className="completion-bar-container">

                            <div className="completion-bar">

                                <div
                                    className="completion-bar-fill"
                                    style={{
                                        width:
                                            `${profileCompletion}%`
                                    }}
                                ></div>

                            </div>

                        </div>


                        <p className="completion-text">

                            {profileCompletion === 100
                                ? "Your profile is complete."
                                : "Add the missing information to complete your profile."}

                        </p>

                    </div>


                    {/* ==========================================
                        SECURITY
                    ========================================== */}

                    <div className="profile-section">

                        <div className="section-header">

                            <div>
                                <h2>
                                    Security
                                </h2>

                                <p>
                                    Manage your account password and security
                                </p>
                            </div>

                            {!isChangingPassword && (
                                <button
                                    className="change-password-btn"
                                    onClick={() => {
                                        setPasswordMessage("");
                                        setIsChangingPassword(true);
                                    }}
                                >
                                    🔐 Change Password
                                </button>
                            )}

                        </div>

                        {passwordMessage && (
                            <div className="password-message">
                                {passwordMessage}
                            </div>
                        )}

                        {isChangingPassword ? (

                            <div className="change-password-form">

                                <div className="form-group">

                                    <label>
                                        Current Password
                                    </label>

                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        className="profile-input"
                                        placeholder="Enter current password"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        className="profile-input"
                                        placeholder="Enter new password"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Confirm New Password
                                    </label>

                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        className="profile-input"
                                        placeholder="Confirm new password"
                                    />

                                </div>

                                <small>
                                    Password must be at least 6 characters.
                                </small>

                                <div className="edit-actions">

                                    <button
                                        className="save-profile-btn"
                                        onClick={handleChangePassword}
                                        disabled={changingPassword}
                                    >
                                        {changingPassword
                                            ? "Changing..."
                                            : "✓ Change Password"}
                                    </button>

                                    <button
                                        className="cancel-profile-btn"
                                        onClick={handleCancelPasswordChange}
                                        disabled={changingPassword}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        ) : (

                            <div className="security-info">

                                <div className="security-info-icon">
                                    🔒
                                </div>

                                <div>
                                    <strong>
                                        Password
                                    </strong>

                                    <p>
                                        Your password is securely protected.
                                        Use Change Password to update it.
                                    </p>
                                </div>

                            </div>

                        )}

                    </div>


                    {/* ==========================================
                        ACCOUNT INFORMATION
                    ========================================== */}

                    <div className="profile-section">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Account Information
                                </h2>

                                <p>
                                    Your account and access details
                                </p>

                            </div>

                        </div>


                        <div className="profile-info-grid">

                            <div className="info-item">

                                <div className="info-icon">
                                    🛡️
                                </div>

                                <div>

                                    <span>
                                        Account Role
                                    </span>

                                    <strong className="role-badge">

                                        {user?.role
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            user?.role
                                                ?.slice(1) ||
                                            "Student"}

                                    </strong>

                                </div>

                            </div>


                            <div className="info-item">

                                <div className="info-icon">
                                    ✓
                                </div>

                                <div>

                                    <span>
                                        Account Status
                                    </span>

                                    <strong className="status-badge">

                                        <span className="active-dot"></span>

                                        Active

                                    </strong>

                                </div>

                            </div>


                            <div className="info-item">

                                <div className="info-icon">
                                    📅
                                </div>

                                <div>

                                    <span>
                                        Account Created
                                    </span>

                                    <strong>
                                        {formatDate(
                                            user?.createdAt
                                        )}
                                    </strong>

                                </div>

                            </div>


                            <div className="info-item">

                                <div className="info-icon">
                                    🕐
                                </div>

                                <div>

                                    <span>
                                        Last Login
                                    </span>

                                    <strong>
                                        {formatDateTime(
                                            user?.lastLogin
                                        )}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
}

export default StudentProfile;

