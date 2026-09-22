const express = require("express");

const {
    getAllNotices,
    createNotice
} = require("../controllers/noticeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Student/Admin → View notices
router.get(
    "/",
    authMiddleware,
    getAllNotices
);

// Admin → Create notice
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createNotice
);

module.exports = router;