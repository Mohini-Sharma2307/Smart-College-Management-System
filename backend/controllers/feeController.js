const Fee = require("../models/Fee");

// Student → View own fee
const getMyFee = async (req, res) => {
    try {
        const fee = await Fee.findOne({
            student: req.user.id
        });

        if (!fee) {
            return res.status(404).json({
                message: "Fee details not found"
            });
        }

        res.status(200).json({
            message: "Fee details fetched successfully",
            fee
        });

    } catch (error) {
        console.log(
            "Get fee error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Admin → Create fee
const createFee = async (req, res) => {
    try {
        const {
            student,
            totalFee,
            paidFee
        } = req.body;

        if (
            !student ||
            totalFee === undefined ||
            paidFee === undefined
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingFee = await Fee.findOne({
            student
        });

        if (existingFee) {
            return res.status(400).json({
                message: "Fee record already exists for this student"
            });
        }

        const remainingFee = totalFee - paidFee;

        let status = "Pending";

        if (remainingFee === 0) {
            status = "Paid";
        } else if (paidFee > 0) {
            status = "Partial";
        }

        const fee = await Fee.create({
            student,
            totalFee,
            paidFee,
            remainingFee,
            status
        });

        res.status(201).json({
            message: "Fee record created successfully",
            fee
        });

    } catch (error) {
        console.log(
            "Create fee error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getMyFee,
    createFee
};