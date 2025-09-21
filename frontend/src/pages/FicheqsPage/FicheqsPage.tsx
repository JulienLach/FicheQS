import React from "react";
import Menu from "../../components/Menu/Menu";
import FicheqsForm from "../../components/FicheqsForm/FicheqsForm";

const FicheqsPage: React.FC = () => {
    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fas fa-file-circle-plus"></i> Nouvelle fiche qualité sécurité
                </h2>
                <FicheqsForm
                    ficheData={{
                        idFiche: 0,
                        status: 2,
                        email: "",
                        visiteDate: "",
                        logement: "",
                    }}
                    fields={[]}
                    readOnly={false}
                    showSubmitButton={true}
                    showEmailButton={false}
                    showDeleteButton={false}
                />
            </div>
        </div>
    );
};

export default FicheqsPage;
