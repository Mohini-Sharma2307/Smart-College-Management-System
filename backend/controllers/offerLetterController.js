
const OfferLetter = require("../models/OfferLetter");
const PDFDocument = require("pdfkit");

// ==========================================
// GET ALL OFFER LETTERS
// ADMIN
// ==========================================

const getAllOfferLetters = async (req, res) => {
    try {
        const offerLetters = await OfferLetter.find()
            .populate("student", "-password")
            .populate("company")
            .populate("job")
            .populate("application")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            offerLetters
        });

    } catch (error) {
        console.error(
            "Get offer letters error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch offer letters"
        });
    }
};


// ==========================================
// GET MY OFFER LETTERS
// STUDENT
// ==========================================

const getMyOfferLetters = async (req, res) => {
    try {

        const studentId = req.user.id;

        const offerLetters = await OfferLetter.find({
            student: studentId
        })
            .populate("student", "-password")
            .populate("company")
            .populate("job")
            .populate("application")
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            offerLetters
        });

    } catch (error) {

        console.error(
            "Get student offer letters error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch your offer letters"
        });
    }
};


// ==========================================
// CREATE OFFER LETTER
// ADMIN
// ==========================================

const createOfferLetter = async (req, res) => {
    try {

        const {
            student,
            application,
            company,
            job,
            offerDate,
            joiningDate,
            salary,
            jobLocation,
            offerStatus,
            offerLetterFile,
            remarks
        } = req.body;

        // Required fields

        if (
            !student ||
            !application ||
            !company ||
            !job ||
            !offerDate ||
            !joiningDate ||
            !salary ||
            !jobLocation
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please provide all required offer letter details"
            });
        }

        // Check duplicate offer letter

        const existingOffer =
            await OfferLetter.findOne({
                application
            });

        if (existingOffer) {
            return res.status(400).json({
                success: false,
                message:
                    "Offer letter already exists for this application"
            });
        }

        const offerLetter =
            await OfferLetter.create({
                student,
                application,
                company,
                job,
                offerDate,
                joiningDate,
                salary,
                jobLocation,
                offerStatus:
                    offerStatus || "Issued",
                offerLetterFile,
                remarks
            });

        const populatedOfferLetter =
            await OfferLetter.findById(
                offerLetter._id
            )
                .populate("student", "-password")
                .populate("company")
                .populate("job")
                .populate("application");

        res.status(201).json({
            success: true,
            message:
                "Offer letter created successfully",
            offerLetter:
                populatedOfferLetter
        });

    } catch (error) {

        console.error(
            "Create offer letter error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to create offer letter"
        });
    }
};


// ==========================================
// UPDATE OFFER LETTER
// ADMIN
// ==========================================

const updateOfferLetter = async (req, res) => {
    try {

        const { id } = req.params;

        const offerLetter =
            await OfferLetter.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!offerLetter) {
            return res.status(404).json({
                success: false,
                message:
                    "Offer letter not found"
            });
        }

        const populatedOfferLetter =
            await OfferLetter.findById(
                offerLetter._id
            )
                .populate("student", "-password")
                .populate("company")
                .populate("job")
                .populate("application");

        res.status(200).json({
            success: true,
            message:
                "Offer letter updated successfully",
            offerLetter:
                populatedOfferLetter
        });

    } catch (error) {

        console.error(
            "Update offer letter error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to update offer letter"
        });
    }
};


// ==========================================
// DELETE OFFER LETTER
// ADMIN
// ==========================================

const deleteOfferLetter = async (req, res) => {
    try {

        const { id } = req.params;

        const offerLetter =
            await OfferLetter.findByIdAndDelete(id);

        if (!offerLetter) {
            return res.status(404).json({
                success: false,
                message:
                    "Offer letter not found"
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Offer letter deleted successfully"
        });

    } catch (error) {

        console.error(
            "Delete offer letter error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to delete offer letter"
        });
    }
};


// ==========================================
// DOWNLOAD OFFER LETTER PDF
// ==========================================

const downloadOfferLetterPDF = async (req, res) => {
    try {

        const { id } = req.params;

        const offerLetter =
            await OfferLetter.findById(id)
                .populate("student", "-password")
                .populate("company")
                .populate("job")
                .populate("application");

        if (!offerLetter) {
            return res.status(404).json({
                success: false,
                message:
                    "Offer letter not found"
            });
        }

        // ==========================================
        // CREATE PDF
        // ==========================================

        const doc = new PDFDocument({
            size: "A4",
            margin: 50
        });

        // ==========================================
        // RESPONSE HEADERS
        // ==========================================

        const studentName =
            offerLetter.student?.fullName ||
            "Student";

        const safeFileName =
            studentName
                .replace(/[^a-zA-Z0-9]/g, "-")
                .toLowerCase();

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="offer-letter-${safeFileName}.pdf"`
        );

        doc.pipe(res);

        // ==========================================
        // DATE FORMATTING
        // ==========================================

        const formattedOfferDate =
            offerLetter.offerDate
                ? new Date(
                    offerLetter.offerDate
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                )
                : "-";

        const formattedJoiningDate =
            offerLetter.joiningDate
                ? new Date(
                    offerLetter.joiningDate
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                )
                : "-";

        // ==========================================
        // COLLEGE HEADER
        // ==========================================

        doc
            .font("Helvetica-Bold")
            .fontSize(22)
            .text(
                "SMART COLLEGE",
                {
                    align: "center"
                }
            );

        doc
            .font("Helvetica")
            .fontSize(10)
            .text(
                "College & Placement Management System",
                {
                    align: "center"
                }
            );

        doc.moveDown(1.5);

        doc
            .moveTo(50, doc.y)
            .lineTo(545, doc.y)
            .stroke();

        doc.moveDown(1.5);

        // ==========================================
        // DOCUMENT TITLE
        // ==========================================

        doc
            .font("Helvetica-Bold")
            .fontSize(18)
            .text(
                "PLACEMENT OFFER LETTER",
                {
                    align: "center",
                    underline: true
                }
            );

        doc.moveDown(1.5);

        // ==========================================
        // OFFER DATE
        // ==========================================

        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `Date: ${formattedOfferDate}`,
                {
                    align: "right"
                }
            );

        doc.moveDown(2);

        // ==========================================
        // GREETING
        // ==========================================

        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `Dear ${studentName},`
            );

        doc.moveDown(1);

        // ==========================================
        // INTRODUCTION
        // ==========================================

        const companyName =
            offerLetter.company?.name ||
            "the company";

        const jobTitle =
            offerLetter.job?.jobTitle ||
            "the offered position";

        doc.text(
            `We are pleased to inform you that you have been selected for the position of ${jobTitle} at ${companyName}.`
        );

        doc.moveDown(1);

        doc.text(
            "Based on your performance during the placement selection process, we are pleased to present you with the following offer."
        );

        doc.moveDown(2);

        // ==========================================
        // OFFER DETAILS HEADING
        // ==========================================

        doc
            .font("Helvetica-Bold")
            .fontSize(13)
            .text(
                "Offer Details",
                {
                    underline: true
                }
            );

        doc.moveDown(1);

        // ==========================================
        // OFFER DETAILS
        // ==========================================

        doc
            .font("Helvetica")
            .fontSize(11);

        doc.text(
            `Student Name: ${studentName}`
        );

        doc.text(
            `Email: ${offerLetter.student?.email || "-"}`
        );

        doc.text(
            `Company: ${companyName}`
        );

        doc.text(
            `Job Title: ${jobTitle}`
        );

        doc.text(
            `Salary / CTC: ₹ ${offerLetter.salary || "-"}`
        );

        doc.text(
            `Job Location: ${offerLetter.jobLocation || "-"}`
        );

        doc.text(
            `Joining Date: ${formattedJoiningDate}`
        );

        doc.text(
            `Offer Status: ${offerLetter.offerStatus || "Issued"}`
        );

        doc.moveDown(2);

        // ==========================================
        // REMARKS
        // ==========================================

        if (offerLetter.remarks) {

            doc
                .font("Helvetica-Bold")
                .fontSize(13)
                .text(
                    "Remarks",
                    {
                        underline: true
                    }
                );

            doc.moveDown(0.5);

            doc
                .font("Helvetica")
                .fontSize(11)
                .text(
                    offerLetter.remarks
                );

            doc.moveDown(2);
        }

        // ==========================================
        // CLOSING MESSAGE
        // ==========================================

        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `We congratulate you on your selection at ${companyName} and wish you success in your professional career.`
            );

        doc.moveDown(1);

        doc.text(
            "Please complete all required joining formalities and follow the instructions provided by the company."
        );

        doc.moveDown(3);

        // ==========================================
        // SIGNATURE
        // ==========================================

        doc
            .font("Helvetica-Bold")
            .fontSize(11)
            .text(
                "Authorized Signature",
                {
                    align: "right"
                }
            );

        doc
            .font("Helvetica")
            .fontSize(10)
            .text(
                "Placement Officer",
                {
                    align: "right"
                }
            );

        doc.text(
            "Smart College",
            {
                align: "right"
            }
        );

        doc.moveDown(3);

        // ==========================================
        // FOOTER LINE
        // ==========================================

        doc
            .moveTo(50, doc.y)
            .lineTo(545, doc.y)
            .stroke();

        doc.moveDown(0.7);

        doc
            .font("Helvetica")
            .fontSize(8)
            .text(
                "This is an official placement document generated by Smart College Management System.",
                {
                    align: "center"
                }
            );

        // ==========================================
        // FINISH PDF
        // ==========================================

        doc.end();

    } catch (error) {

        console.error(
            "Download offer letter PDF error:",
            error
        );

        if (!res.headersSent) {

            res.status(500).json({
                success: false,
                message:
                    "Unable to generate offer letter PDF"
            });
        }
    }
};

// ==========================================
// STUDENT - DOWNLOAD OWN OFFER LETTER PDF
// ==========================================

const downloadStudentOfferLetterPDF = async (req, res) => {
    try {

        const { id } = req.params;

        // ==========================================
        // GET OFFER LETTER
        // ==========================================

        const offerLetter =
            await OfferLetter.findById(id)
                .populate("student", "-password")
                .populate("company")
                .populate("job")
                .populate("application");

        if (!offerLetter) {
            return res.status(404).json({
                success: false,
                message: "Offer letter not found"
            });
        }

        // ==========================================
        // CHECK OWNERSHIP
        // ==========================================

        const offerStudentId =
            offerLetter.student?._id?.toString();

        const loggedInStudentId =
            req.user.id?.toString();

        if (
            !offerStudentId ||
            offerStudentId !== loggedInStudentId
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to download this offer letter"
            });
        }

        // ==========================================
        // CREATE PDF
        // ==========================================

        const doc = new PDFDocument({
            size: "A4",
            margin: 50
        });

        // ==========================================
        // STUDENT DETAILS
        // ==========================================

        const studentName =
            offerLetter.student?.fullName ||
            "Student";

        const studentEmail =
            offerLetter.student?.email ||
            "-";

        const companyName =
            offerLetter.company?.name ||
            "the company";

        const jobTitle =
            offerLetter.job?.jobTitle ||
            "the offered position";

        // ==========================================
        // SAFE FILE NAME
        // ==========================================

        const safeFileName =
            studentName
                .replace(/[^a-zA-Z0-9]/g, "-")
                .toLowerCase();

        // ==========================================
        // RESPONSE HEADERS
        // ==========================================

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="offer-letter-${safeFileName}.pdf"`
        );

        doc.pipe(res);

        // ==========================================
        // DATE FORMATTING
        // ==========================================

        const formattedOfferDate =
            offerLetter.offerDate
                ? new Date(
                    offerLetter.offerDate
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                )
                : "-";

        const formattedJoiningDate =
            offerLetter.joiningDate
                ? new Date(
                    offerLetter.joiningDate
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                )
                : "-";

        // ==========================================
        // COLLEGE HEADER
        // ==========================================

        doc
            .font("Helvetica-Bold")
            .fontSize(22)
            .text(
                "SMART COLLEGE",
                {
                    align: "center"
                }
            );

        doc
            .font("Helvetica")
            .fontSize(10)
            .text(
                "College & Placement Management System",
                {
                    align: "center"
                }
            );

        doc.moveDown(1.5);

        // Header line

        doc
            .moveTo(50, doc.y)
            .lineTo(545, doc.y)
            .stroke();

        doc.moveDown(1.5);

        // ==========================================
        // DOCUMENT TITLE
        // ==========================================

        doc
            .font("Helvetica-Bold")
            .fontSize(18)
            .text(
                "PLACEMENT OFFER LETTER",
                {
                    align: "center",
                    underline: true
                }
            );

        doc.moveDown(1.5);

        // ==========================================
        // OFFER DATE
        // ==========================================

        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `Date: ${formattedOfferDate}`,
                {
                    align: "right"
                }
            );

        doc.moveDown(2);

        // ==========================================
        // GREETING
        // ==========================================

        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `Dear ${studentName},`
            );

        doc.moveDown(1);

        // ==========================================
        // INTRODUCTION
        // ==========================================

        doc.text(
            `We are pleased to inform you that you have been selected for the position of ${jobTitle} at ${companyName}.`
        );

        doc.moveDown(1);

        doc.text(
            "Based on your performance during the placement selection process, we are pleased to present you with the following offer."
        );

        doc.moveDown(2);

        // ==========================================
        // OFFER DETAILS HEADING
        // ==========================================

        doc
            .font("Helvetica-Bold")
            .fontSize(13)
            .text(
                "Offer Details",
                {
                    underline: true
                }
            );

        doc.moveDown(1);

        // ==========================================
        // OFFER DETAILS
        // ==========================================

        doc
            .font("Helvetica")
            .fontSize(11);

        doc.text(
            `Student Name: ${studentName}`
        );

        doc.text(
            `Email: ${studentEmail}`
        );

        doc.text(
            `Company: ${companyName}`
        );

        doc.text(
            `Job Title: ${jobTitle}`
        );

        doc.text(
            `Salary / CTC: ₹ ${offerLetter.salary || "-"}`
        );

        doc.text(
            `Job Location: ${offerLetter.jobLocation || "-"}`
        );

        doc.text(
            `Joining Date: ${formattedJoiningDate}`
        );

        doc.text(
            `Offer Status: ${offerLetter.offerStatus || "Issued"}`
        );

        doc.moveDown(2);

        // ==========================================
        // REMARKS
        // ==========================================

        if (offerLetter.remarks) {

            doc
                .font("Helvetica-Bold")
                .fontSize(13)
                .text(
                    "Remarks",
                    {
                        underline: true
                    }
                );

            doc.moveDown(0.5);

            doc
                .font("Helvetica")
                .fontSize(11)
                .text(
                    offerLetter.remarks
                );

            doc.moveDown(2);
        }

        // ==========================================
        // CLOSING MESSAGE
        // ==========================================

        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `We congratulate you on your selection at ${companyName} and wish you success in your professional career.`
            );

        doc.moveDown(1);

        doc.text(
            "Please complete all required joining formalities and follow the instructions provided by the company."
        );

        doc.moveDown(3);

        // ==========================================
        // SIGNATURE
        // ==========================================

        doc
            .font("Helvetica-Bold")
            .fontSize(11)
            .text(
                "Authorized Signature",
                {
                    align: "right"
                }
            );

        doc
            .font("Helvetica")
            .fontSize(10)
            .text(
                "Placement Officer",
                {
                    align: "right"
                }
            );

        doc.text(
            "Smart College",
            {
                align: "right"
            }
        );

        doc.moveDown(3);

        // ==========================================
        // FOOTER
        // ==========================================

        doc
            .moveTo(50, doc.y)
            .lineTo(545, doc.y)
            .stroke();

        doc.moveDown(0.7);

        doc
            .font("Helvetica")
            .fontSize(8)
            .text(
                "This is an official placement document generated by Smart College Management System.",
                {
                    align: "center"
                }
            );

        // ==========================================
        // FINISH PDF
        // ==========================================

        doc.end();

    } catch (error) {

        console.error(
            "Student offer letter PDF error:",
            error
        );

        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message:
                    "Unable to generate offer letter PDF"
            });
        }
    }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
    getAllOfferLetters,
    getMyOfferLetters,
    createOfferLetter,
    updateOfferLetter,
    deleteOfferLetter,
    downloadOfferLetterPDF,
    downloadStudentOfferLetterPDF
};



