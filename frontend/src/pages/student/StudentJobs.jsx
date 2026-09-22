import { useEffect, useState } from "react";
import "./StudentJobs.css";

const StudentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    resume: "",
    coverLetter: "",
  });

  const token = localStorage.getItem("token");

  /* ==========================================
       FETCH JOBS
    ========================================== */

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("https://smart-college-management-backend.onrender.com/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setJobs(data.jobs || []);
      } else {
        setJobs([]);

        setErrorMessage(data.message || "Unable to load jobs.");
      }
    } catch (error) {
      console.error("Fetch jobs error:", error);

      setJobs([]);

      setErrorMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
       FORMAT DATE
    ========================================== */

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ==========================================
       JOB STATUS
    ========================================== */

  const getJobStatus = (job) => {
    return job.status || "Open";
  };

  /* ==========================================
       FORM CHANGE
    ========================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ==========================================
       APPLY BUTTON
    ========================================== */

  const handleApplyClick = (job) => {
    setSelectedJob(job);

    setSuccessMessage("");
    setErrorMessage("");

    setFormData({
      resume: "",
      coverLetter: "",
    });
  };

  /* ==========================================
       CLOSE MODAL
    ========================================== */

  const handleCloseModal = () => {
    if (applying) return;

    setSelectedJob(null);

    setFormData({
      resume: "",
      coverLetter: "",
    });
  };

  /* ==========================================
       SUBMIT APPLICATION
    ========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedJob) return;

    setSuccessMessage("");
    setErrorMessage("");

    try {
      setApplying(true);

      const response = await fetch(
        "https://smart-college-management-backend.onrender.com/api/job-applications/apply",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            job: selectedJob._id,
            resume: formData.resume,
            coverLetter: formData.coverLetter,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit application.");
      }

      setSelectedJob(null);

      setFormData({
        resume: "",
        coverLetter: "",
      });

      setSuccessMessage("Job application submitted successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.error("Job application error:", error);

      setErrorMessage(error.message || "Unable to submit application.");

      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    } finally {
      setApplying(false);
    }
  };

  /* ==========================================
       LOADING
    ========================================== */

  if (loading) {
    return (
      <div className="student-jobs-loading">
        <div className="student-jobs-loader"></div>

        <h3>Loading available jobs...</h3>

        <p>Please wait while we load placement opportunities.</p>
      </div>
    );
  }

  /* ==========================================
       STATS
    ========================================== */

  const totalJobs = jobs.length;

  const openJobs = jobs.filter(
    (job) => (job.status || "Open").toLowerCase() === "open",
  ).length;

  return (
    <div className="student-jobs-page">
      {/* ==========================================
                SUCCESS ALERT
            ========================================== */}

      {successMessage && (
        <div className="student-job-success-alert">
          <div className="success-alert-icon">✓</div>

          <div className="success-alert-content">
            <strong>Application Submitted</strong>

            <span>{successMessage}</span>
          </div>

          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label="Close success message"
          >
            ×
          </button>
        </div>
      )}

      {/* ==========================================
                ERROR ALERT
            ========================================== */}

      {errorMessage && (
        <div className="student-job-error-alert">
          <div className="error-alert-icon">!</div>

          <div className="error-alert-content">
            <strong>Something went wrong</strong>

            <span>{errorMessage}</span>
          </div>

          <button
            type="button"
            onClick={() => setErrorMessage("")}
            aria-label="Close error message"
          >
            ×
          </button>
        </div>
      )}

      {/* ==========================================
                PAGE HEADER
            ========================================== */}

      <div className="student-jobs-header">
        <div className="student-jobs-header-content">
          <div>
            <div className="student-jobs-breadcrumb">
              Student Portal
              <span>›</span>
              Placement
              <span>›</span>
              Jobs
            </div>

            <div className="student-jobs-badge">PLACEMENT OPPORTUNITIES</div>

            <h1>Available Jobs</h1>

            <p>
              Explore verified campus placement opportunities and discover roles
              that match your career goals.
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
                JOB STATISTICS
            ========================================== */}

      <section className="student-jobs-stats">
        <div className="student-job-stat-card">
          <div className="student-job-stat-icon blue">💼</div>

          <div>
            <span>Total Jobs</span>

            <strong>{totalJobs}</strong>
          </div>
        </div>

        <div className="student-job-stat-card">
          <div className="student-job-stat-icon green">✓</div>

          <div>
            <span>Open Jobs</span>

            <strong>{openJobs}</strong>
          </div>
        </div>

        <div className="student-job-stat-card">
          <div className="student-job-stat-icon purple">📅</div>

          <div>
            <span>Placement Drive</span>

            <strong>Campus</strong>
          </div>
        </div>
      </section>

      {/* ==========================================
                SECTION HEADING
            ========================================== */}

      <section className="student-jobs-section-header">
        <div>
          <span>OPPORTUNITIES</span>

          <h2>Explore available positions</h2>
        </div>

        <div className="student-jobs-result-count">
          <strong>{jobs.length}</strong>

          <span>{jobs.length === 1 ? "Job Available" : "Jobs Available"}</span>
        </div>
      </section>

      {/* ==========================================
                NO JOBS
            ========================================== */}

      {jobs.length === 0 ? (
        <div className="student-jobs-empty">
          <div className="student-jobs-empty-icon">💼</div>

          <h2>No Jobs Available</h2>

          <p>
            There are currently no open placement opportunities. Please check
            again later.
          </p>
        </div>
      ) : (
        /* ==========================================
                   JOB GRID
                ========================================== */

        <section className="student-jobs-grid">
          {jobs.map((job) => (
            <article className="student-job-card" key={job._id}>
              {/* COMPANY */}

              <div className="student-job-company-header">
                <div className="student-job-company">
                  <div className="student-job-icon">
                    {job.company?.logo ? (
                      <img
                        src={job.company.logo}
                        alt={job.company?.name || "Company"}
                      />
                    ) : (
                      <span>
                        {job.company?.name?.charAt(0).toUpperCase() || "C"}
                      </span>
                    )}
                  </div>

                  <div>
                    <small>COMPANY</small>

                    <strong>{job.company?.name || job.company || "-"}</strong>
                  </div>
                </div>

                <span
                  className={`student-job-status ${
                    getJobStatus(job).toLowerCase() === "open"
                      ? "open"
                      : "closed"
                  }`}
                >
                  <span className="job-status-dot"></span>

                  {getJobStatus(job)}
                </span>
              </div>

              {/* DIVIDER */}

              <div className="student-job-divider"></div>

              {/* JOB TITLE */}

              <div className="student-job-title-section">
                <h2>{job.jobTitle || "-"}</h2>

                <span>Campus Placement Role</span>
              </div>

              {/* JOB INFORMATION */}

              <div className="student-job-info">
                <div className="student-job-info-item">
                  <div className="job-info-icon">📍</div>

                  <div>
                    <small>Location</small>

                    <strong>{job.location || "-"}</strong>
                  </div>
                </div>

                <div className="student-job-info-item">
                  <div className="job-info-icon">🕐</div>

                  <div>
                    <small>Employment Type</small>

                    <strong>{job.jobType || "-"}</strong>
                  </div>
                </div>

                {job.salary && (
                  <div className="student-job-info-item">
                    <div className="job-info-icon">💰</div>

                    <div>
                      <small>Compensation</small>

                      <strong>
                        {typeof job.salary === "number"
                          ? `₹${job.salary} LPA`
                          : job.salary}
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}

              <div className="student-job-description-wrapper">
                <span>ABOUT THE ROLE</span>

                <p className="student-job-description">
                  {job.description ||
                    "Job description and role details will be available here."}
                </p>
              </div>

              {/* FOOTER */}

              <div className="student-job-footer">
                <div className="student-job-deadline">
                  <div className="deadline-icon">📅</div>

                  <div>
                    <small>APPLICATION DEADLINE</small>

                    <strong>{formatDate(job.applicationDeadline)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="student-job-apply-btn"
                  onClick={() => handleApplyClick(job)}
                >
                  View & Apply
                  <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* ==========================================
                APPLICATION MODAL
            ========================================== */}

      {selectedJob && (
        <div
          className="student-apply-modal-overlay"
          onClick={() => {
            if (!applying) {
              handleCloseModal();
            }
          }}
        >
          <div
            className="student-apply-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}

            <div className="student-apply-modal-header">
              <div>
                <span>APPLICATION</span>

                <h2>{selectedJob.jobTitle || "-"}</h2>

                <p>{selectedJob.company?.name || selectedJob.company || ""}</p>
              </div>

              <button
                type="button"
                className="student-apply-close"
                onClick={handleCloseModal}
                disabled={applying}
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form className="student-apply-form" onSubmit={handleSubmit}>
              <div className="student-apply-intro">
                <strong>Apply for this position</strong>

                <p>
                  Submit your resume and a short cover letter to complete your
                  application.
                </p>
              </div>

              {/* RESUME */}

              <div className="student-apply-field">
                <label>Resume URL</label>

                <input
                  type="text"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  required
                />

                <small>Add a public link to your latest resume.</small>
              </div>

              {/* COVER LETTER */}

              <div className="student-apply-field">
                <label>Cover Letter</label>

                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Write a short cover letter explaining why you are suitable for this role..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {/* ACTIONS */}

              <div className="student-apply-actions">
                <button
                  type="button"
                  className="student-apply-cancel"
                  onClick={handleCloseModal}
                  disabled={applying}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="student-apply-submit"
                  disabled={applying}
                >
                  {applying ? (
                    <>
                      <span className="submit-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentJobs;

