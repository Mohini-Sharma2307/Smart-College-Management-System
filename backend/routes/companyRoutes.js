const express = require("express");

const {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");

const router = express.Router();

// Get all companies
router.get("/", getCompanies);

// Create company
router.post("/", createCompany);

// Update company
router.put("/:id", updateCompany);

// Delete company
router.delete("/:id", deleteCompany);

module.exports = router;