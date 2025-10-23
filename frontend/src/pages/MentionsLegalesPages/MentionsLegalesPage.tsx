import React from "react";
import Menu from "../../components/Menu/Menu";

const MentionsLegalesPage: React.FC = () => {
    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fa-regular fa-circle-question"></i>Mentions Légales
                </h2>
                <p className="gdprText">
                    <strong>Collecte de données :</strong> Nous collectons votre email, nom et prénom uniquement pour
                    générer et envoyer des fiches QS par email.
                    <br />
                    <br />
                    <strong>Stockage :</strong> Les données sont stockées en base de données et supprimées sur demande.
                    <br />
                    <br />
                    <strong>Vos droits :</strong> Vous pouvez demander l'accès, la rectification ou la suppression de
                    vos données en nous contactant.
                    <br />
                    <br />
                    <strong>Contact :</strong> Pour toute demande, envoyez un email à contact@ficheqs.ovh.
                    <br />
                </p>
            </div>
        </div>
    );
};

export default MentionsLegalesPage;
