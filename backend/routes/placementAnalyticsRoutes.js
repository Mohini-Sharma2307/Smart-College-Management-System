
const express = require("express");

const router = express.Router();

const {
    getPlacementAnalytics,
    getMyPlacementAnalytics
} = require("../controllers/placementAnalyticsController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// ==========================================
// ADMIN - PLACEMENT ANALYTICS
// ==========================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getPlacementAnalytics
);


// ==========================================
// STUDENT - MY PLACEMENT ANALYTICS
// ==========================================

router.get(
    "/my-analytics",
    authMiddleware,
    roleMiddleware("student"),
    getMyPlacementAnalytics
);


module.exports = router;
