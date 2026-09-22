const mongoose = require("mongoose");

const assignmentSubmissionSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        assignment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
            required: true
        },

        answer: {
            type: String,
            default: "",
            trim: true
        },

        submissionFile: {
            type: String,
            default: ""
        },

        submittedAt: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["Submitted", "Late"],
            default: "Submitted"
        },

        marks: {
            type: Number,
            default: null
        },

        feedback: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const AssignmentSubmission = mongoose.model(
    "AssignmentSubmission",
    assignmentSubmissionSchema
);

module.exports = AssignmentSubmission;