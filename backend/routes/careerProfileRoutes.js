const express = require("express");

const router = express.Router();

const {
    getMyCareerProfile,
    saveCareerProfile
} = require("../controllers/careerProfileController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ==========================================
// GET MY CAREER PROFILE
// ==========================================

router.get(
    "/my-profile",
    authMiddleware,
    roleMiddleware("student"),
    getMyCareerProfile
);


// ==========================================
// CREATE / UPDATE CAREER PROFILE
// ==========================================

router.post(
    "/",
    authMiddleware,
    roleMiddleware("student"),
    saveCareerProfile
);


module.exports = router;