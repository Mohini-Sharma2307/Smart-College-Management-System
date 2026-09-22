const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

const Result = require("../models/Result");
const User = require("../models/User");
const AdmitCard = require("../models/AdmitCard");

// ======================================================
// GENERATE STUDENT MARKSHEET PDF
// ======================================================

const generateResultPDF = async (req, res) => {
    try {
        const studentId = req.user.id;

        const student = await User.findById(studentId).select(
            "fullName email"
        );

        const results = await Result.find({
            student: studentId
        }).sort({
            semester: 1,
            subject: 1
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "No result available"
            });
        }

        const doc = new PDFDocument({
            size: "A4",
            margin: 45
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="student-marksheet.pdf"'
        );

        doc.pipe(res);

        // ==========================================
        // PAGE BORDER
        // ==========================================

        doc
            .lineWidth(1.5)
            .rect(30, 30, 535, 782)
            .stroke("#1e3a8a");

        doc
            .lineWidth(0.5)
            .rect(36, 36, 523, 770)
            .stroke("#94a3b8");

        // ==========================================
        // COLLEGE HEADER
        // ==========================================

        doc
            .fontSize(24)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "SMART COLLEGE",
                45,
                60,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor("#475569")
            .text(
                "COLLEGE MANAGEMENT SYSTEM",
                45,
                90,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(9)
            .fillColor("#64748b")
            .text(
                "Academic Year 2026",
                45,
                108,
                {
                    align: "center",
                    width: 495
                }
            );

        // Header divider

        doc
            .lineWidth(1)
            .moveTo(55, 130)
            .lineTo(545, 130)
            .stroke("#1e3a8a");

        // ==========================================
        // MARKSHEET TITLE
        // ==========================================

        doc
            .fontSize(17)
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                "STUDENT MARKSHEET",
                45,
                150,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#64748b")
            .text(
                "Semester Examination Result",
                45,
                174,
                {
                    align: "center",
                    width: 495
                }
            );

        // ==========================================
        // STUDENT INFORMATION BOX
        // ==========================================

        const infoTop = 205;

        doc
            .lineWidth(0.8)
            .roundedRect(
                55,
                infoTop,
                490,
                100,
                6
            )
            .stroke("#cbd5e1");

        doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "STUDENT INFORMATION",
                70,
                infoTop + 14
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#334155");

        doc.text(
            "Student Name:",
            70,
            infoTop + 38
        );

        doc
            .font("Helvetica-Bold")
            .text(
                student.fullName,
                155,
                infoTop + 38
            );

        doc
            .font("Helvetica")
            .text(
                "Email:",
                70,
                infoTop + 60
            );

        doc
            .font("Helvetica-Bold")
            .text(
                student.email,
                155,
                infoTop + 60
            );

        doc
            .font("Helvetica")
            .text(
                "Student ID:",
                315,
                infoTop + 38
            );

        doc
            .font("Helvetica-Bold")
            .fontSize(8)
            .text(
                student._id.toString(),
                380,
                infoTop + 38
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .text(
                "Semester:",
                315,
                infoTop + 60
            );

        doc
            .font("Helvetica-Bold")
            .text(
                results[0].semester,
                380,
                infoTop + 60
            );

        // ==========================================
        // RESULT TABLE
        // ==========================================

        const tableTop = 330;

        const tableX = 55;
        const tableWidth = 490;

        const colCode = 80;
        const colSubject = 230;
        const colMarks = 105;
        const colGrade = 75;

        const headerHeight = 30;
        const rowHeight = 30;

        doc
            .fillColor("#1e3a8a")
            .rect(
                tableX,
                tableTop,
                tableWidth,
                headerHeight
            )
            .fill();

        doc
            .fillColor("#ffffff")
            .fontSize(9)
            .font("Helvetica-Bold")
            .text(
                "SUBJECT CODE",
                tableX + 8,
                tableTop + 10,
                {
                    width: colCode - 16
                }
            );

        doc.text(
            "SUBJECT",
            tableX + colCode + 8,
            tableTop + 10,
            {
                width: colSubject - 16
            }
        );

        doc.text(
            "MARKS",
            tableX + colCode + colSubject + 8,
            tableTop + 10,
            {
                width: colMarks - 16,
                align: "center"
            }
        );

        doc.text(
            "GRADE",
            tableX + colCode + colSubject + colMarks + 8,
            tableTop + 10,
            {
                width: colGrade - 16,
                align: "center"
            }
        );

        let currentY = tableTop + headerHeight;

        results.forEach((result, index) => {

            const rowColor =
                index % 2 === 0
                    ? "#f8fafc"
                    : "#ffffff";

            doc
                .fillColor(rowColor)
                .rect(
                    tableX,
                    currentY,
                    tableWidth,
                    rowHeight
                )
                .fill();

            doc
                .lineWidth(0.5)
                .strokeColor("#cbd5e1")
                .rect(
                    tableX,
                    currentY,
                    tableWidth,
                    rowHeight
                )
                .stroke();

            doc
                .fontSize(9)
                .font("Helvetica-Bold")
                .fillColor("#334155")
                .text(
                    result.subjectCode,
                    tableX + 8,
                    currentY + 10,
                    {
                        width: colCode - 16
                    }
                );

            doc
                .font("Helvetica")
                .text(
                    result.subject,
                    tableX + colCode + 8,
                    currentY + 10,
                    {
                        width: colSubject - 16
                    }
                );

            doc
                .text(
                    `${result.marks} / ${result.totalMarks}`,
                    tableX + colCode + colSubject + 8,
                    currentY + 10,
                    {
                        width: colMarks - 16,
                        align: "center"
                    }
                );

            doc
                .font("Helvetica-Bold")
                .fillColor("#1e3a8a")
                .text(
                    result.grade,
                    tableX + colCode + colSubject + colMarks + 8,
                    currentY + 10,
                    {
                        width: colGrade - 16,
                        align: "center"
                    }
                );

            currentY += rowHeight;
        });

        // ==========================================
        // CALCULATE SUMMARY
        // ==========================================

        const totalMarks = results.reduce(
            (total, result) =>
                total + result.marks,
            0
        );

        const maxMarks = results.reduce(
            (total, result) =>
                total + result.totalMarks,
            0
        );

        const percentage =
            maxMarks > 0
                ? (
                    (totalMarks / maxMarks) * 100
                ).toFixed(2)
                : "0.00";

        const overallStatus =
            results.every(
                (result) =>
                    result.status === "Pass"
            )
                ? "PASS"
                : "FAIL";

        // ==========================================
        // RESULT SUMMARY BOX
        // ==========================================

        const summaryTop = currentY + 25;

        doc
            .lineWidth(0.8)
            .roundedRect(
                55,
                summaryTop,
                490,
                100,
                6
            )
            .stroke("#cbd5e1");

        doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "RESULT SUMMARY",
                70,
                summaryTop + 15
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Total Marks",
                70,
                summaryTop + 43
            );

        doc
            .font("Helvetica-Bold")
            .text(
                `${totalMarks} / ${maxMarks}`,
                170,
                summaryTop + 43
            );

        doc
            .font("Helvetica")
            .text(
                "Percentage",
                70,
                summaryTop + 66
            );

        doc
            .font("Helvetica-Bold")
            .text(
                `${percentage}%`,
                170,
                summaryTop + 66
            );

        doc
            .font("Helvetica")
            .text(
                "Result Status",
                330,
                summaryTop + 54
            );

        doc
            .font("Helvetica-Bold")
            .fillColor(
                overallStatus === "PASS"
                    ? "#15803d"
                    : "#dc2626"
            )
            .text(
                overallStatus,
                420,
                summaryTop + 54
            );

        // ==========================================
        // SIGNATURES
        // ==========================================

        const signatureY = 680;

        doc
            .fillColor("#334155")
            .fontSize(9)
            .font("Helvetica")
            .text(
                "________________________",
                75,
                signatureY
            );

        doc
            .text(
                "Class Coordinator",
                110,
                signatureY + 15
            );

        doc
            .text(
                "________________________",
                350,
                signatureY
            );

        doc
            .text(
                "Head of Department",
                385,
                signatureY + 15
            );

        // ==========================================
        // FOOTER
        // ==========================================

        doc
            .fontSize(8)
            .fillColor("#64748b")
            .text(
                "This is a computer-generated marksheet.",
                55,
                745,
                {
                    align: "center",
                    width: 490
                }
            );

        doc
            .text(
                "Smart College Management System",
                55,
                760,
                {
                    align: "center",
                    width: 490
                }
            );

        doc.end();

    } catch (error) {

        console.log(
            "Generate PDF error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to generate marksheet"
        });
    }
};


// ======================================================
// GENERATE STUDENT ADMIT CARD PDF
// ======================================================

const generateAdmitCardPDF = async (req, res) => {
    try {

        const studentId = req.user.id;

        const admitCard = await AdmitCard.findOne({
            student: studentId,
            status: "Generated"
        })
            .populate("student", "fullName email")
            .populate("exam");

        if (!admitCard) {
            return res.status(404).json({
                message: "No admit card available"
            });
        }

        // ==========================================
        // GENERATE QR CODE
        // ==========================================

        const verificationUrl =
            `http://localhost:5173/verify-admit-card/${admitCard.verificationCode}`;

        const qrCodeDataUrl = await QRCode.toDataURL(
            verificationUrl,
            {
                width: 180,
                margin: 2
            }
        );

        const qrCodeImage =
            Buffer.from(
                qrCodeDataUrl.split(",")[1],
                "base64"
            );

        const doc = new PDFDocument({
            size: "A4",
            margin: 45
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="student-admit-card.pdf"'
        );

        doc.pipe(res);

        // ==========================================
        // PAGE BORDER
        // ==========================================

        doc
            .lineWidth(1.5)
            .rect(30, 30, 535, 782)
            .stroke("#1e3a8a");

        doc
            .lineWidth(0.5)
            .rect(36, 36, 523, 770)
            .stroke("#94a3b8");

        // ==========================================
        // COLLEGE HEADER
        // ==========================================

        doc
            .fontSize(25)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "SMART COLLEGE",
                45,
                65,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor("#475569")
            .text(
                "COLLEGE MANAGEMENT SYSTEM",
                45,
                98,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(9)
            .fillColor("#64748b")
            .text(
                "Academic Year 2026",
                45,
                116,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .lineWidth(1)
            .moveTo(55, 140)
            .lineTo(545, 140)
            .stroke("#1e3a8a");

        // ==========================================
        // TITLE
        // ==========================================

        doc
            .fontSize(18)
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                "EXAMINATION ADMIT CARD",
                45,
                160,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#64748b")
            .text(
                "Semester Examination",
                45,
                185,
                {
                    align: "center",
                    width: 495
                }
            );

        // ==========================================
        // STUDENT INFORMATION
        // ==========================================

        const studentBoxTop = 220;

        doc
            .lineWidth(0.8)
            .roundedRect(
                55,
                studentBoxTop,
                490,
                145,
                6
            )
            .stroke("#cbd5e1");

        doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "STUDENT INFORMATION",
                70,
                studentBoxTop + 15
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Student Name",
                70,
                studentBoxTop + 45
            );

        doc
            .font("Helvetica-Bold")
            .text(
                admitCard.student.fullName,
                180,
                studentBoxTop + 45
            );

        doc
            .font("Helvetica")
            .text(
                "Email",
                70,
                studentBoxTop + 70
            );

        doc
            .font("Helvetica-Bold")
            .text(
                admitCard.student.email,
                180,
                studentBoxTop + 70
            );

        doc
            .font("Helvetica")
            .text(
                "Roll Number",
                70,
                studentBoxTop + 95
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.rollNumber,
                180,
                studentBoxTop + 95
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Semester",
                340,
                studentBoxTop + 95
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                String(admitCard.semester),
                410,
                studentBoxTop + 95
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Course",
                70,
                studentBoxTop + 120
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.course,
                180,
                studentBoxTop + 120
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Branch",
                340,
                studentBoxTop + 120
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.branch,
                410,
                studentBoxTop + 120
            );

        // ==========================================
        // EXAMINATION DETAILS
        // ==========================================

        const examBoxTop = 390;

        doc
            .lineWidth(0.8)
            .roundedRect(
                55,
                examBoxTop,
                490,
                165,
                6
            )
            .stroke("#cbd5e1");

        doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "EXAMINATION DETAILS",
                70,
                examBoxTop + 15
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Subject",
                70,
                examBoxTop + 45
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.exam.subject,
                180,
                examBoxTop + 45
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Subject Code",
                340,
                examBoxTop + 45
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.exam.subjectCode,
                420,
                examBoxTop + 45
            );

        const examDate = new Date(
            admitCard.exam.examDate
        ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Exam Date",
                70,
                examBoxTop + 75
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                examDate,
                180,
                examBoxTop + 75
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Exam Time",
                70,
                examBoxTop + 105
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.exam.examTime,
                180,
                examBoxTop + 105
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Exam Room",
                340,
                examBoxTop + 105
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.exam.room,
                420,
                examBoxTop + 105
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Status",
                70,
                examBoxTop + 135
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#15803d")
            .text(
                "GENERATED",
                180,
                examBoxTop + 135
            );

        // ==========================================
        // QR CODE
        // ==========================================

        const qrX = 395;
        const qrY = 575;

        doc.image(
            qrCodeImage,
            qrX,
            qrY,
            {
                width: 95,
                height: 95
            }
        );

        doc
            .fontSize(8)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "SCAN TO VERIFY",
                qrX - 5,
                qrY + 100,
                {
                    width: 105,
                    align: "center"
                }
            );

        doc
            .fontSize(6.5)
            .font("Helvetica")
            .fillColor("#64748b")
            .text(
                admitCard.verificationCode,
                qrX - 15,
                qrY + 114,
                {
                    width: 125,
                    align: "center"
                }
            );

        // ==========================================
        // IMPORTANT INSTRUCTIONS
        // ==========================================

        const instructionTop = 585;

        doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "IMPORTANT",
                70,
                instructionTop
            );

        doc
            .fontSize(8.5)
            .font("Helvetica")
            .fillColor("#475569")
            .text(
                "• Carry this admit card to the examination hall.",
                70,
                instructionTop + 20
            );

        doc.text(
            "• Reach the examination room before the scheduled time.",
            70,
            instructionTop + 36
        );

        doc.text(
            "• Follow all examination rules and instructions.",
            70,
            instructionTop + 52
        );

        // ==========================================
        // SIGNATURES
        // ==========================================

        const signatureY = 690;

        doc
            .fontSize(9)
            .fillColor("#334155")
            .text(
                "________________________",
                75,
                signatureY
            );

        doc.text(
            "Student Signature",
            115,
            signatureY + 15
        );

        doc.text(
            "________________________",
            350,
            signatureY
        );

        doc.text(
            "Authorized Signature",
            385,
            signatureY + 15
        );

        // ==========================================
        // FOOTER
        // ==========================================

        doc
            .fontSize(8)
            .fillColor("#64748b")
            .text(
                "This is a computer-generated admit card.",
                55,
                745,
                {
                    align: "center",
                    width: 490
                }
            );

        doc
            .text(
                "Smart College Management System",
                55,
                760,
                {
                    align: "center",
                    width: 490
                }
            );

        doc.end();

    } catch (error) {

        console.log(
            "Generate admit card PDF error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to generate admit card"
        });
    }
};


// ======================================================
// GENERATE ADMIN ADMIT CARD PDF
// ======================================================

const generateAdminAdmitCardPDF = async (req, res) => {
    try {

        const admitCardId = req.params.id;

        const admitCard = await AdmitCard.findOne({
            _id: admitCardId,
            status: "Generated"
        })
            .populate("student", "fullName email")
            .populate("exam");

        if (!admitCard) {
            return res.status(404).json({
                message: "Admit card not found"
            });
        }

        // ==========================================
        // GENERATE QR CODE
        // ==========================================

        const verificationUrl =
            `http://localhost:5173/verify-admit-card/${admitCard.verificationCode}`;

        const qrCodeDataUrl = await QRCode.toDataURL(
            verificationUrl,
            {
                width: 180,
                margin: 2
            }
        );

        const qrCodeImage =
            Buffer.from(
                qrCodeDataUrl.split(",")[1],
                "base64"
            );

        const doc = new PDFDocument({
            size: "A4",
            margin: 45
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="admit-card-${admitCard.rollNumber}.pdf"`
        );

        doc.pipe(res);

        // ==========================================
        // PAGE BORDER
        // ==========================================

        doc
            .lineWidth(1.5)
            .rect(30, 30, 535, 782)
            .stroke("#1e3a8a");

        doc
            .lineWidth(0.5)
            .rect(36, 36, 523, 770)
            .stroke("#94a3b8");

        // ==========================================
        // COLLEGE HEADER
        // ==========================================

        doc
            .fontSize(25)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "SMART COLLEGE",
                45,
                65,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor("#475569")
            .text(
                "COLLEGE MANAGEMENT SYSTEM",
                45,
                98,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(9)
            .fillColor("#64748b")
            .text(
                "Academic Year 2026",
                45,
                116,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .lineWidth(1)
            .moveTo(55, 140)
            .lineTo(545, 140)
            .stroke("#1e3a8a");

        // ==========================================
        // TITLE
        // ==========================================

        doc
            .fontSize(18)
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                "EXAMINATION ADMIT CARD",
                45,
                160,
                {
                    align: "center",
                    width: 495
                }
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#64748b")
            .text(
                "Semester Examination",
                45,
                185,
                {
                    align: "center",
                    width: 495
                }
            );

        // ==========================================
        // STUDENT INFORMATION
        // ==========================================

        const studentBoxTop = 220;

        doc
            .lineWidth(0.8)
            .roundedRect(
                55,
                studentBoxTop,
                490,
                145,
                6
            )
            .stroke("#cbd5e1");

        doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "STUDENT INFORMATION",
                70,
                studentBoxTop + 15
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Student Name",
                70,
                studentBoxTop + 45
            );

        doc
            .font("Helvetica-Bold")
            .text(
                admitCard.student.fullName,
                180,
                studentBoxTop + 45
            );

        doc
            .font("Helvetica")
            .text(
                "Email",
                70,
                studentBoxTop + 70
            );

        doc
            .font("Helvetica-Bold")
            .text(
                admitCard.student.email,
                180,
                studentBoxTop + 70
            );

        doc
            .font("Helvetica")
            .text(
                "Roll Number",
                70,
                studentBoxTop + 95
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.rollNumber,
                180,
                studentBoxTop + 95
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Semester",
                340,
                studentBoxTop + 95
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                String(admitCard.semester),
                410,
                studentBoxTop + 95
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Course",
                70,
                studentBoxTop + 120
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.course,
                180,
                studentBoxTop + 120
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Branch",
                340,
                studentBoxTop + 120
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.branch,
                410,
                studentBoxTop + 120
            );

        // ==========================================
        // EXAMINATION DETAILS
        // ==========================================

        const examBoxTop = 390;

        doc
            .lineWidth(0.8)
            .roundedRect(
                55,
                examBoxTop,
                490,
                165,
                6
            )
            .stroke("#cbd5e1");

        doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "EXAMINATION DETAILS",
                70,
                examBoxTop + 15
            );

        doc
            .fontSize(9)
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Subject",
                70,
                examBoxTop + 45
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.exam.subject,
                180,
                examBoxTop + 45
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Subject Code",
                340,
                examBoxTop + 45
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.exam.subjectCode,
                420,
                examBoxTop + 45
            );

        const examDate = new Date(
            admitCard.exam.examDate
        ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Exam Date",
                70,
                examBoxTop + 75
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                examDate,
                180,
                examBoxTop + 75
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Exam Time",
                70,
                examBoxTop + 105
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.exam.examTime,
                180,
                examBoxTop + 105
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Exam Room",
                340,
                examBoxTop + 105
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                admitCard.exam.room,
                420,
                examBoxTop + 105
            );

        doc
            .font("Helvetica")
            .fillColor("#334155")
            .text(
                "Status",
                70,
                examBoxTop + 135
            );

        doc
            .font("Helvetica-Bold")
            .fillColor("#15803d")
            .text(
                "GENERATED",
                180,
                examBoxTop + 135
            );

        // ==========================================
        // QR CODE
        // ==========================================

        const qrX = 395;
        const qrY = 575;

        doc.image(
            qrCodeImage,
            qrX,
            qrY,
            {
                width: 95,
                height: 95
            }
        );

        doc
            .fontSize(8)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "SCAN TO VERIFY",
                qrX - 5,
                qrY + 100,
                {
                    width: 105,
                    align: "center"
                }
            );

        doc
            .fontSize(6.5)
            .font("Helvetica")
            .fillColor("#64748b")
            .text(
                admitCard.verificationCode,
                qrX - 15,
                qrY + 114,
                {
                    width: 125,
                    align: "center"
                }
            );

        // ==========================================
        // IMPORTANT INSTRUCTIONS
        // ==========================================

        const instructionTop = 585;

        doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fillColor("#1e3a8a")
            .text(
                "IMPORTANT",
                70,
                instructionTop
            );

        doc
            .fontSize(8.5)
            .font("Helvetica")
            .fillColor("#475569")
            .text(
                "• Carry this admit card to the examination hall.",
                70,
                instructionTop + 20
            );

        doc.text(
            "• Reach the examination room before the scheduled time.",
            70,
            instructionTop + 36
        );

        doc.text(
            "• Follow all examination rules and instructions.",
            70,
            instructionTop + 52
        );

        // ==========================================
        // SIGNATURES
        // ==========================================

        const signatureY = 690;

        doc
            .fontSize(9)
            .fillColor("#334155")
            .text(
                "________________________",
                75,
                signatureY
            );

        doc.text(
            "Student Signature",
            115,
            signatureY + 15
        );

        doc.text(
            "________________________",
            350,
            signatureY
        );

        doc.text(
            "Authorized Signature",
            385,
            signatureY + 15
        );

        // ==========================================
        // FOOTER
        // ==========================================

        doc
            .fontSize(8)
            .fillColor("#64748b")
            .text(
                "This is a computer-generated admit card.",
                55,
                745,
                {
                    align: "center",
                    width: 490
                }
            );

        doc
            .text(
                "Smart College Management System",
                55,
                760,
                {
                    align: "center",
                    width: 490
                }
            );

        doc.end();

    } catch (error) {

        console.log(
            "Generate admin admit card PDF error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to generate admit card"
        });
    }
};


// ======================================================
// EXPORT FUNCTIONS
// ======================================================

module.exports = {
    generateResultPDF,
    generateAdmitCardPDF,
    generateAdminAdmitCardPDF
};