const express = require("express");

const router = express.Router();

const {
    getCareerRecommendations
} = require("../controllers/careerRecommendationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ==========================================
// GET CAREER RECOMMENDATIONS
// ==========================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware("student"),
    getCareerRecommendations
);


module.exports = router;