
const Interview = require("../models/Interview");


// ==========================================
// GET ALL INTERVIEWS
// ==========================================

const getAllInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find()
            .populate({
                path: "application",
                populate: [
                    {
                        path: "student",
                        select: "-password"
                    },
                    {
                        path: "job",
                        populate: {
                            path: "company"
                        }
                    }
                ]
            })
            .sort({ interviewDate: 1 });

        res.status(200).json({
            success: true,
            interviews
        });

    } catch (error) {
        console.error(
            "Get all interviews error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch interviews"
        });
    }
};


// ==========================================
// CREATE INTERVIEW
// ==========================================

const createInterview = async (req, res) => {
    try {
        const {
            application,
            interviewType,
            interviewRound,
            interviewDate,
            interviewTime,
            meetingLink,
            venue,
            interviewer,
            status,
            remarks
        } = req.body;

        if (
            !application ||
            !interviewType ||
            !interviewRound ||
            !interviewDate ||
            !interviewTime
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const interview = await Interview.create({
            application,
            interviewType,
            interviewRound,
            interviewDate,
            interviewTime,
            meetingLink,
            venue,
            interviewer,
            status,
            remarks
        });

        const populatedInterview = await Interview.findById(
            interview._id
        ).populate({
            path: "application",
            populate: [
                {
                    path: "student",
                    select: "-password"
                },
                {
                    path: "job",
                    populate: {
                        path: "company"
                    }
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: "Interview scheduled successfully",
            interview: populatedInterview
        });

    } catch (error) {
        console.error(
            "Create interview error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to schedule interview"
        });
    }
};


// ==========================================
// UPDATE INTERVIEW
// ==========================================

const updateInterview = async (req, res) => {
    try {
        const { id } = req.params;

        const interview = await Interview.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        const populatedInterview = await Interview.findById(
            interview._id
        ).populate({
            path: "application",
            populate: [
                {
                    path: "student",
                    select: "-password"
                },
                {
                    path: "job",
                    populate: {
                        path: "company"
                    }
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: "Interview updated successfully",
            interview: populatedInterview
        });

    } catch (error) {
        console.error(
            "Update interview error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to update interview"
        });
    }
};


// ==========================================
// DELETE INTERVIEW
// ==========================================

const deleteInterview = async (req, res) => {
    try {
        const { id } = req.params;

        const interview = await Interview.findByIdAndDelete(id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Interview deleted successfully"
        });

    } catch (error) {
        console.error(
            "Delete interview error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to delete interview"
        });
    }
};


// ==========================================
// GET MY INTERVIEWS - STUDENT
// ==========================================

const getMyInterviews = async (req, res) => {
    try {

        const interviews = await Interview.find()
            .populate({
                path: "application",
                match: {
                    student: req.user.id
                },
                populate: {
                    path: "job",
                    populate: {
                        path: "company"
                    }
                }
            })
            .sort({
                interviewDate: 1
            });

        // Remove interviews whose application
        // does not belong to the logged-in student

        const myInterviews = interviews.filter(
            (interview) => interview.application
        );

        res.status(200).json({
            success: true,
            interviews: myInterviews
        });

    } catch (error) {

        console.error(
            "Get student interviews error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch interviews"
        });
    }
};


module.exports = {
    getAllInterviews,
    createInterview,
    updateInterview,
    deleteInterview,
    getMyInterviews
};

