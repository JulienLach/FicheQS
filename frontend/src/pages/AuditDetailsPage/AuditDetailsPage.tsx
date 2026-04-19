import React from "react";
import Menu from "../../components/Menu/Menu";
import { useParams } from "react-router-dom";
import AuditDetailsForm from "../../components/AuditDetailsForm/AuditDetailsForm";

const AuditDetailsPage: React.FC = () => {
    const { idFiche } = useParams();

    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fas fa-bars"></i>Audit sécurité validé
                </h2>
                <AuditDetailsForm idFiche={Number(idFiche)} />
            </div>
        </div>
    );
};

export default AuditDetailsPage;
