const mongoose = require("mongoose");

const feeReceiptSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        receiptNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        amount: {
            type: Number,
            required: true
        },

        paymentDate: {
            type: Date,
            required: true,
            default: Date.now
        },

        paymentMode: {
            type: String,
            enum: ["Cash", "UPI", "Card", "Bank Transfer"],
            required: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        status: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Paid"
        }
    },
    {
        timestamps: true
    }
);

const FeeReceipt = mongoose.model(
    "FeeReceipt",
    feeReceiptSchema
);

module.exports = FeeReceipt;