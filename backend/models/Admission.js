const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
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

        admissionYear: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Admission = mongoose.model(
    "Admission",
    admissionSchema
);

module.exports = Admission;