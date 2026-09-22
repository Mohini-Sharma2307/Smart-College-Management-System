const express = require("express");

const {
    getAllStudents,
    createStudent,
    deleteStudent,
    updateStudent
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// GET ALL STUDENTS
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllStudents
);


// CREATE STUDENT
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createStudent
);


// DELETE STUDENT
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteStudent
);


// UPDATE STUDENT
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateStudent
);


module.exports = router;