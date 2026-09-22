const express = require("express");

const {
    getMyAdmitCard,
    getAllAdmitCards,
    createAdmitCard,
    verifyAdmitCard
} = require("../controllers/admitCardController");

const {
    generateAdmitCardPDF,
    generateAdminAdmitCardPDF
} = require("../controllers/pdfController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// ======================================================
// STUDENT - GET MY ADMIT CARDS
// ======================================================

router.get(
    "/my-admit-card",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyAdmitCard
);


// ======================================================
// STUDENT - DOWNLOAD ADMIT CARD PDF
// ======================================================

router.get(
    "/my-admit-card/pdf",
    authMiddleware,
    roleMiddleware(["student"]),
    generateAdmitCardPDF
);


// ======================================================
// PUBLIC - VERIFY ADMIT CARD
// ======================================================

router.get(
    "/verify/:verificationCode",
    verifyAdmitCard
);


// ======================================================
// ADMIN - GET ALL ADMIT CARDS
// ======================================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllAdmitCards
);


// ======================================================
// ADMIN - GENERATE ADMIT CARD
// ======================================================

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createAdmitCard
);


// ======================================================
// ADMIN - DOWNLOAD SELECTED ADMIT CARD PDF
// ======================================================

router.get(
    "/:id/pdf",
    authMiddleware,
    roleMiddleware(["admin"]),
    generateAdminAdmitCardPDF
);


module.exports = router;