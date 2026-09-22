
const express = require("express");

const router = express.Router();

const {
    getAllPlacementRecords,
    getMyPlacementRecords,
    createPlacementRecord,
    updatePlacementRecord,
    deletePlacementRecord
} = require("../controllers/placementRecordController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ==========================================
// GET MY PLACEMENT RECORDS
// STUDENT ONLY
// ==========================================

router.get(
    "/my-placement-records",
    authMiddleware,
    roleMiddleware("student"),
    getMyPlacementRecords
);


// ==========================================
// GET ALL PLACEMENT RECORDS
// ADMIN ONLY
// ==========================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllPlacementRecords
);


// ==========================================
// CREATE PLACEMENT RECORD
// ADMIN ONLY
// ==========================================

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createPlacementRecord
);


// ==========================================
// UPDATE PLACEMENT RECORD
// ADMIN ONLY
// ==========================================

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updatePlacementRecord
);


// ==========================================
// DELETE PLACEMENT RECORD
// ADMIN ONLY
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deletePlacementRecord
);


module.exports = router;

