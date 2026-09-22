
const express = require("express");

const {
    getAllExams,
    createExam
} = require("../controllers/examController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Student + Admin → View exam timetable
router.get(
    "/",
    authMiddleware,
    getAllExams
);

// Admin → Create exam
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createExam
);

module.exports = router;

