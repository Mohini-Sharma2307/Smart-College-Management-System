import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfessionalAlert from "./ProfessionalAlert";
import "./StudentRegistration.css";

function StudentRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    type: "warning",
    title: "",
    message: "",
  });

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      message: "",
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
      message,
    });
  };

  // ==========================================
  // HANDLE REGISTRATION
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==========================================
    // CLEAN INPUT
    // ==========================================

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();

    // ==========================================
    // NAME VALIDATION
    // ==========================================

    if (fullName.length < 3) {
      showAlert(
        "warning",
        "Invalid Name",
        "Please enter your full name with at least 3 characters.",
      );

      return;
    }

    // ==========================================
    // PASSWORD LENGTH
    // ==========================================

    if (formData.password.length < 8) {
      showAlert(
        "warning",
        "Password is too short",
        "Your password must contain at least 8 characters.",
      );

      return;
    }

    // ==========================================
    // PASSWORD STRENGTH
    // ==========================================

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      showAlert(
        "warning",
        "Create a stronger password",
        "Use at least 8 characters with letters, numbers and a special character.",
      );

      return;
    }

    // ==========================================
    // START LOADING
    // ==========================================

    setLoading(true);

    try {
      // ==========================================
      // REGISTER API
      // ==========================================

      const response = await fetch("https://smart-college-management-backend.onrender.com/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullName,
          email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      // ==========================================
      // REGISTRATION SUCCESS
      // ==========================================

      if (response.ok) {
        // ==========================================
        // CHECK TOKEN AND USER
        // ==========================================

        if (!data.token || !data.user) {
          showAlert(
            "error",
            "Registration Error",
            "Account was created, but your login session could not be established. Please try logging in.",
          );

          return;
        }

        // ==========================================
        // SAVE JWT TOKEN
        // ==========================================

        localStorage.setItem("token", data.token);

        // ==========================================
        // SAVE USER DATA
        // ==========================================

        localStorage.setItem("user", JSON.stringify(data.user));

        // ==========================================
        // CLEAR FORM
        // ==========================================

        setFormData({
          fullName: "",
          email: "",
          password: "",
        });

        // ==========================================
        // SUCCESS ALERT
        // ==========================================

        showAlert(
          "success",
          "Registration Successful",
          "Your student account has been created successfully. You will be redirected to your dashboard.",
        );

        // ==========================================
        // REDIRECT TO STUDENT DASHBOARD
        // ==========================================

        setTimeout(() => {
          navigate("/student-dashboard");
        }, 1800);
      }

      // ==========================================
      // SERVER ERROR
      // ==========================================
      else {
        showAlert(
          "error",
          "Registration Failed",
          data.message || "Unable to create your account. Please try again.",
        );
      }
    } catch (error) {
      console.log("Registration error:", error);

      // ==========================================
      // CONNECTION ERROR
      // ==========================================

      showAlert(
        "error",
        "Connection Error",
        "Unable to connect to the server. Please make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="registration-page">
      <div className="registration-container">
        {/* ==========================================
                    LEFT SECTION
                ========================================== */}

        <div className="registration-left">
          <div className="college-logo">
            {/* SC */}

            <img
              src="https://play-lh.googleusercontent.com/v5K9HtnaVZmvH-iSr6jvmitTFbIFgiVnRus46PBU8iY8v3GSm9LweehYHea8oQ4wA39JXyF6LBxEcCPO7gC_pQ"
              alt="logo"
            />
          </div>
          <h2>
            Smart College
            <br />
            Management System
          </h2>

          <p>
            Manage your college journey from one simple and secure platform.
          </p>

          <div className="registration-features">
            <div className="feature">
              <div className="feature-icon">✓</div>

              <span>Manage your academic information</span>
            </div>

            <div className="feature">
              <div className="feature-icon">✓</div>

              <span>Access results and examination details</span>
            </div>

            <div className="feature">
              <div className="feature-icon">✓</div>

              <span>Stay updated with college notices</span>
            </div>
          </div>
        </div>

        {/* ==========================================
                    RIGHT SECTION
                ========================================== */}

        <div className="registration-right">
          <h1>Create Account</h1>

          <p className="registration-subtitle">
            Register as a student to continue
          </p>

          <form onSubmit={handleSubmit}>
            {/* ==========================================
                            FULL NAME
                        ========================================== */}

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>

              <div className="input-wrapper">
                <span className="input-icon">👤</span>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* ==========================================
                            EMAIL
                        ========================================== */}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

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
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <small className="password-hint">
                Use 8+ characters with letters, numbers and a special character.
              </small>
            </div>

            {/* ==========================================
                            REGISTER BUTTON
                        ========================================== */}

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* ==========================================
                        LOGIN LINK
                    ========================================== */}

          <p className="login-text">
            Already have an account?
            <span
              onClick={() => navigate("/student-login")}
              style={{
                cursor: "pointer",
              }}
            >
              {" "}
              Login
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

export default StudentRegistration;

