
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        code: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        semester: {
            type: Number,
            required: true
        },

        credits: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;

