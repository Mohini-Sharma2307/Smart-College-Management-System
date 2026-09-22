const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },

        resume: {
            type: String,
            trim: true
        },

        coverLetter: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Shortlisted",
                "Rejected",
                "Selected"
            ],
            default: "Applied"
        },

        appliedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const JobApplication = mongoose.model(
    "JobApplication",
    jobApplicationSchema
);

module.exports = JobApplication;
