import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Menu />
            <div className="container">
                <button className="buttonDashboard" onClick={() => navigate("/audit")}>
                    <i className="far fa-file-lines"></i>Créer un audit sécurité
                </button>
                <button className="buttonDashboard" onClick={() => navigate("/all-audits")}>
                    <i className="fas fa-bars"></i>Audits sécurité validés
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
