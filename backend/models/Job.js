
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        requiredSkills: {
            type: [String],
            default: []
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        jobType: {
            type: String,
            enum: [
                "Full Time",
                "Part Time",
                "Internship"
            ],
            required: true
        },

        salary: {
            type: String,
            trim: true
        },

        applicationDeadline: {
            type: Date,
            required: true
        },

        eligibility: {
            type: String,
            trim: true
        },

        minimumCGPA: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: [
                "Open",
                "Closed",
                "Draft"
            ],
            default: "Open"
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

