import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import { formatDate } from "../../utils/date";
import { getAllAudits } from "../../services/api";
import { usePagination } from "../../hooks/usePagination";

const PAGE_SIZE = 4;

const AllAuditsPage: React.FC = () => {
    const [audits, setAudits] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const { paginatedData: auditsToShow, totalPages } = usePagination(audits, page, PAGE_SIZE);

    const navigate = useNavigate();

    useEffect(() => {
        getAllAudits()
            .then(setAudits)
            .catch(() => setError("Impossible de charger les audits."));
    }, []);

    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fas fa-bars"></i>Audits sécurité validés
                </h2>
                {error && <div className="alert-error">{error}</div>}
                <ul className="auditList">
                    {auditsToShow.map((audit) => (
                        <div
                            className="auditCard"
                            key={audit.idAudit}
                            onClick={() => navigate(`/audit-details/${audit.idAudit}`)}
                        >
                            <div className="auditDetails">
                                <p>
                                    <i className="fas fa-location-dot"></i>
                                    <span>Site :</span> {audit.site}
                                </p>
                                <p>
                                    <i className="fas fa-calendar"></i>
                                    <span>Date :</span> {formatDate(audit.auditDate)}
                                </p>
                                <p>
                                    <i className="fas fa-user"></i>
                                    <span>Auditeur :</span> {audit.auditeur}
                                </p>
                                {audit.audites && (
                                    <p>
                                        <i className="fas fa-user-group"></i>
                                        <span>Audités :</span> {audit.audites}
                                    </p>
                                )}
                            </div>
                            <div className="auditCardFooter">
                                <span className="auditCardCta">Voir</span>
                            </div>
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
                        {page} / {totalPages || 1}
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

export default AllAuditsPage;
