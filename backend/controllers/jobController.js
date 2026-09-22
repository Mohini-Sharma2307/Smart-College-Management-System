
const Job = require("../models/Job");

// ==========================================
// GET ALL JOBS
// ==========================================

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("company", "name industry location website")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        console.error("Get jobs error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch jobs"
        });
    }
};


// ==========================================
// GET SINGLE JOB
// ==========================================

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate(
                "company",
                "name industry location website"
            );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        console.error("Get job error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch job"
        });
    }
};


// ==========================================
// CREATE JOB
// ==========================================

const createJob = async (req, res) => {
    try {
        const {
            company,
            jobTitle,
            description,
            requiredSkills,
            location,
            jobType,
            salary,
            applicationDeadline,
            eligibility,
            minimumCGPA,
            status
        } = req.body;

        // Required fields
        if (
            !company ||
            !jobTitle ||
            !description ||
            !location ||
            !jobType ||
            !applicationDeadline
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Company, job title, description, location, job type and application deadline are required."
            });
        }

        const job = await Job.create({
            company,
            jobTitle,
            description,
            requiredSkills: Array.isArray(requiredSkills)
                ? requiredSkills
                : [],
            location,
            jobType,
            salary,
            applicationDeadline,
            eligibility,
            minimumCGPA,
            status
        });

        const populatedJob = await Job.findById(job._id)
            .populate(
                "company",
                "name industry location website"
            );

        res.status(201).json({
            success: true,
            message: "Job created successfully.",
            job: populatedJob
        });

    } catch (error) {
        console.error("Create job error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to create job"
        });
    }
};


// ==========================================
// UPDATE JOB
// ==========================================

const updateJob = async (req, res) => {
    try {
        const {
            company,
            jobTitle,
            description,
            requiredSkills,
            location,
            jobType,
            salary,
            applicationDeadline,
            eligibility,
            minimumCGPA,
            status
        } = req.body;

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        job.company = company;
        job.jobTitle = jobTitle;
        job.description = description;
        job.requiredSkills = Array.isArray(requiredSkills)
            ? requiredSkills
            : [];
        job.location = location;
        job.jobType = jobType;
        job.salary = salary;
        job.applicationDeadline = applicationDeadline;
        job.eligibility = eligibility;
        job.minimumCGPA = minimumCGPA;
        job.status = status;

        await job.save();

        const updatedJob = await Job.findById(job._id)
            .populate(
                "company",
                "name industry location website"
            );

        res.status(200).json({
            success: true,
            message: "Job updated successfully.",
            job: updatedJob
        });

    } catch (error) {
        console.error("Update job error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to update job"
        });
    }
};


// ==========================================
// DELETE JOB
// ==========================================

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Job deleted successfully."
        });

    } catch (error) {
        console.error("Delete job error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to delete job"
        });
    }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
};

