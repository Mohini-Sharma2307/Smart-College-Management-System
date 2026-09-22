const express = require("express");

const {
    submitAssignment,
    getMySubmissions,
    getAllSubmissions,
    evaluateSubmission
} = require("../controllers/assignmentSubmissionController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// ==========================================
// STUDENT - SUBMIT ASSIGNMENT
// ==========================================

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["student"]),
    upload.single("submissionFile"),
    submitAssignment
);


// ==========================================
// STUDENT - MY SUBMISSIONS
// ==========================================

router.get(
    "/my-submissions",
    authMiddleware,
    roleMiddleware(["student"]),
    getMySubmissions
);


// ==========================================
// ADMIN - ALL SUBMISSIONS
// ==========================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllSubmissions
);


// ==========================================
// ADMIN - EVALUATE SUBMISSION
// ==========================================

router.put(
    "/:id/evaluate",
    authMiddleware,
    roleMiddleware(["admin"]),
    evaluateSubmission
);


module.exports = router;