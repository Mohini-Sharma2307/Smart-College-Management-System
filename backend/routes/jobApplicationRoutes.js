const express = require("express");

const router = express.Router();

const {
    applyForJob,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus
} = require("../controllers/jobApplicationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ==========================================
// STUDENT ROUTES
// ==========================================

// Apply for a job
router.post(
    "/apply",
    authMiddleware,
    roleMiddleware("student"),
    applyForJob
);

// Get logged-in student's applications
router.get(
    "/my-applications",
    authMiddleware,
    roleMiddleware("student"),
    getMyApplications
);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all job applications
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllApplications
);

// Update application status
router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin"),
    updateApplicationStatus
);

module.exports = router;