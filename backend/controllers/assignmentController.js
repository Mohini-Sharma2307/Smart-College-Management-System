
const Assignment = require("../models/Assignment");

// ==========================================
// Admin - Create Assignment
// ==========================================
const createAssignment = async (req, res) => {
    try {
        const {
            title,
            description,
            subject,
            dueDate,
            assignmentFile
        } = req.body;

        // Validate required fields
        if (
            !title ||
            !description ||
            !subject ||
            !dueDate
        ) {
            return res.status(400).json({
                message: "All required fields are required"
            });
        }

        const assignment = await Assignment.create({
            title,
            description,
            subject,
            dueDate,
            assignmentFile: assignmentFile || "",
            createdBy: req.user.id
        });

        // Populate subject and creator
        const completeAssignment =
            await Assignment.findById(assignment._id)
                .populate(
                    "subject",
                    "name code semester credits"
                )
                .populate(
                    "createdBy",
                    "fullName email"
                );

        res.status(201).json({
            message: "Assignment created successfully",
            assignment: completeAssignment
        });

    } catch (error) {
        console.log(
            "Create assignment error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Admin - Get All Assignments
// ==========================================
const getAllAssignments = async (req, res) => {
    try {
        const assignments =
            await Assignment.find()
                .populate(
                    "subject",
                    "name code semester credits"
                )
                .populate(
                    "createdBy",
                    "fullName email"
                )
                .sort({
                    dueDate: 1
                });

        res.status(200).json({
            message: "Assignments fetched successfully",
            assignments
        });

    } catch (error) {
        console.log(
            "Get assignments error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Student - Get Available Assignments
// ==========================================
const getStudentAssignments = async (req, res) => {
    try {
        const assignments =
            await Assignment.find()
                .populate(
                    "subject",
                    "name code semester credits"
                )
                .populate(
                    "createdBy",
                    "fullName"
                )
                .sort({
                    dueDate: 1
                });

        res.status(200).json({
            message:
                "Student assignments fetched successfully",

            assignments
        });

    } catch (error) {
        console.log(
            "Get student assignments error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createAssignment,
    getAllAssignments,
    getStudentAssignments
};

