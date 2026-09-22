const Attendance = require("../models/Attendance");


// ==========================================
// Admin - Mark Attendance
// ==========================================
const markAttendance = async (req, res) => {
    try {
        const {
            student,
            subject,
            date,
            status
        } = req.body;

        if (
            !student ||
            !subject ||
            !date ||
            !status
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const attendance = await Attendance.create({
            student,
            subject,
            date,
            status
        });

        const completeAttendance =
            await Attendance.findById(attendance._id)
                .populate(
                    "student",
                    "fullName email"
                )
                .populate(
                    "subject",
                    "name code semester credits"
                );

        res.status(201).json({
            message:
                "Attendance marked successfully",

            attendance: completeAttendance
        });

    } catch (error) {
        console.log(
            "Mark attendance error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Admin - Get All Attendance
// ==========================================
const getAllAttendance = async (req, res) => {
    try {
        const attendance =
            await Attendance.find()
                .populate(
                    "student",
                    "fullName email"
                )
                .populate(
                    "subject",
                    "name code semester credits"
                )
                .sort({
                    date: -1
                });

        res.status(200).json({
            message:
                "Attendance fetched successfully",

            attendance
        });

    } catch (error) {
        console.log(
            "Get attendance error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Student - Get My Attendance
// ==========================================
const getMyAttendance = async (req, res) => {
    try {
        const studentId = req.user.id;

        const attendance =
            await Attendance.find({
                student: studentId
            })
                .populate(
                    "subject",
                    "name code semester credits"
                )
                .sort({
                    date: -1
                });

        res.status(200).json({
            message:
                "Your attendance fetched successfully",

            attendance
        });

    } catch (error) {
        console.log(
            "Get my attendance error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Student - Attendance Summary
// ==========================================
const getMyAttendanceSummary = async (req, res) => {
    try {
        const studentId = req.user.id;

        const attendance =
            await Attendance.find({
                student: studentId
            })
                .populate(
                    "subject",
                    "name code semester"
                );

        // ------------------------------------------
        // Subject-wise attendance calculation
        // ------------------------------------------

        const subjectMap = {};

        attendance.forEach((record) => {

            const subjectId =
                record.subject._id.toString();

            if (!subjectMap[subjectId]) {
                subjectMap[subjectId] = {
                    subject:
                        record.subject.name,

                    code:
                        record.subject.code,

                    semester:
                        record.subject.semester,

                    totalClasses: 0,

                    present: 0,

                    absent: 0
                };
            }

            subjectMap[subjectId]
                .totalClasses += 1;

            if (
                record.status === "Present"
            ) {
                subjectMap[subjectId]
                    .present += 1;
            } else {
                subjectMap[subjectId]
                    .absent += 1;
            }
        });


        // ------------------------------------------
        // Add percentage + warning
        // ------------------------------------------

        const subjects =
            Object.values(subjectMap).map(
                (item) => {

                    const percentage =
                        item.totalClasses > 0
                            ? Number(
                                (
                                    (
                                        item.present /
                                        item.totalClasses
                                    ) * 100
                                ).toFixed(2)
                            )
                            : 0;


                    return {
                        ...item,

                        percentage,

                        attendanceStatus:
                            percentage >= 75
                                ? "Good"
                                : "Low Attendance",

                        warning:
                            percentage < 75
                                ? "Attendance is below 75%"
                                : null
                    };
                }
            );


        // ------------------------------------------
        // Overall attendance calculation
        // ------------------------------------------

        const totalClasses =
            attendance.length;

        const totalPresent =
            attendance.filter(
                (record) =>
                    record.status === "Present"
            ).length;

        const totalAbsent =
            attendance.filter(
                (record) =>
                    record.status === "Absent"
            ).length;


        const overallPercentage =
            totalClasses > 0
                ? Number(
                    (
                        (
                            totalPresent /
                            totalClasses
                        ) * 100
                    ).toFixed(2)
                )
                : 0;


        // ------------------------------------------
        // Overall status + warning
        // ------------------------------------------

        const overallStatus =
            overallPercentage >= 75
                ? "Good"
                : "Low Attendance";


        const overallWarning =
            overallPercentage < 75
                ? "Overall attendance is below 75%"
                : null;


        // ------------------------------------------
        // Final response
        // ------------------------------------------

        res.status(200).json({

            message:
                "Attendance summary fetched successfully",

            overall: {

                totalClasses,

                present:
                    totalPresent,

                absent:
                    totalAbsent,

                percentage:
                    overallPercentage,

                attendanceStatus:
                    overallStatus,

                warning:
                    overallWarning
            },

            subjects
        });

    } catch (error) {

        console.log(
            "Attendance summary error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// Export Controllers
// ==========================================

module.exports = {
    markAttendance,
    getAllAttendance,
    getMyAttendance,
    getMyAttendanceSummary
};