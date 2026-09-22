const bcrypt = require("bcryptjs");
const User = require("../models/User");


// ===============================
// GET ALL STUDENTS
// ===============================

const getAllStudents = async (req, res) => {
    try {

        const students = await User.find(
            { role: "student" },
            "-password"
        ).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Students fetched successfully",
            students
        });

    } catch (error) {

        console.log(
            "Get students error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// CREATE STUDENT
// ===============================

const createStudent = async (req, res) => {
    try {

        const {
            fullName,
            email,
            password
        } = req.body;


        // Check required fields
        if (!fullName || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Check existing email
        const existingStudent = await User.findOne({
            email
        });

        if (existingStudent) {

            return res.status(400).json({
                message: "Email already registered"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create student
        const student = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role: "student"
        });


        // Response
        res.status(201).json({

            message: "Student created successfully",

            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email,
                role: student.role
            }
        });

    } catch (error) {

        console.log(
            "Create student error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// DELETE STUDENT
// ===============================

const deleteStudent = async (req, res) => {
    try {

        const { id } = req.params;


        // Find only student
        const student = await User.findOne({
            _id: id,
            role: "student"
        });


        // Student not found
        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });
        }


        // Delete student
        await User.findByIdAndDelete(id);


        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        console.log(
            "Delete student error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

// ===============================
// UPDATE STUDENT
// ===============================

const updateStudent = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            fullName,
            email
        } = req.body;


        // Check required fields
        if (!fullName || !email) {

            return res.status(400).json({
                message: "Full name and email are required"
            });
        }


        // Find student
        const student = await User.findOne({
            _id: id,
            role: "student"
        });


        // Student not found
        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });
        }


        // Check email already used by another user
        const existingUser = await User.findOne({
            email,
            _id: { $ne: id }
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });
        }


        // Update student
        student.fullName = fullName;
        student.email = email;

        await student.save();


        res.status(200).json({

            message: "Student updated successfully",

            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email,
                role: student.role
            }
        });

    } catch (error) {

        console.log(
            "Update student error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// EXPORT
// ===============================

module.exports = {
    getAllStudents,
    createStudent,
    deleteStudent,
    updateStudent
};

