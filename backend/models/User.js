
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // ===============================
        // BASIC INFORMATION
        // ===============================

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        // ===============================
        // USER ROLE
        // ===============================

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student"
        },

        // ===============================
        // PROFILE INFORMATION
        // ===============================

        contactNumber: {
            type: String,
            default: "",
            trim: true
        },

        // ===============================
        // ACADEMIC INFORMATION
        // ===============================

        course: {
            type: String,
            default: "",
            trim: true
        },

        branch: {
            type: String,
            default: "",
            trim: true
        },

        semester: {
            type: Number,
            default: null
        },

        rollNumber: {
            type: String,
            default: "",
            trim: true
        },

        // ===============================
        // PROFILE PHOTO
        // ===============================

        profilePhoto: {
            type: String,
            default: ""
        },

        // ===============================
        // LOGIN INFORMATION
        // ===============================

        lastLogin: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

