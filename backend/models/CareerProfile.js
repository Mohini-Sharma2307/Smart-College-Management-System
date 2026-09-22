const mongoose = require("mongoose");

const careerProfileSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        skills: {
            type: [String],
            default: []
        },

        interests: {
            type: [String],
            default: []
        },

        preferredJobRole: {
            type: String,
            trim: true
        },

        preferredIndustry: {
            type: String,
            trim: true
        },

        cgpa: {
            type: Number,
            min: 0,
            max: 10
        },

        experienceLevel: {
            type: String,
            enum: [
                "Fresher",
                "Internship Experience",
                "Experienced"
            ],
            default: "Fresher"
        },

        careerGoal: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const CareerProfile = mongoose.model(
    "CareerProfile",
    careerProfileSchema
);

module.exports = CareerProfile;