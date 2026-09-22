const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const admin = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role: "admin"
        });

        res.status(201).json({
            message: "Admin created successfully",
            user: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.log("Admin creation error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { 
    createAdmin
};