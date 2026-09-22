const CareerProfile = require("../models/CareerProfile");
const Job = require("../models/Job");

// ==========================================
// PYTHON ML SERVICE
// ==========================================

const ML_SERVICE_URL =
    "https://smart-college-management-system-ai.onrender.com/predict";

// ==========================================
// CAREER SKILL & INTEREST DATA
// ==========================================

const careerRules = [
    {
        role: "Full Stack Developer",

        skills: [
            "javascript",
            "react",
            "node.js",
            "node",
            "express",
            "mongodb",
            "html",
            "css"
        ],

        interests: [
            "web development",
            "full stack development",
            "software development"
        ]
    },

    {
        role: "Frontend Developer",

        skills: [
            "javascript",
            "react",
            "html",
            "css",
            "typescript"
        ],

        interests: [
            "frontend development",
            "web development",
            "ui development"
        ]
    },

    {
        role: "Backend Developer",

        skills: [
            "node.js",
            "node",
            "express",
            "java",
            "spring boot",
            "python",
            "mongodb",
            "mysql"
        ],

        interests: [
            "backend development",
            "software development",
            "api development"
        ]
    },

    {
        role: "Data Analyst",

        skills: [
            "python",
            "sql",
            "excel",
            "power bi",
            "tableau",
            "statistics"
        ],

        interests: [
            "data analysis",
            "data analytics",
            "business analytics"
        ]
    },

    {
        role: "AI / ML Engineer",

        skills: [
            "python",
            "machine learning",
            "deep learning",
            "tensorflow",
            "pytorch",
            "scikit-learn",
            "pandas",
            "numpy"
        ],

        interests: [
            "artificial intelligence",
            "machine learning",
            "data science",
            "ai"
        ]
    },

    {
        role: "Software Engineer",

        skills: [
            "java",
            "python",
            "javascript",
            "c++",
            "data structures",
            "algorithms",
            "git"
        ],

        interests: [
            "software development",
            "software engineering",
            "programming"
        ]
    }
];

// ==========================================
// GET CAREER RULE
// ==========================================

const getCareerRule = (role) => {
    return careerRules.find(
        (career) =>
            career.role.toLowerCase() ===
            role.toLowerCase()
    );
};

// ==========================================
// GET CAREER RECOMMENDATIONS
// ==========================================

const getCareerRecommendations = async (req, res) => {
    try {

        const studentId = req.user.id;

        // ==========================================
        // GET CAREER PROFILE
        // ==========================================

        const profile = await CareerProfile.findOne({
            student: studentId
        });

        if (!profile) {
            return res.status(404).json({
                message:
                    "Please complete your career profile first"
            });
        }

        // ==========================================
        // NORMALIZE STUDENT DATA
        // ==========================================

        const studentSkills =
            (profile.skills || [])
                .map((skill) =>
                    skill.toLowerCase().trim()
                )
                .filter(Boolean);

        const studentInterests =
            (profile.interests || [])
                .map((interest) =>
                    interest.toLowerCase().trim()
                )
                .filter(Boolean);

        // ==========================================
        // CALL PYTHON ML SERVICE
        // ==========================================

        let mlRecommendations = [];

        try {

            const mlResponse = await fetch(
                ML_SERVICE_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        skills:
                            profile.skills || [],

                        interests:
                            profile.interests || [],

                        cgpa:
                            profile.cgpa || 0,

                        experience:
                            profile.experienceLevel ||
                            "Fresher",

                        career_goal:
                            profile.careerGoal || ""
                    })
                }
            );

            if (mlResponse.ok) {

                const mlData =
                    await mlResponse.json();

                mlRecommendations =
                    mlData.recommendations || [];

            } else {

                console.log(
                    "ML service returned error:",
                    mlResponse.status
                );
            }

        } catch (mlError) {

            console.log(
                "ML service connection error:",
                mlError.message
            );
        }

        // ==========================================
        // PROCESS ML RECOMMENDATIONS
        // ==========================================

        const recommendations =
            mlRecommendations
                .slice(0, 3)
                .map((recommendation) => {

                    const careerRole =
                        recommendation.career;

                    const confidence =
                        Number(
                            recommendation.confidence || 0
                        );

                    const careerRule =
                        getCareerRule(careerRole);

                    // ==========================================
                    // MATCHED SKILLS
                    // ==========================================

                    const matchedSkills =
                        careerRule
                            ? careerRule.skills.filter(
                                (skill) =>
                                    studentSkills.includes(
                                        skill
                                    )
                            )
                            : [];

                    // ==========================================
                    // MATCHED INTERESTS
                    // ==========================================

                    const matchedInterests =
                        careerRule
                            ? careerRule.interests.filter(
                                (interest) =>
                                    studentInterests.includes(
                                        interest
                                    )
                            )
                            : [];

                    return {

                        role: careerRole,

                        confidence: confidence,

                        score: Math.round(
                            confidence
                        ),

                        matchedSkills,

                        matchedInterests
                    };
                });

        // ==========================================
        // GET OPEN JOBS
        // ==========================================

        const jobs = await Job.find({
            status: "Open"
        })
            .populate("company")
            .sort({
                createdAt: -1
            });

        // ==========================================
        // MATCH JOBS WITH STUDENT SKILLS
        // ==========================================

        const recommendedJobs =
            jobs
                .map((job) => {

                    const requiredSkills =
                        (job.requiredSkills || [])
                            .map((skill) =>
                                skill
                                    .toLowerCase()
                                    .trim()
                            )
                            .filter(Boolean);

                    const matchedSkills =
                        requiredSkills.filter(
                            (skill) =>
                                studentSkills.includes(
                                    skill
                                )
                        );

                    const matchScore =
                        matchedSkills.length;

                    return {
                        job,
                        matchScore,
                        matchedSkills
                    };
                })

                .filter(
                    (item) =>
                        item.matchScore > 0
                )

                .sort(
                    (a, b) =>
                        b.matchScore -
                        a.matchScore
                )

                .slice(0, 5);

        // ==========================================
        // RESPONSE
        // ==========================================

        res.json({

            message:
                "ML based career recommendations generated successfully",

            recommendations,

            recommendedJobs,

            aiPowered: true

        });

    } catch (error) {

        console.error(
            "Career recommendation error:",
            error
        );

        res.status(500).json({

            message:
                "Unable to generate career recommendations"

        });
    }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
    getCareerRecommendations
};