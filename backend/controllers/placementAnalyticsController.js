
const PlacementRecord = require("../models/PlacementRecord");

// ==========================================
// GET PLACEMENT ANALYTICS
// ==========================================

const getPlacementAnalytics = async (req, res) => {
    try {
        const records = await PlacementRecord.find()
            .populate("student", "-password")
            .populate("company")
            .populate("job");

        // ==========================================
        // BASIC COUNTS
        // ==========================================

        const totalPlacements = records.length;

        const placedStudents = records.filter(
            (record) => record.status === "Placed"
        ).length;

        const joinedStudents = records.filter(
            (record) => record.status === "Joined"
        ).length;

        const notJoinedStudents = records.filter(
            (record) => record.status === "Not Joined"
        ).length;


        // ==========================================
        // SALARY CALCULATION
        // ==========================================

        const salaryValues = records
            .map((record) => {
                if (!record.salary) return null;

                // Extract first number from salary string
                const match = record.salary.match(
                    /[\d.]+/
                );

                return match
                    ? Number(match[0])
                    : null;
            })
            .filter(
                (salary) =>
                    salary !== null &&
                    !Number.isNaN(salary)
            );


        const averageSalary =
            salaryValues.length > 0
                ? (
                    salaryValues.reduce(
                        (sum, salary) =>
                            sum + salary,
                        0
                    ) /
                    salaryValues.length
                ).toFixed(2)
                : 0;


        const highestSalary =
            salaryValues.length > 0
                ? Math.max(...salaryValues)
                : 0;


        // ==========================================
        // COMPANY-WISE PLACEMENTS
        // ==========================================

        const companyMap = {};

        records.forEach((record) => {

            const companyName =
                record.company?.name ||
                "Unknown Company";

            if (!companyMap[companyName]) {
                companyMap[companyName] = 0;
            }

            companyMap[companyName]++;
        });


        const companyWisePlacements =
            Object.entries(companyMap).map(
                ([company, count]) => ({
                    company,
                    count
                })
            );


        // ==========================================
        // YEAR-WISE PLACEMENTS
        // ==========================================

        const yearMap = {};

        records.forEach((record) => {

            const year =
                record.placementYear;

            if (!year) return;

            if (!yearMap[year]) {
                yearMap[year] = 0;
            }

            yearMap[year]++;
        });


        const yearWisePlacements =
            Object.entries(yearMap)
                .map(([year, count]) => ({
                    year: Number(year),
                    count
                }))
                .sort(
                    (a, b) =>
                        a.year - b.year
                );


        // ==========================================
        // PLACEMENT RATE
        // ==========================================

        const placementRate =
            totalPlacements > 0
                ? (
                    (
                        placedStudents +
                        joinedStudents
                    ) /
                    totalPlacements
                ) *
                100
                : 0;


        // ==========================================
        // RESPONSE
        // ==========================================

        res.json({

            totalPlacements,

            placedStudents,

            joinedStudents,

            notJoinedStudents,

            averageSalary:
                Number(averageSalary),

            highestSalary,

            placementRate:
                Number(
                    placementRate.toFixed(2)
                ),

            companyWisePlacements,

            yearWisePlacements

        });

    } catch (error) {

        console.error(
            "Placement analytics error:",
            error
        );

        res.status(500).json({

            message:
                "Unable to fetch placement analytics"

        });
    }
};



// ==========================================
// GET MY PLACEMENT ANALYTICS
// ==========================================

const getMyPlacementAnalytics = async (req, res) => {
    try {
        const studentId = req.user.id;

        // ==========================================
        // GET STUDENT PLACEMENT RECORDS
        // ==========================================

        const records = await PlacementRecord.find({
            student: studentId
        })
            .populate("company")
            .populate("job")
            .populate("application")
            .populate("offerLetter");


        // ==========================================
        // BASIC PLACEMENT COUNTS
        // ==========================================

        const totalPlacements = records.length;

        const placedCount = records.filter(
            (record) => record.status === "Placed"
        ).length;

        const joinedCount = records.filter(
            (record) => record.status === "Joined"
        ).length;

        const notJoinedCount = records.filter(
            (record) => record.status === "Not Joined"
        ).length;


        // ==========================================
        // APPLICATION COUNT
        // ==========================================

        const JobApplication = require("../models/JobApplication");

        const applications = await JobApplication.find({
            student: studentId
        });


        const totalApplications =
            applications.length;

        const shortlistedCount =
            applications.filter(
                (application) =>
                    application.status === "Shortlisted"
            ).length;

        const selectedCount =
            applications.filter(
                (application) =>
                    application.status === "Selected"
            ).length;

        const rejectedCount =
            applications.filter(
                (application) =>
                    application.status === "Rejected"
            ).length;


        // ==========================================
        // INTERVIEW COUNT
        // ==========================================

        const Interview = require("../models/Interview");

        const interviews = await Interview.find({
            application: {
                $in: applications.map(
                    (application) =>
                        application._id
                )
            }
        });

        const totalInterviews =
            interviews.length;


        // ==========================================
        // OFFER COUNT
        // ==========================================

        const OfferLetter =
            require("../models/OfferLetter");

        const offers =
            await OfferLetter.find({
                student: studentId
            });

        const totalOffers =
            offers.length;


        // ==========================================
        // SALARY INFORMATION
        // ==========================================

        const salaryValues = records
            .map((record) => {

                if (!record.salary) {
                    return null;
                }

                const match =
                    String(record.salary).match(
                        /[\d.]+/
                    );

                return match
                    ? Number(match[0])
                    : null;

            })
            .filter(
                (salary) =>
                    salary !== null &&
                    !Number.isNaN(salary)
            );


        const averageSalary =
            salaryValues.length > 0
                ? (
                    salaryValues.reduce(
                        (sum, salary) =>
                            sum + salary,
                        0
                    ) /
                    salaryValues.length
                ).toFixed(2)
                : 0;


        const highestSalary =
            salaryValues.length > 0
                ? Math.max(...salaryValues)
                : 0;


        // ==========================================
        // CURRENT PLACEMENT
        // ==========================================

        const currentPlacement =
            records.length > 0
                ? records
                    .sort(
                        (a, b) =>
                            new Date(
                                b.joiningDate || 0
                            ) -
                            new Date(
                                a.joiningDate || 0
                            )
                    )[0]
                : null;


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(200).json({

            success: true,

            analytics: {

                totalApplications,

                shortlistedCount,

                selectedCount,

                rejectedCount,

                totalInterviews,

                totalOffers,

                totalPlacements,

                placedCount,

                joinedCount,

                notJoinedCount,

                averageSalary:
                    Number(averageSalary),

                highestSalary,

                currentPlacement

            }

        });

    } catch (error) {

        console.error(
            "My placement analytics error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to fetch your placement analytics"

        });

    }
};



module.exports = {
    getPlacementAnalytics,
    getMyPlacementAnalytics
};
