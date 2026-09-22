
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfessionalAlert from "./ProfessionalAlert";
import "./StudentLogin.css";

function StudentLogin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // ==========================================
    // PROFESSIONAL ALERT STATE
    // ==========================================

    const [alert, setAlert] = useState({
        show: false,
        type: "warning",
        title: "",
        message: ""
    });

    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // ==========================================
    // CLOSE ALERT
    // ==========================================

    const closeAlert = () => {

        setAlert({
            show: false,
            type: "warning",
            title: "",
            message: ""
        });

    };

    // ==========================================
    // SHOW ALERT
    // ==========================================

    const showAlert = (type, title, message) => {

        setAlert({
            show: true,
            type,
            title,
            message
        });

    };

    // ==========================================
    // HANDLE LOGIN
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const email = formData.email.trim().toLowerCase();

        // ==========================================
        // BASIC VALIDATION
        // ==========================================

        if (!email || !formData.password) {

            showAlert(
                "warning",
                "Missing Information",
                "Please enter your email address and password."
            );

            return;
        }

        setLoading(true);

        try {

            // ==========================================
            // LOGIN API
            // ==========================================

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            // ==========================================
            // LOGIN SUCCESS
            // ==========================================

            if (response.ok) {

                // ==========================================
                // CHECK TOKEN
                // ==========================================

                if (!data.token || !data.user) {

                    showAlert(
                        "error",
                        "Login Error",
                        "Login was successful, but your session could not be created. Please try again."
                    );

                    return;
                }

                // ==========================================
                // SAVE JWT TOKEN
                // ==========================================

                localStorage.setItem(
                    "token",
                    data.token
                );

                // ==========================================
                // SAVE USER DATA
                // ==========================================

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                // ==========================================
                // REDIRECT TO DASHBOARD
                // ==========================================

                navigate("/student-dashboard");

            }

            // ==========================================
            // LOGIN FAILED
            // ==========================================

            else {

                showAlert(
                    "error",
                    "Login Failed",
                    data.message ||
                        "Invalid email or password. Please check your credentials and try again."
                );

            }

        } catch (error) {

            console.log(
                "Login error:",
                error
            );

            // ==========================================
            // CONNECTION ERROR
            // ==========================================

            showAlert(
                "error",
                "Connection Error",
                "Unable to connect to the server. Please make sure the backend server is running."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // JSX
    // ==========================================

    return (

        <div className="login-page">

            <div className="login-container">

                {/* ==========================================
                    LEFT SECTION
                ========================================== */}

                <div className="login-left">

                    <div className="college-logo">
                        {/* SC */}
                         <img src="https://play-lh.googleusercontent.com/v5K9HtnaVZmvH-iSr6jvmitTFbIFgiVnRus46PBU8iY8v3GSm9LweehYHea8oQ4wA39JXyF6LBxEcCPO7gC_pQ" alt="logo" />
                    </div>

                    <h2>
                        Smart College
                        <br />
                        Management System
                    </h2>

                    <p>
                        One secure platform to manage your
                        academic journey, results, fees and
                        college activities.
                    </p>


                    <div className="login-features">

                        <div className="login-feature">

                            <span>
                                ✓
                            </span>

                            <p>
                                Manage your academic information
                            </p>

                        </div>


                        <div className="login-feature">

                            <span>
                                ✓
                            </span>

                            <p>
                                Access results and examination details
                            </p>

                        </div>


                        <div className="login-feature">

                            <span>
                                ✓
                            </span>

                            <p>
                                Stay updated with college notices
                            </p>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    RIGHT SECTION
                ========================================== */}

                <div className="login-right">

                    <h1>
                        Welcome Back!
                    </h1>

                    <p className="login-subtitle">
                        Login to your student account
                    </p>


                    <form onSubmit={handleSubmit}>

                        {/* ==========================================
                            EMAIL
                        ========================================== */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ✉
                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />

                            </div>

                        </div>


                        {/* ==========================================
                            PASSWORD
                        ========================================== */}

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
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


                        {/* ==========================================
                            REMEMBER + FORGOT
                        ========================================== */}

                        <div className="login-options">

                            <label className="remember-me">

                                <input
                                    type="checkbox"
                                />

                                <span>
                                    Remember me
                                </span>

                            </label>


                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() =>
                                    showAlert(
                                        "info",
                                        "Forgot Password",
                                        "Password reset functionality will be available soon."
                                    )
                                }
                            >
                                Forgot Password?
                            </button>

                        </div>


                        {/* ==========================================
                            LOGIN BUTTON
                        ========================================== */}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"}

                        </button>

                    </form>


                    {/* ==========================================
                        REGISTER
                    ========================================== */}

                    <p className="register-text">

                        Don't have an account?

                        <span
                            onClick={() =>
                                navigate("/register")
                            }
                            style={{
                                cursor: "pointer"
                            }}
                        >
                            {" "}Create Account
                        </span>

                    </p>

                </div>

            </div>


            {/* ==========================================
                PROFESSIONAL ALERT
            ========================================== */}

            <ProfessionalAlert
                show={alert.show}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={closeAlert}
            />

        </div>
    );
}

export default StudentLogin;