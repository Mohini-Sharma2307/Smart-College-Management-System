import "./ProfessionalAlert.css";

function ProfessionalAlert({
    show,
    type = "warning",
    title = "Warning",
    message,
    onClose
}) {
    if (!show) return null;

    return (
        <div className="professional-alert-overlay">
            <div className={`professional-alert ${type}`}>

                <button
                    className="professional-alert-close"
                    onClick={onClose}
                    aria-label="Close alert"
                >
                    ×
                </button>

                <div className="professional-alert-icon">
                    {type === "success" && "✓"}
                    {type === "warning" && "!"}
                    {type === "error" && "×"}
                    {type === "info" && "i"}
                </div>

                <div className="professional-alert-content">
                    <h3>{title}</h3>
                    <p>{message}</p>
                </div>

                <button
                    className="professional-alert-btn"
                    onClick={onClose}
                >
                    Okay
                </button>

            </div>
        </div>
    );
}

export default ProfessionalAlert;