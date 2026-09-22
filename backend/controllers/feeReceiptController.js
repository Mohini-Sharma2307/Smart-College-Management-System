
const FeeReceipt = require("../models/FeeReceipt");
const PDFDocument = require("pdfkit");

// ==========================================
// ADMIN - CREATE FEE RECEIPT
// ==========================================

const createFeeReceipt = async (req, res) => {
    try {
        const {
            student,
            receiptNumber,
            amount,
            paymentDate,
            paymentMode,
            description
        } = req.body;

        if (
            !student ||
            !receiptNumber ||
            !amount ||
            !paymentDate ||
            !paymentMode
        ) {
            return res.status(400).json({
                message: "All required fields are required"
            });
        }

        const existingReceipt =
            await FeeReceipt.findOne({
                receiptNumber
            });

        if (existingReceipt) {
            return res.status(400).json({
                message: "Receipt number already exists"
            });
        }

        const receipt =
            await FeeReceipt.create({
                student,
                receiptNumber,
                amount,
                paymentDate,
                paymentMode,
                description: description || "",
                status: "Paid"
            });

        const completeReceipt =
            await FeeReceipt.findById(
                receipt._id
            ).populate(
                "student",
                "fullName email"
            );

        res.status(201).json({
            message:
                "Fee receipt created successfully",
            receipt: completeReceipt
        });

    } catch (error) {
        console.log(
            "Create fee receipt error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// ADMIN - GET ALL FEE RECEIPTS
// ==========================================

const getAllFeeReceipts = async (req, res) => {
    try {
        const receipts =
            await FeeReceipt.find()
                .populate(
                    "student",
                    "fullName email"
                )
                .sort({
                    paymentDate: -1
                });

        res.status(200).json({
            message:
                "Fee receipts fetched successfully",
            receipts
        });

    } catch (error) {
        console.log(
            "Get fee receipts error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// STUDENT - GET OWN FEE RECEIPTS
// ==========================================

const getMyFeeReceipts = async (req, res) => {
    try {
        const receipts =
            await FeeReceipt.find({
                student: req.user.id
            })
                .populate(
                    "student",
                    "fullName email"
                )
                .sort({
                    paymentDate: -1
                });

        res.status(200).json({
            message:
                "Your fee receipts fetched successfully",
            receipts
        });

    } catch (error) {
        console.log(
            "Get my fee receipts error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// ADMIN - DOWNLOAD ANY FEE RECEIPT PDF
// ==========================================

const downloadFeeReceiptPDF = async (req, res) => {
    try {
        const receipt =
            await FeeReceipt.findById(
                req.params.id
            ).populate(
                "student",
                "fullName email"
            );

        if (!receipt) {
            return res.status(404).json({
                message:
                    "Fee receipt not found"
            });
        }

        const doc = new PDFDocument({
            size: "A4",
            margin: 50
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${receipt.receiptNumber}.pdf"`
        );

        doc.pipe(res);

        // ==========================================
        // HEADER
        // ==========================================

        doc
            .fontSize(22)
            .fillColor("#1e3a8a")
            .font("Helvetica-Bold")
            .text(
                "SMART COLLEGE",
                {
                    align: "center"
                }
            );

        doc
            .fontSize(10)
            .fillColor("#64748b")
            .font("Helvetica")
            .text(
                "College Management System",
                {
                    align: "center"
                }
            );

        doc.moveDown(1);

        // ==========================================
        // TITLE
        // ==========================================

        doc
            .moveTo(50, 120)
            .lineTo(545, 120)
            .strokeColor("#2563eb")
            .lineWidth(2)
            .stroke();

        doc
            .moveDown(1)
            .fontSize(18)
            .fillColor("#0f172a")
            .font("Helvetica-Bold")
            .text(
                "FEE RECEIPT",
                {
                    align: "center"
                }
            );

        doc.moveDown(1);

        // ==========================================
        // RECEIPT INFORMATION
        // ==========================================

        doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#0f172a")
            .text(
                `Receipt Number: ${receipt.receiptNumber}`
            );

        doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#475569")
            .text(
                `Payment Date: ${new Date(
                    receipt.paymentDate
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                )}`
            );

        doc.moveDown(1);

        // ==========================================
        // STUDENT INFORMATION
        // ==========================================

        doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "Student Information"
            );

        doc.moveDown(0.5);

        doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                `Student Name: ${
                    receipt.student?.fullName || "-"
                }`
            );

        doc.text(
            `Email: ${
                receipt.student?.email || "-"
            }`
        );

        doc.moveDown(1);

        // ==========================================
        // PAYMENT INFORMATION
        // ==========================================

        doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "Payment Information"
            );

        doc.moveDown(0.5);

        doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                `Payment Mode: ${
                    receipt.paymentMode
                }`
            );

        doc.text(
            `Description: ${
                receipt.description || "-"
            }`
        );

        doc.moveDown(1);

        // ==========================================
        // AMOUNT
        // ==========================================

        const amountY = doc.y;

        doc
            .roundedRect(
                50,
                amountY,
                495,
                70,
                8
            )
            .fill("#eff6ff");

        doc
            .fontSize(11)
            .fillColor("#475569")
            .font("Helvetica")
            .text(
                "Amount Paid",
                70,
                amountY + 18
            );

        doc
            .fontSize(22)
            .fillColor("#1d4ed8")
            .font("Helvetica-Bold")
            .text(
                `Rs. ${Number(
                    receipt.amount
                ).toLocaleString("en-IN")}`,
                70,
                amountY + 36
            );

        doc
            .fontSize(10)
            .fillColor("#166534")
            .font("Helvetica-Bold")
            .text(
                "PAID",
                455,
                amountY + 28
            );

        doc.y = amountY + 95;

        // ==========================================
        // SIGNATURES
        // ==========================================

        const signatureY = doc.y;

        doc
            .moveTo(70, signatureY)
            .lineTo(230, signatureY)
            .strokeColor("#94a3b8")
            .lineWidth(1)
            .stroke();

        doc
            .fontSize(9)
            .fillColor("#475569")
            .font("Helvetica")
            .text(
                "Student Signature",
                70,
                signatureY + 7
            );

        doc
            .moveTo(365, signatureY)
            .lineTo(525, signatureY)
            .strokeColor("#94a3b8")
            .lineWidth(1)
            .stroke();

        doc.text(
            "Authorized Signature",
            365,
            signatureY + 7
        );

        // ==========================================
        // FOOTER
        // ==========================================

        doc
            .fontSize(9)
            .fillColor("#64748b")
            .text(
                "Smart College Management System",
                50,
                760,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(8)
            .fillColor("#94a3b8")
            .text(
                "This is an officially generated fee receipt.",
                50,
                775,
                {
                    align: "center",
                    width: 495
                }
            );

        doc.end();

    } catch (error) {
        console.log(
            "Download fee receipt PDF error:",
            error.message
        );

        res.status(500).json({
            message:
                "Unable to generate fee receipt PDF"
        });
    }
};


// ==========================================
// STUDENT - DOWNLOAD OWN FEE RECEIPT PDF
// ==========================================

const downloadStudentFeeReceiptPDF = async (
    req,
    res
) => {
    try {
        const receipt =
            await FeeReceipt.findOne({
                _id: req.params.id,
                student: req.user.id
            }).populate(
                "student",
                "fullName email"
            );

        // ==========================================
        // SECURITY CHECK
        // ==========================================

        if (!receipt) {
            return res.status(404).json({
                message:
                    "Fee receipt not found or you are not authorized to access it"
            });
        }

        const doc = new PDFDocument({
            size: "A4",
            margin: 50
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${receipt.receiptNumber}.pdf"`
        );

        doc.pipe(res);

        // ==========================================
        // HEADER
        // ==========================================

        doc
            .fontSize(22)
            .fillColor("#1e3a8a")
            .font("Helvetica-Bold")
            .text(
                "SMART COLLEGE",
                {
                    align: "center"
                }
            );

        doc
            .fontSize(10)
            .fillColor("#64748b")
            .font("Helvetica")
            .text(
                "College Management System",
                {
                    align: "center"
                }
            );

        doc.moveDown(1);

        // ==========================================
        // TITLE
        // ==========================================

        doc
            .moveTo(50, 120)
            .lineTo(545, 120)
            .strokeColor("#2563eb")
            .lineWidth(2)
            .stroke();

        doc
            .moveDown(1)
            .fontSize(18)
            .fillColor("#0f172a")
            .font("Helvetica-Bold")
            .text(
                "FEE RECEIPT",
                {
                    align: "center"
                }
            );

        doc.moveDown(1);

        // ==========================================
        // RECEIPT INFORMATION
        // ==========================================

        doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#0f172a")
            .text(
                `Receipt Number: ${receipt.receiptNumber}`
            );

        doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#475569")
            .text(
                `Payment Date: ${new Date(
                    receipt.paymentDate
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                )}`
            );

        doc.moveDown(1);

        // ==========================================
        // STUDENT INFORMATION
        // ==========================================

        doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "Student Information"
            );

        doc.moveDown(0.5);

        doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                `Student Name: ${
                    receipt.student?.fullName || "-"
                }`
            );

        doc.text(
            `Email: ${
                receipt.student?.email || "-"
            }`
        );

        doc.moveDown(1);

        // ==========================================
        // PAYMENT INFORMATION
        // ==========================================

        doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "Payment Information"
            );

        doc.moveDown(0.5);

        doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                `Payment Mode: ${
                    receipt.paymentMode
                }`
            );

        doc.text(
            `Description: ${
                receipt.description || "-"
            }`
        );

        doc.moveDown(1);

        // ==========================================
        // AMOUNT
        // ==========================================

        const amountY = doc.y;

        doc
            .roundedRect(
                50,
                amountY,
                495,
                70,
                8
            )
            .fill("#eff6ff");

        doc
            .fontSize(11)
            .fillColor("#475569")
            .font("Helvetica")
            .text(
                "Amount Paid",
                70,
                amountY + 18
            );

        doc
            .fontSize(22)
            .fillColor("#1d4ed8")
            .font("Helvetica-Bold")
            .text(
                `Rs. ${Number(
                    receipt.amount
                ).toLocaleString("en-IN")}`,
                70,
                amountY + 36
            );

        doc
            .fontSize(10)
            .fillColor("#166534")
            .font("Helvetica-Bold")
            .text(
                "PAID",
                455,
                amountY + 28
            );

        doc.y = amountY + 95;

        // ==========================================
        // SIGNATURES
        // ==========================================

        const signatureY = doc.y;

        doc
            .moveTo(70, signatureY)
            .lineTo(230, signatureY)
            .strokeColor("#94a3b8")
            .lineWidth(1)
            .stroke();

        doc
            .fontSize(9)
            .fillColor("#475569")
            .font("Helvetica")
            .text(
                "Student Signature",
                70,
                signatureY + 7
            );

        doc
            .moveTo(365, signatureY)
            .lineTo(525, signatureY)
            .strokeColor("#94a3b8")
            .lineWidth(1)
            .stroke();

        doc.text(
            "Authorized Signature",
            365,
            signatureY + 7
        );

        // ==========================================
        // FOOTER
        // ==========================================

        doc
            .fontSize(9)
            .fillColor("#64748b")
            .text(
                "Smart College Management System",
                50,
                760,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(8)
            .fillColor("#94a3b8")
            .text(
                "This is an officially generated fee receipt.",
                50,
                775,
                {
                    align: "center",
                    width: 495
                }
            );

        doc.end();

    } catch (error) {
        console.log(
            "Student fee receipt PDF error:",
            error.message
        );

        res.status(500).json({
            message:
                "Unable to generate fee receipt PDF"
        });
    }
};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {
    createFeeReceipt,
    getAllFeeReceipts,
    getMyFeeReceipts,
    downloadFeeReceiptPDF,
    downloadStudentFeeReceiptPDF
};



