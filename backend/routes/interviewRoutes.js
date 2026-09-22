
const express = require("express");

const router = express.Router();

const {
    getAllInterviews,
    createInterview,
    updateInterview,
    deleteInterview,
    getMyInterviews
} = require("../controllers/interviewController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// ==========================================
// STUDENT — GET MY INTERVIEWS
// ==========================================

router.get(
    "/my-interviews",
    authMiddleware,
    roleMiddleware("student"),
    getMyInterviews
);


// ==========================================
// ADMIN — GET ALL INTERVIEWS
// ==========================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllInterviews
);


// ==========================================
// ADMIN — CREATE INTERVIEW
// ==========================================

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createInterview
);


// ==========================================
// ADMIN — UPDATE INTERVIEW
// ==========================================

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateInterview
);


// ==========================================
// ADMIN — DELETE INTERVIEW
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteInterview
);


module.exports = router;

