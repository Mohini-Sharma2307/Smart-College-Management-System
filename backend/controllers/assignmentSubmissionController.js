const AssignmentSubmission = require("../models/AssignmentSubmission");
const Assignment = require("../models/Assignment");

// ==========================================
// Student - Submit Assignment
// ==========================================

const submitAssignment = async (req, res) => {
    try {
        const {
            assignment,
            answer
        } = req.body;

        if (!assignment) {
            return res.status(400).json({
                message: "Assignment is required"
            });
        }

        // Check assignment exists
        const existingAssignment =
            await Assignment.findById(assignment);

        if (!existingAssignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        // Check if already submitted
        const alreadySubmitted =
            await AssignmentSubmission.findOne({
                student: req.user.id,
                assignment
            });

        if (alreadySubmitted) {
            return res.status(400).json({
                message:
                    "You have already submitted this assignment"
            });
        }

        // Check late submission
        const currentDate = new Date();
        const dueDate = new Date(
            existingAssignment.dueDate
        );

        const status =
            currentDate > dueDate
                ? "Late"
                : "Submitted";

        // Uploaded file path
        let submissionFile = "";

        if (req.file) {
            submissionFile =
                `/uploads/${req.file.filename}`;
        }

        // Create submission
        const submission =
            await AssignmentSubmission.create({
                student: req.user.id,
                assignment,
                answer: answer || "",
                submissionFile,
                submittedAt: currentDate,
                status
            });

        // Get complete submission
        const completeSubmission =
            await AssignmentSubmission.findById(
                submission._id
            )
                .populate(
                    "student",
                    "fullName email"
                )
                .populate({
                    path: "assignment",
                    populate: {
                        path: "subject",
                        select:
                            "name code semester credits"
                    }
                });

        res.status(201).json({
            message:
                "Assignment submitted successfully",
            submission: completeSubmission
        });

    } catch (error) {

        console.log(
            "Submit assignment error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Student - Get My Submissions
// ==========================================

const getMySubmissions = async (req, res) => {
    try {

        const submissions =
            await AssignmentSubmission.find({
                student: req.user.id
            })
                .populate({
                    path: "assignment",
                    populate: {
                        path: "subject",
                        select:
                            "name code semester credits"
                    }
                })
                .sort({
                    submittedAt: -1
                });

        res.status(200).json({
            message:
                "Your submissions fetched successfully",
            submissions
        });

    } catch (error) {

        console.log(
            "Get submissions error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

// ==========================================
// Admin - Get All Assignment Submissions
// ==========================================

const getAllSubmissions = async (req, res) => {
    try {
        const submissions =
            await AssignmentSubmission.find()
                .populate("student", "fullName email")
                .populate({
                    path: "assignment",
                    populate: {
                        path: "subject",
                        select: "name code semester credits"
                    }
                })
                .sort({
                    submittedAt: -1
                });

        res.status(200).json({
            message: "All submissions fetched successfully",
            submissions
        });

    } catch (error) {

        console.log(
            "Get all submissions error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Admin - Give Marks & Feedback
// ==========================================

const evaluateSubmission = async (req, res) => {
    try {
        const { marks, feedback } = req.body;

        const submission =
            await AssignmentSubmission.findById(
                req.params.id
            );

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        if (
            marks === undefined ||
            marks === null ||
            marks === ""
        ) {
            return res.status(400).json({
                message: "Marks are required"
            });
        }

        submission.marks = Number(marks);
        submission.feedback = feedback || "";

        await submission.save();

        const updatedSubmission =
            await AssignmentSubmission.findById(
                submission._id
            )
                .populate(
                    "student",
                    "fullName email"
                )
                .populate({
                    path: "assignment",
                    populate: {
                        path: "subject",
                        select:
                            "name code semester credits"
                    }
                });

        res.status(200).json({
            message:
                "Submission evaluated successfully",
            submission: updatedSubmission
        });

    } catch (error) {

        console.log(
            "Evaluate submission error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    submitAssignment,
    getMySubmissions,
    getAllSubmissions,
    evaluateSubmission
};