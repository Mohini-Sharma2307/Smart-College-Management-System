const PlacementRecord = require("../models/PlacementRecord");

// ==========================================
// GET ALL PLACEMENT RECORDS - ADMIN
// ==========================================

const getAllPlacementRecords = async (req, res) => {
  try {
    const records = await PlacementRecord.find()
      .populate("student", "-password")
      .populate("company")
      .populate("job")
      .populate("application")
      .populate("offerLetter")
      .sort({ createdAt: -1 });

    res.json({
      records,
    });
  } catch (error) {
    console.error("Get placement records error:", error);

    res.status(500).json({
      message: "Unable to fetch placement records",
    });
  }
};

// ==========================================
// GET MY PLACEMENT RECORDS - STUDENT
// ==========================================

const getMyPlacementRecords = async (req, res) => {
  try {
    const records = await PlacementRecord.find({
      student: req.user.id,
    })
      .populate("company")
      .populate("job")
      .populate("application")
      .populate("offerLetter")
      .sort({
        placementYear: -1,
        joiningDate: -1,
      });

    res.status(200).json({
      success: true,
      records,
    });
  } catch (error) {
    console.error("Get my placement records error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch placement records",
    });
  }
};

// ==========================================
// CREATE PLACEMENT RECORD - ADMIN
// ==========================================

const createPlacementRecord = async (req, res) => {
  try {
    const {
      student,
      application,
      company,
      job,
      offerLetter,
      offerDate,
      joiningDate,
      salary,
      jobLocation,
      placementYear,
      status,
      remarks,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !student ||
      !application ||
      !company ||
      !job ||
      !offerDate ||
      !joiningDate ||
      !salary ||
      !jobLocation ||
      !placementYear
    ) {
      return res.status(400).json({
        message: "Please provide all required placement details",
      });
    }

    // ==========================================
    // CHECK DUPLICATE RECORD
    // ==========================================

    const existingRecord = await PlacementRecord.findOne({
      application,
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "Placement record already exists for this application",
      });
    }

    // ==========================================
    // CREATE RECORD
    // ==========================================

    const record = await PlacementRecord.create({
      student,

      application,

      company,

      job,

      // Only add offerLetter when
      // a valid value is provided
      ...(offerLetter ? { offerLetter } : {}),

      offerDate,

      joiningDate,

      salary,

      jobLocation,

      placementYear,

      status: status || "Placed",

      remarks,
    });

    // ==========================================
    // POPULATE CREATED RECORD
    // ==========================================

    const populatedRecord = await PlacementRecord.findById(record._id)
      .populate("student", "-password")
      .populate("company")
      .populate("job")
      .populate("application")
      .populate("offerLetter");

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    res.status(201).json({
      message: "Placement record created successfully",

      record: populatedRecord,
    });
  } catch (error) {
    console.error("Create placement record error:", error);

    res.status(500).json({
      message: "Unable to create placement record",
    });
  }
};

// ==========================================
// UPDATE PLACEMENT RECORD - ADMIN
// ==========================================

const updatePlacementRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await PlacementRecord.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("student", "-password")
      .populate("company")
      .populate("job")
      .populate("application")
      .populate("offerLetter");

    if (!record) {
      return res.status(404).json({
        message: "Placement record not found",
      });
    }

    res.json({
      message: "Placement record updated successfully",

      record,
    });
  } catch (error) {
    console.error("Update placement record error:", error);

    res.status(500).json({
      message: "Unable to update placement record",
    });
  }
};

// ==========================================
// DELETE PLACEMENT RECORD - ADMIN
// ==========================================

const deletePlacementRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await PlacementRecord.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).json({
        message: "Placement record not found",
      });
    }

    res.json({
      message: "Placement record deleted successfully",
    });
  } catch (error) {
    console.error("Delete placement record error:", error);

    res.status(500).json({
      message: "Unable to delete placement record",
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getAllPlacementRecords,
  getMyPlacementRecords,
  createPlacementRecord,
  updatePlacementRecord,
  deletePlacementRecord,
};
