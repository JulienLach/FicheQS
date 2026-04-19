import React from "react";
import Menu from "../../components/Menu/Menu";
import AuditForm from "../../components/AuditForm/AuditForm";

const AuditPage: React.FC = () => {
    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="far fa-file-lines"></i> Audit sécurité
                </h2>
                <AuditForm
                    auditData={{
                        idAudit: 0,
                        status: 2,
                        auditDate: "",
                        site: "",
                        auditeur: "",
                        natureAudit: "",
                        audites: "",
                    }}
                    questions={[]}
                    actions={[]}
                    readOnly={false}
                    showSubmitButton={true}
                    showEmailButton={false}
                    showDeleteButton={false}
                />
            </div>
        </div>
    );
};

export default AuditPage;
