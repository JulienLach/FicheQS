import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import { formatDate } from "../../utils/date";
import { formatStatus } from "../../utils/status";
import { getAllFicheqs } from "../../services/api";

const AllFichesqsPage: React.FC = () => {
    const [fiches, setFiches] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllFicheqs()
            .then(setFiches)
            .catch(() => setError("Impossible de charger les fiches."));
    }, []);

    console.log("Fiches:", fiches);

    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fas fa-file-circle-check"></i>Fiches qualité
                    sécurité validées
                </h2>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <ul>
                    {fiches.map((fiche) => (
                        <div className="ficheqsCard">
                            <div>
                                <ul key={fiche.idFiche}>
                                    {fiche.logement}
                                    {formatDate(fiche.visiteDate)}
                                </ul>
                            </div>
                            <div>{formatStatus(fiche.status)}</div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllFichesqsPage;
