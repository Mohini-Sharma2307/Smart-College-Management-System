
const Subject = require("../models/Subject");

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()
            .sort({ semester: 1, name: 1 });

        res.status(200).json({
            message: "Subjects fetched successfully",
            subjects
        });

    } catch (error) {
        console.log(
            "Get subjects error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

const createSubject = async (req, res) => {
    try {
        const {
            name,
            code,
            semester,
            credits
        } = req.body;

        if (!name || !code || !semester || !credits) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingSubject = await Subject.findOne({
            code
        });

        if (existingSubject) {
            return res.status(400).json({
                message: "Subject code already exists"
            });
        }

        const subject = await Subject.create({
            name,
            code,
            semester,
            credits
        });

        res.status(201).json({
            message: "Subject created successfully",
            subject
        });

    } catch (error) {
        console.log(
            "Create subject error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAllSubjects,
    createSubject
};

