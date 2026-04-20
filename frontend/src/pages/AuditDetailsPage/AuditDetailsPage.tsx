import React from "react";
import Menu from "../../components/Menu/Menu";
import { useParams } from "react-router-dom";
import AuditDetailsForm from "../../components/AuditDetailsForm/AuditDetailsForm";

const AuditDetailsPage: React.FC = () => {
    const { idAudit } = useParams();

    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fas fa-bars"></i>Audit sécurité validé
                </h2>
                <AuditDetailsForm idAudit={Number(idAudit)} />
            </div>
        </div>
    );
};

export default AuditDetailsPage;
