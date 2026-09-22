const Admission = require("../models/Admission");


// ===============================
// APPLY FOR ADMISSION
// ===============================

const applyAdmission = async (req, res) => {
    try {

        const {
            course,
            branch,
            admissionYear
        } = req.body;


        if (!course || !branch || !admissionYear) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const existingAdmission = await Admission.findOne({
            student: req.user.id
        });


        if (existingAdmission) {

            return res.status(400).json({
                message: "Admission already applied"
            });
        }


        const admission = await Admission.create({
            student: req.user.id,
            course,
            branch,
            admissionYear
        });


        res.status(201).json({

            message: "Admission application submitted successfully",

            admission

        });

    } catch (error) {

        console.log(
            "Admission application error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};
// ===============================
// GET ALL ADMISSIONS
// ===============================

const getAllAdmissions = async (req, res) => {
    try {

        const admissions = await Admission.find()
            .populate("student", "fullName email")
            .sort({ createdAt: -1 });


        res.status(200).json({
            message: "Admissions fetched successfully",
            admissions
        });

    } catch (error) {

        console.log(
            "Get admissions error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

// ===============================
// UPDATE ADMISSION STATUS
// ===============================

const updateAdmissionStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;


        if (!["approved", "rejected"].includes(status)) {

            return res.status(400).json({
                message: "Invalid admission status"
            });
        }


        const admission = await Admission.findById(id);


        if (!admission) {

            return res.status(404).json({
                message: "Admission not found"
            });
        }


        admission.status = status;

        await admission.save();


        res.status(200).json({

            message: `Admission ${status} successfully`,

            admission

        });

    } catch (error) {

        console.log(
            "Update admission status error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

// ===============================
// GET MY ADMISSION
// ===============================

const getMyAdmission = async (req, res) => {
    try {

        const admission = await Admission.findOne({
            student: req.user.id
        });


        if (!admission) {

            return res.status(404).json({
                message: "No admission application found"
            });
        }


        res.status(200).json({
            message: "Admission fetched successfully",
            admission
        });

    } catch (error) {

        console.log(
            "Get my admission error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    applyAdmission,
    getAllAdmissions,
    updateAdmissionStatus,
    getMyAdmission
};
