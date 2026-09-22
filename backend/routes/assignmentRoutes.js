const express = require("express");

const {
    createAssignment,
    getAllAssignments,
    getStudentAssignments
} = require("../controllers/assignmentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// ==========================================
// Student - Get Assignments
// ==========================================
router.get(
    "/my-assignments",
    authMiddleware,
    roleMiddleware(["student"]),
    getStudentAssignments
);


// ==========================================
// Admin - Get All Assignments
// ==========================================
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllAssignments
);


// ==========================================
// Admin - Create Assignment
// ==========================================
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createAssignment
);


module.exports = router;