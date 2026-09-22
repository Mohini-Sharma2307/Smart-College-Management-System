const mongoose = require("mongoose");

const offerLetterSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        application: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobApplication",
            required: true
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },

        offerDate: {
            type: Date,
            required: true
        },

        joiningDate: {
            type: Date,
            required: true
        },

        salary: {
            type: String,
            required: true,
            trim: true
        },

        jobLocation: {
            type: String,
            required: true,
            trim: true
        },

        offerStatus: {
            type: String,
            enum: [
                "Issued",
                "Accepted",
                "Declined",
                "Cancelled"
            ],
            default: "Issued"
        },

        offerLetterFile: {
            type: String,
            trim: true
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

const OfferLetter = mongoose.model(
    "OfferLetter",
    offerLetterSchema
);

module.exports = OfferLetter;