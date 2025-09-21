import React, { useEffect, useState } from "react";
import { getFicheQSById } from "../../services/api";
import FicheqsForm from "../FicheqsForm/FicheqsForm";

type FicheqsDetailsFormProps = {
    idFiche: number;
};

const FicheqsDetailsForm: React.FC<FicheqsDetailsFormProps> = ({ idFiche }) => {
    const [ficheData, setFicheData] = useState<any>(null);

    useEffect(() => {
        getFicheQSById(idFiche).then((data) => setFicheData(data));
    }, [idFiche]);

    if (!ficheData) return <div className="loader"></div>;

    console.log("Fiche Data:", ficheData);

    return (
        <FicheqsForm
            ficheData={ficheData.fiche}
            fields={ficheData.fields}
            readOnly={true} // affichage des données de la fiche en read-only
            showSubmitButton={false}
            showEmailButton={true}
            showDeleteButton={true}
        />
    );
};

export default FicheqsDetailsForm;
