
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {
        application: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobApplication",
            required: true
        },

        interviewType: {
            type: String,
            enum: [
                "Online",
                "Offline"
            ],
            required: true
        },

        interviewRound: {
            type: String,
            enum: [
                "Aptitude",
                "Technical",
                "HR",
                "Managerial",
                "Final"
            ],
            required: true
        },

        interviewDate: {
            type: Date,
            required: true
        },

        interviewTime: {
            type: String,
            required: true
        },

        meetingLink: {
            type: String,
            trim: true
        },

        venue: {
            type: String,
            trim: true
        },

        interviewer: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Scheduled",
                "Completed",
                "Cancelled"
            ],
            default: "Scheduled"
        },

        remarks: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Interview = mongoose.model(
    "Interview",
    interviewSchema
);

module.exports = Interview;

