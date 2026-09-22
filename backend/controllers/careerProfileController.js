const CareerProfile = require("../models/CareerProfile");

// ==========================================
// GET MY CAREER PROFILE
// ==========================================

const getMyCareerProfile = async (req, res) => {
    try {
        const studentId = req.user.id;

        const profile = await CareerProfile.findOne({
            student: studentId
        }).populate("student", "-password");

        if (!profile) {
            return res.status(404).json({
                message: "Career profile not found"
            });
        }

        res.json({
            profile
        });

    } catch (error) {
        console.error(
            "Get career profile error:",
            error
        );

        res.status(500).json({
            message: "Unable to fetch career profile"
        });
    }
};


// ==========================================
// CREATE / UPDATE CAREER PROFILE
// ==========================================

const saveCareerProfile = async (req, res) => {
    try {
        const studentId = req.user.id;

        const {
            skills,
            interests,
            preferredJobRole,
            preferredIndustry,
            cgpa,
            experienceLevel,
            careerGoal
        } = req.body;


        // ==========================================
        // CHECK EXISTING PROFILE
        // ==========================================

        let profile = await CareerProfile.findOne({
            student: studentId
        });


        // ==========================================
        // UPDATE EXISTING PROFILE
        // ==========================================

        if (profile) {

            profile.skills = skills || [];
            profile.interests = interests || [];
            profile.preferredJobRole =
                preferredJobRole || "";

            profile.preferredIndustry =
                preferredIndustry || "";

            profile.cgpa =
                cgpa !== undefined
                    ? cgpa
                    : profile.cgpa;

            profile.experienceLevel =
                experienceLevel ||
                "Fresher";

            profile.careerGoal =
                careerGoal || "";

            await profile.save();

        } else {

            // ==========================================
            // CREATE NEW PROFILE
            // ==========================================

            profile = await CareerProfile.create({

                student: studentId,

                skills: skills || [],

                interests: interests || [],

                preferredJobRole:
                    preferredJobRole || "",

                preferredIndustry:
                    preferredIndustry || "",

                cgpa,

                experienceLevel:
                    experienceLevel ||
                    "Fresher",

                careerGoal:
                    careerGoal || ""

            });
        }


        // ==========================================
        // POPULATE PROFILE
        // ==========================================

        const populatedProfile =
            await CareerProfile.findById(
                profile._id
            ).populate(
                "student",
                "-password"
            );


        // ==========================================
        // SUCCESS RESPONSE
        // ==========================================

        res.json({

            message:
                "Career profile saved successfully",

            profile: populatedProfile

        });

    } catch (error) {

        console.error(
            "Save career profile error:",
            error
        );

        res.status(500).json({

            message:
                "Unable to save career profile"

        });
    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    getMyCareerProfile,
    saveCareerProfile
};