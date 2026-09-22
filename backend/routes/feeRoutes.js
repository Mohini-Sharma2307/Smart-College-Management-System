const express = require("express");

const {
    getMyFee,
    createFee
} = require("../controllers/feeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Student → View own fee
router.get(
    "/my-fee",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyFee
);

// Admin → Create fee record
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createFee
);

module.exports = router;