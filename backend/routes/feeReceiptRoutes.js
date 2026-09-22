
const express = require("express");

const {
    createFeeReceipt,
    getAllFeeReceipts,
    getMyFeeReceipts,
    downloadFeeReceiptPDF,
    downloadStudentFeeReceiptPDF
} = require("../controllers/feeReceiptController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// ==========================================
// ADMIN - GET ALL FEE RECEIPTS
// ==========================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllFeeReceipts
);


// ==========================================
// ADMIN - CREATE FEE RECEIPT
// ==========================================

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createFeeReceipt
);


// ==========================================
// STUDENT - GET OWN FEE RECEIPTS
// ==========================================

router.get(
    "/my-receipts",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyFeeReceipts
);


// ==========================================
// STUDENT - DOWNLOAD OWN FEE RECEIPT PDF
// ==========================================

router.get(
    "/student/:id/pdf",
    authMiddleware,
    roleMiddleware(["student"]),
    downloadStudentFeeReceiptPDF
);


// ==========================================
// ADMIN - DOWNLOAD ANY FEE RECEIPT PDF
// ==========================================

router.get(
    "/:id/pdf",
    authMiddleware,
    roleMiddleware(["admin"]),
    downloadFeeReceiptPDF
);


module.exports = router;

