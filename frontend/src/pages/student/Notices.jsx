
import { useEffect, useState } from "react";
import "./Notices.css";

function Notices() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "https://smart-college-management-backend.onrender.com/api/notices",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setNotices(data.notices);
                } else {
                    setMessage(data.message);
                }

            } catch (error) {
                console.log("Notices fetch error:", error);
                setMessage("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    };

    if (loading) {
        return (
            <div className="notices-page">
                <p>Loading notices...</p>
            </div>
        );
    }

    return (
        <div className="notices-page">

            <div className="notices-header">
                <h1>Notices</h1>
                <p>
                    Stay updated with the latest college announcements
                </p>
            </div>

            {message && (
                <p className="notice-message">
                    {message}
                </p>
            )}

            <div className="notices-list">

                {notices.length === 0 ? (
                    <div className="notice-card">
                        <div className="notice-content">
                            <h2>No notices available</h2>
                            <p>
                                There are currently no college announcements.
                            </p>
                        </div>
                    </div>
                ) : (
                    notices.map((notice) => (
                        <div
                            className="notice-card"
                            key={notice._id}
                        >

                            <div className="notice-icon">
                                📢
                            </div>

                            <div className="notice-content">

                                <div className="notice-top">

                                    <h2>
                                        {notice.title}
                                    </h2>

                                    <span className="notice-category">
                                        {notice.category}
                                    </span>

                                </div>

                                <p>
                                    {notice.description}
                                </p>

                                <span className="notice-date">
                                    Published:{" "}
                                    {formatDate(notice.publishDate)}
                                </span>

                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default Notices;


