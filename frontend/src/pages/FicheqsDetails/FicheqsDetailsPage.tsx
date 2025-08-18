import React from "react";
import Menu from "../../components/Menu/Menu";
import { useParams } from "react-router-dom";
import FicheqsDetailsForm from "../../components/FicheqsDetailsForm/FicheqsDetailsForm";

const FicheqsDetailsPage: React.FC = () => {
    const { idFiche } = useParams();

    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fas fa-file-circle-check"></i>Fiche qualité sécurité validée
                </h2>
                <FicheqsDetailsForm idFiche={Number(idFiche)} />
            </div>
        </div>
    );
};

export default FicheqsDetailsPage;
