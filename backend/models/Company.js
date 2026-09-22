const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        industry: {
            type: String,
            required: true,
            trim: true
        },

        website: {
            type: String,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        contactEmail: {
            type: String,
            trim: true,
            lowercase: true
        },

        contactPhone: {
            type: String,
            trim: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;