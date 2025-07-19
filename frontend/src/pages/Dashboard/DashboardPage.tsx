import React from "react";
import Menu from "../../components/Menu/Menu";

const DashboardPage: React.FC = () => {
    return (
        <div>
            <Menu />
            <div className="container">
                <button className="buttonDashboard">
                    <i className="fas fa-file-circle-plus"></i>Nouvelle fiche
                    qualité sécurité
                </button>
                <button className="buttonDashboard">
                    <i className="fas fa-file-circle-check"></i>Fiches qualité
                    sécurité validées
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
