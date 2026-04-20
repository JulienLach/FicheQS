import React, { useEffect, useState } from "react";
import { getAuditById } from "../../services/api";
import AuditForm from "../AuditForm/AuditForm";

type AuditDetailsFormProps = {
    idAudit: number;
};

const AuditDetailsForm: React.FC<AuditDetailsFormProps> = ({ idAudit }) => {
    const [auditData, setAuditData] = useState<any>(null);

    useEffect(() => {
        getAuditById(idAudit).then(setAuditData);
    }, [idAudit]);

    if (!auditData) return <div className="loader"></div>;

    return (
        <AuditForm
            auditData={auditData.audit}
            questions={auditData.questions}
            actions={auditData.actions}
            readOnly={true}
            showSubmitButton={false}
            showEmailButton={true}
            showDeleteButton={true}
        />
    );
};

export default AuditDetailsForm;
