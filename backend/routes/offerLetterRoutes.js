
const express = require("express");

const router = express.Router();

const {
    getAllOfferLetters,
    getMyOfferLetters,
    createOfferLetter,
    updateOfferLetter,
    deleteOfferLetter,
    downloadOfferLetterPDF,
    downloadStudentOfferLetterPDF
} = require("../controllers/offerLetterController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// ==========================================
// GET MY OFFER LETTERS
// STUDENT
// ==========================================

router.get(
    "/my-offer-letters",
    authMiddleware,
    roleMiddleware("student"),
    getMyOfferLetters
);


// ==========================================
// DOWNLOAD MY OFFER LETTER PDF
// STUDENT
// ==========================================

router.get(
    "/:id/student-pdf",
    authMiddleware,
    roleMiddleware("student"),
    downloadStudentOfferLetterPDF
);


// ==========================================
// GET ALL OFFER LETTERS
// ADMIN
// ==========================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllOfferLetters
);


// ==========================================
// CREATE OFFER LETTER
// ADMIN
// ==========================================

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createOfferLetter
);


// ==========================================
// UPDATE OFFER LETTER
// ADMIN
// ==========================================

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateOfferLetter
);


// ==========================================
// DELETE OFFER LETTER
// ADMIN
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteOfferLetter
);


// ==========================================
// DOWNLOAD OFFER LETTER PDF
// ADMIN
// ==========================================

router.get(
    "/:id/pdf",
    authMiddleware,
    roleMiddleware("admin"),
    downloadOfferLetterPDF
);


module.exports = router;

