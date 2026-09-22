
const express = require("express");

const {
    getAllSubjects,
    createSubject
} = require("../controllers/subjectController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all subjects
router.get(
    "/",
    authMiddleware,
    getAllSubjects
);

// Admin can create subject
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createSubject
);

module.exports = router;

