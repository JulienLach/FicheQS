import React, { useEffect, useState } from "react";
import { getFicheqsById } from "../../services/api";
import FicheqsForm from "../FicheqsForm/FicheqsForm";

type FicheqsDetailsFormProps = {
    idFiche: number;
};

const FicheqsDetailsForm: React.FC<FicheqsDetailsFormProps> = ({ idFiche }) => {
    const [ficheData, setFicheData] = useState<any>(null);

    useEffect(() => {
        getFicheqsById(idFiche).then((data) => setFicheData(data));
    }, [idFiche]);

    if (!ficheData) return <div>Chargement...</div>;

    console.log("Fiche Data:", ficheData);

    return (
        <FicheqsForm
            ficheData={ficheData.fiche}
            fields={ficheData.fields}
            readOnly={true} // afficahge des données de la fiche en read-only
        />
    );
};

export default FicheqsDetailsForm;
