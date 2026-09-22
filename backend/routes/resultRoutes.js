const express = require("express");

const {
    getMyResults,
    createResult
} = require("../controllers/resultController");

const {
    generateResultPDF
} = require("../controllers/pdfController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Student - Get My Results
router.get(
    "/my-results",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyResults
);


// Student - Download Marksheet PDF
router.get(
    "/my-results/pdf",
    authMiddleware,
    roleMiddleware(["student"]),
    generateResultPDF
);


// Admin - Create Result
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createResult
);


module.exports = router;