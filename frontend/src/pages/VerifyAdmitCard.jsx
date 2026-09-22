
import { useEffect, useState } from "react";
import "./VerifyAdmitCard.css";

const VerifyAdmitCard = () => {
    const [admitCard, setAdmitCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyCard = async () => {
            try {
                const pathParts = window.location.pathname.split("/");
                const verificationCode = pathParts[pathParts.length - 1];

                if (!verificationCode) {
                    setError("Verification code is missing");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `http://localhost:5000/api/admit-cards/verify/${verificationCode}`
                );

                const data = await response.json();

                if (!response.ok || !data.valid) {
                    setError(
                        data.message || "Invalid admit card"
                    );
                    setLoading(false);
                    return;
                }

                setAdmitCard(data.admitCard);
                setLoading(false);

            } catch (error) {
                console.log(
                    "Verification error:",
                    error.message
                );

                setError(
                    "Unable to verify admit card"
                );

                setLoading(false);
            }
        };

        verifyCard();
    }, []);

    if (loading) {
        return (
            <div className="verification-page">
                <div className="verification-box">
                    <h2>Verifying Admit Card...</h2>
                    <p>Please wait.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="verification-page">
                <div className="verification-box invalid">
                    <div className="verification-icon">
                        ✕
                    </div>

                    <h2>Invalid Admit Card</h2>

                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="verification-page">

            <div className="verification-box valid">

                <div className="verification-icon">
                    ✓
                </div>

                <h1>Admit Card Verified</h1>

                <p className="verification-message">
                    This admit card is valid and verified.
                </p>

                <div className="verification-details">

                    <div>
                        <span>Student Name</span>
                        <strong>
                            {admitCard.student?.fullName}
                        </strong>
                    </div>

                    <div>
                        <span>Roll Number</span>
                        <strong>
                            {admitCard.rollNumber}
                        </strong>
                    </div>

                    <div>
                        <span>Course</span>
                        <strong>
                            {admitCard.course}
                        </strong>
                    </div>

                    <div>
                        <span>Branch</span>
                        <strong>
                            {admitCard.branch}
                        </strong>
                    </div>

                    <div>
                        <span>Semester</span>
                        <strong>
                            {admitCard.semester}
                        </strong>
                    </div>

                    <div>
                        <span>Subject</span>
                        <strong>
                            {admitCard.exam?.subject}
                        </strong>
                    </div>

                    <div>
                        <span>Subject Code</span>
                        <strong>
                            {admitCard.exam?.subjectCode}
                        </strong>
                    </div>

                    <div>
                        <span>Exam Date</span>
                        <strong>
                            {admitCard.exam?.examDate
                                ? new Date(
                                    admitCard.exam.examDate
                                ).toLocaleDateString("en-IN")
                                : "-"}
                        </strong>
                    </div>

                    <div>
                        <span>Exam Time</span>
                        <strong>
                            {admitCard.exam?.examTime}
                        </strong>
                    </div>

                    <div>
                        <span>Exam Room</span>
                        <strong>
                            {admitCard.exam?.room}
                        </strong>
                    </div>

                </div>

                <div className="verification-code">
                    <span>Verification Code</span>

                    <strong>
                        {admitCard.verificationCode}
                    </strong>
                </div>

                <div className="verification-footer">
                    Smart College Management System
                </div>

            </div>

        </div>
    );
};

export default VerifyAdmitCard;

