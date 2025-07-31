import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Menu />
            <div className="container">
                <button className="buttonDashboard" onClick={() => navigate("/ficheqs")}>
                    <i className="fas fa-file-circle-plus"></i>Nouvelle fiche qualité sécurité
                </button>
                <button className="buttonDashboard" onClick={() => navigate("/all-fichesqs")}>
                    <i className="fas fa-file-circle-check"></i>Fiches qualité sécurité validées
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
