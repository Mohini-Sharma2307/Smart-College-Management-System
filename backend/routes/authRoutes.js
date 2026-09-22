
const express = require("express");

const {
    registerUser,
    loginUser,
    updateMyProfile,
    uploadProfilePhoto,
    changePassword
} = require("../controllers/authController");

const {
    createAdmin
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// ================================
// Student Registration
// ================================

router.post(
    "/register",
    registerUser
);


// ================================
// Student Login
// ================================

router.post(
    "/login",
    loginUser
);


// ================================
// Create Admin
// ================================

router.post(
    "/create-admin",
    createAdmin
);


// ================================
// Protected Profile Route
// ================================

router.get(
    "/profile",
    authMiddleware,
    (req, res) => {

        res.status(200).json({
            message:
                "Protected route accessed successfully",

            user: req.user
        });

    }
);


// ================================
// Student Only Route
// ================================

router.get(
    "/student-only",
    authMiddleware,
    roleMiddleware(["student"]),
    (req, res) => {

        res.status(200).json({
            message:
                "Student-only route accessed successfully",

            user: req.user
        });

    }
);


// ================================
// Admin Only Route
// ================================

router.get(
    "/admin-only",
    authMiddleware,
    roleMiddleware(["admin"]),
    (req, res) => {

        res.status(200).json({
            message:
                "Admin-only route accessed successfully",

            user: req.user
        });

    }
);


// ================================
// Update Profile
// ================================

router.put(
    "/profile",
    authMiddleware,
    updateMyProfile
);


// ================================
// Upload Profile Photo
// ================================

router.put(
    "/profile/photo",
    authMiddleware,
    upload.single("profilePhoto"),
    uploadProfilePhoto
);


// ================================
// Change Password
// ================================

router.put(
    "/change-password",
    authMiddleware,
    changePassword
);


module.exports = router;