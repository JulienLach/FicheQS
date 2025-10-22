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
                    <i className="far fa-file"></i>Nouvelle fiche qualité sécurité
                </button>
                <button className="buttonDashboard" onClick={() => navigate("/all-fichesqs")}>
                    <i className="far fa-circle-check"></i>Fiches qualité sécurité validées
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
