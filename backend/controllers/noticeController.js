const Notice = require("../models/Notice");

// Student/Admin → Get all notices
const getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find()
            .populate("publishedBy", "fullName email")
            .sort({ publishDate: -1 });

        res.status(200).json({
            message: "Notices fetched successfully",
            notices
        });

    } catch (error) {
        console.log(
            "Get notices error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Admin → Create notice
const createNotice = async (req, res) => {
    try {
        const {
            title,
            description,
            category
        } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const notice = await Notice.create({
            title,
            description,
            category,
            publishedBy: req.user.id
        });

        res.status(201).json({
            message: "Notice created successfully",
            notice
        });

    } catch (error) {
        console.log(
            "Create notice error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getAllNotices,
    createNotice
};