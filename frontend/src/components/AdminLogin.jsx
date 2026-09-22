import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "https://smart-college-management-backend.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                if (data.user.role !== "admin") {
                    setMessage(
                        "Access denied. Admin account required."
                    );
                    return;
                }

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                navigate("/admin-dashboard");
            } else {
                setMessage(
                    data.message ||
                    "Invalid email or password"
                );
            }

        } catch (error) {
            console.log(
                "Admin login error:",
                error
            );

            setMessage(
                "Unable to connect to server"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">

            <div className="admin-login-container">

                {/* ==========================================
                    LEFT SECTION
                ========================================== */}

                <div className="admin-login-left">

                    <div className="admin-brand">

                        <div className="admin-logo">
                            {/* SC */}
                            <img src="https://play-lh.googleusercontent.com/v5K9HtnaVZmvH-iSr6jvmitTFbIFgiVnRus46PBU8iY8v3GSm9LweehYHea8oQ4wA39JXyF6LBxEcCPO7gC_pQ" alt="logo" />
                        </div>

                        <div>
                            <h2>Smart College</h2>

                            <span>
                                Management System
                            </span>
                        </div>

                    </div>


                    <div className="admin-left-content">

                        <span className="admin-badge">
                            ADMINISTRATION PORTAL
                        </span>

                        <h1>
                            Manage your college
                            <br />
                            <span>smarter.</span>
                        </h1>

                        <p>
                            Access the administration panel to
                            manage students, academics, fees,
                            examinations and college operations.
                        </p>

                    </div>


                    {/* ==========================================
                        FEATURES
                    ========================================== */}

                    <div className="admin-features">

                        <div className="admin-feature">

                            <div className="admin-feature-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Student Management
                                </strong>

                                <span>
                                    Manage student records and admissions
                                </span>

                            </div>

                        </div>


                        <div className="admin-feature">

                            <div className="admin-feature-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Academic Management
                                </strong>

                                <span>
                                    Manage exams, results and subjects
                                </span>

                            </div>

                        </div>


                        <div className="admin-feature">

                            <div className="admin-feature-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    College Operations
                                </strong>

                                <span>
                                    Manage fees, notices and activities
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        SECURITY NOTE
                    ========================================== */}

                    <div className="admin-security-note">

                        <span>🔒</span>

                        <p>
                            Secure access for authorized
                            administrators only.
                        </p>

                    </div>

                </div>


                {/* ==========================================
                    RIGHT SECTION
                ========================================== */}

                <div className="admin-login-right">

                    {/* ==========================================
                        FORM HEADER
                    ========================================== */}

                    <div className="admin-form-header">

                        <div className="admin-form-icon">
                            🛡️
                        </div>

                        <div>

                            <h1>
                                Admin Login
                            </h1>

                            <p>
                                Sign in to access the
                                administration panel
                            </p>

                        </div>

                    </div>


                    {/* ==========================================
                        LOGIN FORM
                    ========================================== */}

                    <form
                        className="admin-login-form"
                        onSubmit={handleSubmit}
                    >

                        {/* EMAIL */}

                        <div className="admin-login-group">

                            <label htmlFor="admin-email">
                                Email Address
                            </label>

                            <div className="admin-input-wrapper">

                                <span className="admin-input-icon">
                                    ✉
                                </span>

                                <input
                                    id="admin-email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter admin email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="admin-login-group">

                            <label htmlFor="admin-password">
                                Password
                            </label>

                            <div className="admin-input-wrapper">

                                <span className="admin-input-icon">
                                    🔒
                                </span>

                                <input
                                    id="admin-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="admin-password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* MESSAGE */}

                        {message && (
                            <div className="admin-login-message">
                                {message}
                            </div>
                        )}


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="admin-login-btn"
                            disabled={loading}
                        >

                            <span>
                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}
                            </span>

                            {!loading && (
                                <span className="admin-btn-arrow">
                                    →
                                </span>
                            )}

                        </button>

                    </form>


                    {/* ==========================================
                        BACK BUTTON
                    ========================================== */}

                    <button
                        type="button"
                        className="admin-back-btn"
                        onClick={() => navigate("/")}
                    >
                        ← Back to portal selection
                    </button>


                    {/* ==========================================
                        FOOTER
                    ========================================== */}

                    <div className="admin-login-footer">

                        <span>
                            🔒 Secure Administration Portal
                        </span>

                        <span>•</span>

                        <span>
                            Authorized Access Only
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminLogin;


