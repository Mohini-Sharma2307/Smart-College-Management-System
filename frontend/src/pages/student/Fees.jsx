
import { useEffect, useState } from "react";
import "./Fees.css";

function Fees() {
    const [fee, setFee] = useState(null);
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchFeeData = async () => {
            try {
                const token = localStorage.getItem("token");

                // ==========================================
                // FETCH OVERALL FEE DETAILS
                // ==========================================

                const feeResponse = await fetch(
                    "https://smart-college-management-backend.onrender.com/api/fees/my-fee",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const feeData = await feeResponse.json();

                if (feeResponse.ok) {
                    setFee(feeData.fee);
                } else {
                    setMessage(
                        feeData.message ||
                        "No fee details available"
                    );
                }


                // ==========================================
                // FETCH STUDENT FEE RECEIPTS
                // ==========================================

                const receiptResponse = await fetch(
                    "https://smart-college-management-backend.onrender.com/api/fee-receipts/my-receipts",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const receiptData =
                    await receiptResponse.json();

                if (receiptResponse.ok) {
                    setReceipts(
                        receiptData.receipts || []
                    );
                } else {
                    setReceipts([]);
                }

            } catch (error) {
                console.log(
                    "Fee data fetch error:",
                    error
                );

                setMessage(
                    "Unable to connect to server"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFeeData();
    }, []);


    // ==========================================
    // DOWNLOAD RECEIPT PDF
    // ==========================================

    const handleDownloadReceipt = async (
        receiptId,
        receiptNumber
    ) => {
        try {
            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `https://smart-college-management-backend.onrender.com/api/fee-receipts/student/${receiptId}/pdf`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const data =
                    await response.json();

                alert(
                    data.message ||
                    "Unable to download receipt"
                );

                return;
            }

            const blob =
                await response.blob();

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `${receiptNumber || "fee-receipt"}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.log(
                "Receipt download error:",
                error
            );

            alert(
                "Unable to download receipt"
            );
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="fees-page">
                <p>Loading fee details...</p>
            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="fees-page">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="fees-header">

                <h1>
                    Fees
                </h1>

                <p>
                    View your fee details and payment history
                </p>

            </div>


            {/* ==========================================
                NO FEE DETAILS
            ========================================== */}

            {!fee ? (

                <div className="fees-history-card">

                    <p>
                        {message ||
                            "No fee details available"}
                    </p>

                </div>

            ) : (

                <>
                    {/* ==========================================
                        FEE SUMMARY
                    ========================================== */}

                    <div className="fee-summary">

                        <div className="fee-card">

                            <span>
                                Total Fees
                            </span>

                            <strong>
                                ₹
                                {fee.totalFee.toLocaleString()}
                            </strong>

                        </div>


                        <div className="fee-card">

                            <span>
                                Paid Amount
                            </span>

                            <strong className="paid-amount">

                                ₹
                                {fee.paidFee.toLocaleString()}

                            </strong>

                        </div>


                        <div className="fee-card">

                            <span>
                                Remaining Amount
                            </span>

                            <strong className="remaining-amount">

                                ₹
                                {fee.remainingFee.toLocaleString()}

                            </strong>

                        </div>


                        <div className="fee-card">

                            <span>
                                Payment Status
                            </span>

                            <strong className="fee-status">

                                {fee.status}

                            </strong>

                        </div>

                    </div>


                    {/* ==========================================
                        PAYMENT HISTORY
                    ========================================== */}

                    <div className="fees-history-card">

                        <div className="fees-card-header">

                            <div>

                                <h2>
                                    Payment History
                                </h2>

                                <p>
                                    Your fee payment receipts
                                </p>

                            </div>

                        </div>


                        {/* ==========================================
                            NO RECEIPTS
                        ========================================== */}

                        {receipts.length === 0 ? (

                            <div className="no-receipts">

                                <div className="no-receipts-icon">
                                    🧾
                                </div>

                                <h3>
                                    No Fee Receipts Available
                                </h3>

                                <p>
                                    Your payment receipt will
                                    appear here after it is generated.
                                </p>

                            </div>

                        ) : (

                            <div className="fees-table">

                                {/* TABLE HEADER */}

                                <div className="fee-row fee-heading">

                                    <span>
                                        Receipt No.
                                    </span>

                                    <span>
                                        Date
                                    </span>

                                    <span>
                                        Amount
                                    </span>

                                    <span>
                                        Payment Mode
                                    </span>

                                    <span>
                                        Status
                                    </span>

                                    <span>
                                        Action
                                    </span>

                                </div>


                                {/* RECEIPTS */}

                                {receipts.map((receipt) => (

                                    <div
                                        className="fee-row"
                                        key={receipt._id}
                                    >

                                        <strong>
                                            {receipt.receiptNumber}
                                        </strong>


                                        <span>

                                            {receipt.paymentDate
                                                ? new Date(
                                                    receipt.paymentDate
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )
                                                : "-"}

                                        </span>


                                        <strong className="paid-amount">

                                            ₹
                                            {Number(
                                                receipt.amount || 0
                                            ).toLocaleString()}

                                        </strong>


                                        <span>
                                            {receipt.paymentMode || "-"}
                                        </span>


                                        <span className="payment-status">
                                            {receipt.status || "Paid"}
                                        </span>


                                        <button
                                            className="download-receipt-btn"
                                            onClick={() =>
                                                handleDownloadReceipt(
                                                    receipt._id,
                                                    receipt.receiptNumber
                                                )
                                            }
                                        >
                                            ↓ Download
                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </>

            )}

        </div>
    );
}

export default Fees;


