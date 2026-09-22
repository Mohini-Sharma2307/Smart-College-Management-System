
const JobApplication = require("../models/JobApplication");

// ==========================================
// STUDENT - APPLY FOR JOB
// ==========================================

const applyForJob = async (req, res) => {
    try {
        const { job, resume, coverLetter } = req.body;

        if (!job) {
            return res.status(400).json({
                message: "Job is required"
            });
        }

        // Check if student already applied
        const existingApplication =
            await JobApplication.findOne({
                student: req.user.id,
                job
            });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job"
            });
        }

        const application =
            await JobApplication.create({
                student: req.user.id,
                job,
                resume,
                coverLetter
            });

        res.status(201).json({
            message: "Job application submitted successfully",
            application
        });

    } catch (error) {
        console.error("Apply for job error:", error);

        res.status(500).json({
            message: "Unable to apply for job"
        });
    }
};


// ==========================================
// STUDENT - GET MY APPLICATIONS
// ==========================================

const getMyApplications = async (req, res) => {
    try {
        const applications =
            await JobApplication.find({
                student: req.user.id
            })
                .populate({
                    path: "job",
                    populate: {
                        path: "company"
                    }
                })
                .sort({ createdAt: -1 });

        res.json({
            applications
        });

    } catch (error) {
        console.error(
            "Get my applications error:",
            error
        );

        res.status(500).json({
            message: "Unable to fetch applications"
        });
    }
};


// ==========================================
// ADMIN - GET ALL APPLICATIONS
// ==========================================

const getAllApplications = async (req, res) => {
    try {
        const applications =
            await JobApplication.find()
                .populate(
                    "student",
                    "-password"
                )
                .populate({
                    path: "job",
                    populate: {
                        path: "company"
                    }
                })
                .sort({ createdAt: -1 });

        res.json({
            applications
        });

    } catch (error) {
        console.error(
            "Get all applications error:",
            error
        );

        res.status(500).json({
            message: "Unable to fetch applications"
        });
    }
};


// ==========================================
// ADMIN - UPDATE APPLICATION STATUS
// ==========================================

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Applied",
            "Shortlisted",
            "Rejected",
            "Selected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        const application =
            await JobApplication.findByIdAndUpdate(
                req.params.id,
                { status },
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate(
                    "student",
                    "-password"
                )
                .populate({
                    path: "job",
                    populate: {
                        path: "company"
                    }
                });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            message:
                "Application status updated successfully",
            application
        });

    } catch (error) {
        console.error(
            "Update application status error:",
            error
        );

        res.status(500).json({
            message:
                "Unable to update application status"
        });
    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    applyForJob,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus
};

