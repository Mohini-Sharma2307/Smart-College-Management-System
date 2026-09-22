import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./LoginSelection.css";

function LoginSelection() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const scrollToLogin = () => {
        document.getElementById("services")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <div className="login-selection-page">

            {/* ==========================================
                NAVBAR
            ========================================== */}

            <header className="login-navbar">
                <div className="login-navbar-inner">

                    {/* BRAND */}

                    <div className="college-brand">
                        <div className="college-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/v5K9HtnaVZmvH-iSr6jvmitTFbIFgiVnRus46PBU8iY8v3GSm9LweehYHea8oQ4wA39JXyF6LBxEcCPO7gC_pQ"
                                alt="Smart College Logo"
                            />
                        </div>

                        <div className="college-brand-text">
                            <strong>Smart College</strong>

                            <span>
                                College Management System
                            </span>
                        </div>
                    </div>


                    {/* NAVIGATION */}

                    <nav className="login-nav-links">

                        <a
                            href="#home"
                            className="active"
                        >
                            Home
                        </a>

                        <a href="#about">
                            About
                        </a>

                        <a href="#services">
                            Services
                        </a>

                        <a href="#features">
                            Features
                        </a>

                        <a href="#placement">
                            Placement
                        </a>

                    </nav>


                    {/* RIGHT NAV ACTIONS */}

                    <div className="navbar-actions">

                        {/* THEME TOGGLE */}

                        <button
                            type="button"
                            className="theme-toggle"
                            onClick={toggleTheme}
                            title={
                                theme === "light"
                                    ? "Switch to dark mode"
                                    : "Switch to light mode"
                            }
                            aria-label="Toggle dark and light mode"
                        >
                            <span>
                                {theme === "light" ? "🌙" : "☀️"}
                            </span>
                        </button>


                        {/* LOGIN BUTTON */}

                        <button
                            type="button"
                            className="navbar-login-btn"
                            onClick={scrollToLogin}
                        >
                            Login
                            <span>→</span>
                        </button>

                    </div>

                </div>
            </header>


            {/* ==========================================
                MAIN HERO
            ========================================== */}

            <main
                className="login-main"
                id="home"
            >
                <div className="login-main-container">

                    {/* ==========================================
                        LEFT CONTENT
                    ========================================== */}

                    <section
                        className="login-intro"
                        id="about"
                    >

                        <span className="login-label">
                            WELCOME TO SMART COLLEGE
                        </span>

                        <h1>
                            Your college life,
                            <span>
                                managed smarter.
                            </span>
                        </h1>

                        <p>
                            Access academics, examinations, attendance,
                            fees, notices and essential college services
                            from one secure platform.
                        </p>


                        {/* HIGHLIGHTS */}

                        <div className="login-highlights">

                            <div className="highlight-item">

                                <span className="highlight-icon">
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Secure Access
                                    </strong>

                                    <small>
                                        Protected college portal
                                    </small>
                                </div>

                            </div>


                            <div className="highlight-item">

                                <span className="highlight-icon">
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Easy Management
                                    </strong>

                                    <small>
                                        Everything in one place
                                    </small>
                                </div>

                            </div>


                            <div className="highlight-item">

                                <span className="highlight-icon">
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Quick Access
                                    </strong>

                                    <small>
                                        Access everything faster
                                    </small>
                                </div>

                            </div>

                        </div>

                    </section>


                    {/* ==========================================
                        LOGIN CARD
                    ========================================== */}

                    <section
                        className="login-selection-card"
                        id="services"
                    >

                        <div className="login-card-header">

                            <div className="login-card-icon">
                                <img
                                    src="https://play-lh.googleusercontent.com/v5K9HtnaVZmvH-iSr6jvmitTFbIFgiVnRus46PBU8iY8v3GSm9LweehYHea8oQ4wA39JXyF6LBxEcCPO7gC_pQ"
                                    alt="Smart College Logo"
                                />
                            </div>

                            <div>

                                <span>
                                    SECURE PORTAL
                                </span>

                                <h2>
                                    Choose your account
                                </h2>

                            </div>

                        </div>


                        <p className="login-selection-text">
                            Select the portal you want to access.
                        </p>


                        {/* LOGIN OPTIONS */}

                        <div className="login-options">

                            {/* STUDENT LOGIN */}

                            <button
                                type="button"
                                className="login-option student-option"
                                onClick={() =>
                                    navigate("/student-login")
                                }
                            >

                                <span className="login-option-icon">
                                    🎓
                                </span>

                                <span className="login-option-content">

                                    <strong>
                                        Student Login
                                    </strong>

                                    <small>
                                        Access your dashboard, academics
                                        and college services.
                                    </small>

                                </span>

                                <span className="login-arrow">
                                    →
                                </span>

                            </button>


                            {/* ADMIN LOGIN */}

                            <button
                                type="button"
                                className="login-option admin-option"
                                onClick={() =>
                                    navigate("/admin-login")
                                }
                            >

                                <span className="login-option-icon">
                                    🛡️
                                </span>

                                <span className="login-option-content">

                                    <strong>
                                        Admin Login
                                    </strong>

                                    <small>
                                        Manage students, academics,
                                        fees and college operations.
                                    </small>

                                </span>

                                <span className="login-arrow">
                                    →
                                </span>

                            </button>

                        </div>


                        {/* SECURITY */}

                        <div className="login-security">

                            <span className="security-icon">
                                🔒
                            </span>

                            <div>

                                <strong>
                                    Secure College Portal
                                </strong>

                                <small>
                                    Your account and college information
                                    are protected.
                                </small>

                            </div>

                        </div>

                    </section>

                </div>
            </main>


            {/* ==========================================
                FEATURES
            ========================================== */}

            <section
                className="login-features"
                id="features"
            >

                <div className="login-features-container">

                    <div className="login-feature">

                        <span>
                            01
                        </span>

                        <div>

                            <strong>
                                Academic Management
                            </strong>

                            <small>
                                Subjects, exams and results
                            </small>

                        </div>

                    </div>


                    <div className="login-feature">

                        <span>
                            02
                        </span>

                        <div>

                            <strong>
                                Student Services
                            </strong>

                            <small>
                                Fees, attendance and notices
                            </small>

                        </div>

                    </div>


                    {/* PLACEMENT */}

                    <div
                        className="login-feature"
                        id="placement"
                    >

                        <span>
                            03
                        </span>

                        <div>

                            <strong>
                                Placement Portal
                            </strong>

                            <small>
                                Jobs, applications, interviews and career
                            </small>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                FOOTER
            ========================================== */}

            <footer className="login-footer">

                <div className="login-footer-inner">

                    {/* FOOTER BRAND */}

                    <div className="footer-brand">

                        <div className="footer-logo">

                            <img
                                src="https://play-lh.googleusercontent.com/v5K9HtnaVZmvH-iSr6jvmitTFbIFgiVnRus46PBU8iY8v3GSm9LweehYHea8oQ4wA39JXyF6LBxEcCPO7gC_pQ"
                                alt="Smart College Logo"
                            />

                        </div>

                        <div>

                            <strong>
                                Smart College
                            </strong>

                            <span>
                                College Management System
                            </span>

                        </div>

                    </div>


                    {/* COPYRIGHT */}

                    <span className="footer-copy">
                        © 2026 Smart College. All rights reserved.
                    </span>


                    {/* TAGLINE */}

                    <span className="footer-tagline">
                        Secure • Simple • Smart
                    </span>

                </div>

            </footer>

        </div>
    );
}

export default LoginSelection;

