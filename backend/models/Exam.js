
const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
    {
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

        examDate: {
            type: Date,
            required: true
        },

        examTime: {
            type: String,
            required: true,
            trim: true
        },

        room: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;

