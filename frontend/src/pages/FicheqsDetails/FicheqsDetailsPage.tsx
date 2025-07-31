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
                    <i className="fas fa-file-circle-check"></i> Récapitulatif fiche qualité sécurité
                </h2>
                <FicheqsDetailsForm idFiche={Number(idFiche)} />
                <button type="submit" className="buttonLogin">
                    <i className="fa-solid fa-paper-plane"></i>
                    Envoyer par mail
                </button>
            </div>
        </div>
    );
};

export default FicheqsDetailsPage;
