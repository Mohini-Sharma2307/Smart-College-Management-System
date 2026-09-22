
const Exam = require("../models/Exam");

// Get all exams
const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find()
            .sort({ examDate: 1 });

        res.status(200).json({
            message: "Exams fetched successfully",
            exams
        });

    } catch (error) {
        console.log(
            "Get exams error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Create exam
const createExam = async (req, res) => {
    try {
        const {
            subject,
            subjectCode,
            semester,
            examDate,
            examTime,
            room
        } = req.body;

        if (
            !subject ||
            !subjectCode ||
            !semester ||
            !examDate ||
            !examTime ||
            !room
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const exam = await Exam.create({
            subject,
            subjectCode,
            semester,
            examDate,
            examTime,
            room
        });

        res.status(201).json({
            message: "Exam created successfully",
            exam
        });

    } catch (error) {
        console.log(
            "Create exam error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getAllExams,
    createExam
};
