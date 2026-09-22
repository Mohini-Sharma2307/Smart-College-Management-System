
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// Student → Register
// ==========================================

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // ==========================================
        // CHECK REQUIRED FIELDS
        // ==========================================

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // ==========================================
        // CLEAN INPUT
        // ==========================================

        const cleanFullName = fullName.trim();
        const cleanEmail = email.trim().toLowerCase();

        // ==========================================
        // BASIC VALIDATION
        // ==========================================

        if (cleanFullName.length < 3) {
            return res.status(400).json({
                message:
                    "Full name must be at least 3 characters"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters"
            });
        }

        // ==========================================
        // CHECK EMAIL ALREADY EXISTS
        // ==========================================

        const existingUser = await User.findOne({
            email: cleanEmail
        });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "Email already registered"
            });
        }

        // ==========================================
        // HASH PASSWORD
        // ==========================================

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // ==========================================
        // CREATE STUDENT
        // ==========================================

        const user = await User.create({
            fullName: cleanFullName,
            email: cleanEmail,
            password: hashedPassword,
            role: "student"
        });

        // ==========================================
        // GENERATE JWT TOKEN
        // ==========================================

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // ==========================================
        // REGISTRATION SUCCESS
        // ==========================================

        res.status(201).json({
            message:
                "Student registered successfully",

            token,

            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,

                contactNumber:
                    user.contactNumber || "",

                course:
                    user.course || "",

                branch:
                    user.branch || "",

                semester:
                    user.semester ?? null,

                rollNumber:
                    user.rollNumber || "",

                profilePhoto:
                    user.profilePhoto || "",

                createdAt:
                    user.createdAt
            }
        });

    } catch (error) {

        console.log(
            "Registration error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Student/Admin → Login
// ==========================================

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // ==========================================
        // CHECK REQUIRED FIELDS
        // ==========================================

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required"
            });
        }

        // ==========================================
        // FIND USER
        // ==========================================

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        // ==========================================
        // COMPARE PASSWORD
        // ==========================================

        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        // ==========================================
        // UPDATE LAST LOGIN
        // ==========================================

        user.lastLogin = new Date();

        await user.save();

        // ==========================================
        // GENERATE JWT TOKEN
        // ==========================================

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // ==========================================
        // LOGIN SUCCESSFUL
        // ==========================================

        res.status(200).json({

            message: "Login successful",

            token,

            user: {
                id: user._id,

                fullName:
                    user.fullName,

                email:
                    user.email,

                role:
                    user.role,

                contactNumber:
                    user.contactNumber || "",

                course:
                    user.course || "",

                branch:
                    user.branch || "",

                semester:
                    user.semester ?? null,

                rollNumber:
                    user.rollNumber || "",

                profilePhoto:
                    user.profilePhoto || "",

                lastLogin:
                    user.lastLogin,

                createdAt:
                    user.createdAt
            }
        });

    } catch (error) {

        console.log(
            "Login error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Student → Update Profile
// ==========================================

const updateMyProfile = async (req, res) => {

    try {

        const {
            fullName,
            contactNumber,
            course,
            branch,
            semester,
            rollNumber
        } = req.body;

        // ==========================================
        // CHECK FULL NAME
        // ==========================================

        if (!fullName || !fullName.trim()) {

            return res.status(400).json({
                message:
                    "Full name is required"
            });
        }

        // ==========================================
        // FIND USER
        // ==========================================

        const user =
            await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message:
                    "User not found"
            });
        }

        // ==========================================
        // UPDATE PROFILE
        // ==========================================

        user.fullName =
            fullName.trim();

        user.contactNumber =
            contactNumber?.trim() || "";

        user.course =
            course?.trim() || "";

        user.branch =
            branch?.trim() || "";

        user.rollNumber =
            rollNumber?.trim() || "";

        // ==========================================
        // SEMESTER
        // ==========================================

        if (
            semester === "" ||
            semester === null ||
            semester === undefined
        ) {

            user.semester = null;

        } else {

            const semesterNumber =
                Number(semester);

            if (
                !Number.isInteger(
                    semesterNumber
                ) ||
                semesterNumber < 1
            ) {

                return res.status(400).json({
                    message:
                        "Semester must be a valid number"
                });
            }

            user.semester =
                semesterNumber;
        }

        // ==========================================
        // SAVE USER
        // ==========================================

        await user.save();

        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(200).json({

            message:
                "Profile updated successfully",

            user: {

                id: user._id,

                fullName:
                    user.fullName,

                email:
                    user.email,

                role:
                    user.role,

                contactNumber:
                    user.contactNumber,

                course:
                    user.course,

                branch:
                    user.branch,

                semester:
                    user.semester,

                rollNumber:
                    user.rollNumber,

                profilePhoto:
                    user.profilePhoto,

                lastLogin:
                    user.lastLogin,

                createdAt:
                    user.createdAt,

                updatedAt:
                    user.updatedAt
            }
        });

    } catch (error) {

        console.log(
            "Update profile error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Student → Upload Profile Photo
// ==========================================

const uploadProfilePhoto = async (req, res) => {

    try {

        // ==========================================
        // CHECK PHOTO
        // ==========================================

        if (!req.file) {

            return res.status(400).json({
                message:
                    "Please select a profile photo"
            });
        }

        // ==========================================
        // FIND USER
        // ==========================================

        const user =
            await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message:
                    "User not found"
            });
        }

        // ==========================================
        // SAVE PHOTO PATH
        // ==========================================

        user.profilePhoto =
            `/uploads/${req.file.filename}`;

        await user.save();

        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(200).json({

            message:
                "Profile photo uploaded successfully",

            user: {

                id: user._id,

                fullName:
                    user.fullName,

                email:
                    user.email,

                role:
                    user.role,

                contactNumber:
                    user.contactNumber,

                course:
                    user.course,

                branch:
                    user.branch,

                semester:
                    user.semester,

                rollNumber:
                    user.rollNumber,

                profilePhoto:
                    user.profilePhoto,

                lastLogin:
                    user.lastLogin,

                createdAt:
                    user.createdAt,

                updatedAt:
                    user.updatedAt
            }
        });

    } catch (error) {

        console.log(
            "Profile photo upload error:",
            error.message
        );

        res.status(500).json({
            message:
                "Unable to upload profile photo"
        });
    }
};


// ==========================================
// CHANGE PASSWORD
// ==========================================

const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        // ==========================================
        // CHECK FIELDS
        // ==========================================

        if (!currentPassword || !newPassword) {

            return res.status(400).json({
                message:
                    "Current password and new password are required"
            });
        }

        // ==========================================
        // PASSWORD LENGTH
        // ==========================================

        if (newPassword.length < 6) {

            return res.status(400).json({
                message:
                    "New password must be at least 6 characters"
            });
        }

        // ==========================================
        // FIND LOGGED-IN USER
        // ==========================================

        const user =
            await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message:
                    "User not found"
            });
        }

        // ==========================================
        // CHECK CURRENT PASSWORD
        // ==========================================

        const isPasswordCorrect =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isPasswordCorrect) {

            return res.status(401).json({
                message:
                    "Current password is incorrect"
            });
        }

        // ==========================================
        // PREVENT SAME PASSWORD
        // ==========================================

        const isSamePassword =
            await bcrypt.compare(
                newPassword,
                user.password
            );

        if (isSamePassword) {

            return res.status(400).json({
                message:
                    "New password must be different from current password"
            });
        }

        // ==========================================
        // HASH NEW PASSWORD
        // ==========================================

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.password =
            hashedPassword;

        await user.save();

        // ==========================================
        // SUCCESS
        // ==========================================

        res.status(200).json({
            message:
                "Password changed successfully"
        });

    } catch (error) {

        console.log(
            "Change password error:",
            error.message
        );

        res.status(500).json({
            message:
                "Unable to change password"
        });
    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    registerUser,
    loginUser,
    updateMyProfile,
    uploadProfilePhoto,
    changePassword
};