
const mongoose = require("mongoose");

const placementRecordSchema = new mongoose.Schema(
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

        offerLetter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OfferLetter"
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

        placementYear: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Placed",
                "Joined",
                "Not Joined"
            ],
            default: "Placed"
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

const PlacementRecord = mongoose.model(
    "PlacementRecord",
    placementRecordSchema
);

module.exports = PlacementRecord;

