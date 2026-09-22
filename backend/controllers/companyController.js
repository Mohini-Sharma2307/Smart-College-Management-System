const Company = require("../models/Company");

// ==========================================
// GET ALL COMPANIES
// ==========================================

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });

        res.status(200).json({
            companies
        });
    } catch (error) {
        console.error("Get companies error:", error);

        res.status(500).json({
            message: "Failed to fetch companies"
        });
    }
};

// ==========================================
// CREATE COMPANY
// ==========================================

const createCompany = async (req, res) => {
    try {
        const {
            name,
            industry,
            website,
            location,
            description,
            contactEmail,
            contactPhone
        } = req.body;

        if (!name || !industry || !location) {
            return res.status(400).json({
                message: "Company name, industry and location are required"
            });
        }

        const company = await Company.create({
            name,
            industry,
            website,
            location,
            description,
            contactEmail,
            contactPhone
        });

        res.status(201).json({
            message: "Company created successfully",
            company
        });
    } catch (error) {
        console.error("Create company error:", error);

        res.status(500).json({
            message: "Failed to create company"
        });
    }
};

// ==========================================
// UPDATE COMPANY
// ==========================================

const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;

        const company = await Company.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company updated successfully",
            company
        });
    } catch (error) {
        console.error("Update company error:", error);

        res.status(500).json({
            message: "Failed to update company"
        });
    }
};

// ==========================================
// DELETE COMPANY
// ==========================================

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        const company = await Company.findByIdAndDelete(id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company deleted successfully"
        });
    } catch (error) {
        console.error("Delete company error:", error);

        res.status(500).json({
            message: "Failed to delete company"
        });
    }
};

module.exports = {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
};