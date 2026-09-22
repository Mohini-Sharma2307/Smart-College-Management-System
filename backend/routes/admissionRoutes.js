const express = require("express");

const {
    applyAdmission,
    getAllAdmissions,
    updateAdmissionStatus,
    getMyAdmission
} = require("../controllers/admissionController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// STUDENT APPLY FOR ADMISSION
router.post(
    "/apply",
    authMiddleware,
    roleMiddleware(["student"]),
    applyAdmission
);

// ADMIN - GET ALL ADMISSIONS
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllAdmissions
);

// ADMIN - APPROVE / REJECT ADMISSION
router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateAdmissionStatus
);

// STUDENT - GET MY ADMISSION
router.get(
    "/my-admission",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyAdmission
);

module.exports = router;