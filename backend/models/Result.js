
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        subjectCode: {
            type: String,
            required: true,
            trim: true
        },

        semester: {
            type: Number,
            required: true
        },

        marks: {
            type: Number,
            required: true,
            min: 0
        },

        totalMarks: {
            type: Number,
            required: true,
            min: 1
        },

        grade: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["Pass", "Fail"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
