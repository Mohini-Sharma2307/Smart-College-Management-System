
const Result = require("../models/Result");

// Get student's own results
const getMyResults = async (req, res) => {
    try {
        const results = await Result.find({
            student: req.user.id
        }).sort({
            semester: 1,
            subject: 1
        });

        res.status(200).json({
            message: "Results fetched successfully",
            results
        });

    } catch (error) {
        console.log(
            "Get results error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Admin → Create result
const createResult = async (req, res) => {
    try {
        const {
            student,
            subject,
            subjectCode,
            semester,
            marks,
            totalMarks,
            grade,
            status
        } = req.body;

        if (
            !student ||
            !subject ||
            !subjectCode ||
            !semester ||
            marks === undefined ||
            !totalMarks ||
            !grade ||
            !status
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await Result.create({
            student,
            subject,
            subjectCode,
            semester,
            marks,
            totalMarks,
            grade,
            status
        });

        res.status(201).json({
            message: "Result created successfully",
            result
        });

    } catch (error) {
        console.log(
            "Create result error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getMyResults,
    createResult
};
