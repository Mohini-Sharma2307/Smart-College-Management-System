const express = require("express");

const {
    markAttendance,
    getAllAttendance,
    getMyAttendance,
    getMyAttendanceSummary
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Student - My Attendance
router.get(
    "/my-attendance",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyAttendance
);


// Student - Attendance Summary
router.get(
    "/my-attendance/summary",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyAttendanceSummary
);


// Admin - All Attendance
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllAttendance
);


// Admin - Mark Attendance
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    markAttendance
);


module.exports = router;