const mongoose = require("mongoose");

const admitCardSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true
        },

        rollNumber: {
            type: String,
            required: true,
            trim: true
        },

        course: {
            type: String,
            required: true,
            trim: true
        },

        branch: {
            type: String,
            required: true,
            trim: true
        },

        semester: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["Generated", "Cancelled"],
            default: "Generated"
        },

        verificationCode: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const AdmitCard = mongoose.model(
    "AdmitCard",
    admitCardSchema
);

module.exports = AdmitCard;