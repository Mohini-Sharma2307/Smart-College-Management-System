
const express = require("express");

const {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

const router = express.Router();


// ==========================================
// GET ALL JOBS
// ==========================================

router.get("/", getJobs);


// ==========================================
// GET SINGLE JOB
// ==========================================

router.get("/:id", getJobById);


// ==========================================
// CREATE JOB
// ==========================================

router.post("/", createJob);


// ==========================================
// UPDATE JOB
// ==========================================

router.put("/:id", updateJob);


// ==========================================
// DELETE JOB
// ==========================================

router.delete("/:id", deleteJob);


module.exports = router;

