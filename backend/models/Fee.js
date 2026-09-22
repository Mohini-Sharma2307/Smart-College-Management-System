const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        totalFee: {
            type: Number,
            required: true,
            min: 0
        },

        paidFee: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        remainingFee: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["Paid", "Partial", "Pending"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const Fee = mongoose.model("Fee", feeSchema);

module.exports = Fee;