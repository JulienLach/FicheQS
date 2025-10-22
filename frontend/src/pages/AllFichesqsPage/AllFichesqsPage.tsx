import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import { formatDate } from "../../utils/date";
import { formatStatus } from "../../utils/status";
import { getAllFicheqs } from "../../services/api";

const itemsPerPage = 5;

const AllFichesqsPage: React.FC = () => {
    const [fiches, setFiches] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        getAllFicheqs()
            .then(setFiches)
            .catch(() => setError("Impossible de charger les fiches."));
        if (!fiches) {
            setError("Aucune fiche");
        }
    }, []);

    const totalPages = Math.ceil(fiches.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const fichesToShow = fiches.slice(startIdx, endIdx);

    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="far fa-circle-check"></i>Fiches qualité sécurité validées
                </h2>
                {error && <div className="empty">{error}</div>}
                <ul>
                    {fichesToShow.map((fiche) => (
                        <div
                            className="ficheqsCard"
                            key={fiche.idFiche}
                            onClick={() => navigate(`/ficheqs-details/${fiche.idFiche}`)}
                        >
                            <div className="ficheqsDetails">
                                <p>
                                    <i className="far fa-house"></i>
                                    <span>Logement :</span> {fiche.logement}
                                </p>
                                <p>
                                    <i className="far fa-calendar"></i>
                                    <span>Date :</span> {formatDate(fiche.visiteDate)}
                                </p>
                            </div>
                            <div className="ficheStatus">{formatStatus(fiche.status)}</div>
                        </div>
                    ))}
                </ul>
                <div className="pagination">
                    <i
                        className={`fas fa-chevron-left${page === 1 ? " disabled" : ""}`}
                        onClick={() => page > 1 && setPage(page - 1)}
                        aria-label="Page précédente"
                    ></i>
                    <span>
                        {page} / {totalPages}
                    </span>
                    <i
                        className={`fas fa-chevron-right${page === totalPages ? " disabled" : ""}`}
                        onClick={() => page < totalPages && setPage(page + 1)}
                        aria-label="Page suivante"
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default AllFichesqsPage;
