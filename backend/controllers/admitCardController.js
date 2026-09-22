const AdmitCard = require("../models/AdmitCard");
const User = require("../models/User");
const Exam = require("../models/Exam");

// Student - Get My Admit Cards
const getMyAdmitCard = async (req, res) => {
    try {
        const studentId = req.user.id;

        const admitCards = await AdmitCard.find({
            student: studentId,
            status: "Generated"
        })
            .populate("student", "fullName email")
            .populate("exam")
            .sort({ createdAt: -1 });

        if (admitCards.length === 0) {
            return res.status(404).json({
                message: "No admit card available"
            });
        }

        res.status(200).json({
            message: "Admit cards fetched successfully",
            admitCards
        });

    } catch (error) {
        console.log(
            "Get admit card error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Admin - Get All Admit Cards
const getAllAdmitCards = async (req, res) => {
    try {
        const admitCards = await AdmitCard.find()
            .populate("student", "fullName email")
            .populate(
                "exam",
                "subject subjectCode semester examDate examTime room"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Admit cards fetched successfully",
            admitCards
        });

    } catch (error) {
        console.log(
            "Get all admit cards error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Admin - Generate Admit Card
const createAdmitCard = async (req, res) => {
    try {
        const {
            student,
            exam,
            rollNumber,
            course,
            branch,
            semester
        } = req.body;

        if (
            !student ||
            !exam ||
            !rollNumber ||
            !course ||
            !branch ||
            !semester
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const studentExists = await User.findOne({
            _id: student,
            role: "student"
        });

        if (!studentExists) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const examExists = await Exam.findById(exam);

        if (!examExists) {
            return res.status(404).json({
                message: "Exam not found"
            });
        }

        const existingAdmitCard = await AdmitCard.findOne({
            student,
            exam
        });

        if (existingAdmitCard) {
            return res.status(400).json({
                message:
                    "Admit card already generated for this exam"
            });
        }

        const verificationCode =
            `AC-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)
                .toUpperCase()}`;

        const admitCard = await AdmitCard.create({
            student,
            exam,
            rollNumber,
            course,
            branch,
            semester,
            status: "Generated",
            verificationCode
        });

        const completeAdmitCard =
            await AdmitCard.findById(admitCard._id)
                .populate("student", "fullName email")
                .populate("exam");

        res.status(201).json({
            message:
                "Admit card generated successfully",
            admitCard: completeAdmitCard
        });

    } catch (error) {
        console.log(
            "Create admit card error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Public - Verify Admit Card
const verifyAdmitCard = async (req, res) => {
    try {
        const { verificationCode } = req.params;

        if (!verificationCode) {
            return res.status(400).json({
                valid: false,
                message:
                    "Verification code is required"
            });
        }

        const admitCard =
            await AdmitCard.findOne({
                verificationCode,
                status: "Generated"
            })
                .populate("student", "fullName")
                .populate("exam");

        if (!admitCard) {
            return res.status(404).json({
                valid: false,
                message:
                    "Invalid or cancelled admit card"
            });
        }

        res.status(200).json({
            valid: true,
            message:
                "Admit card verified successfully",

            admitCard: {
                _id: admitCard._id,

                student: {
                    fullName:
                        admitCard.student?.fullName
                },

                rollNumber:
                    admitCard.rollNumber,

                course:
                    admitCard.course,

                branch:
                    admitCard.branch,

                semester:
                    admitCard.semester,

                status:
                    admitCard.status,

                verificationCode:
                    admitCard.verificationCode,

                exam: {
                    subject:
                        admitCard.exam?.subject,

                    subjectCode:
                        admitCard.exam?.subjectCode,

                    semester:
                        admitCard.exam?.semester,

                    examDate:
                        admitCard.exam?.examDate,

                    examTime:
                        admitCard.exam?.examTime,

                    room:
                        admitCard.exam?.room
                }
            }
        });

    } catch (error) {
        console.log(
            "Verify admit card error:",
            error.message
        );

        res.status(500).json({
            valid: false,
            message:
                "Unable to verify admit card"
        });
    }
};


module.exports = {
    getMyAdmitCard,
    getAllAdmitCards,
    createAdmitCard,
    verifyAdmitCard
};