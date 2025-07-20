import React, { useState } from "react";
import Menu from "../../components/Menu/Menu";

const AllFichesqsPage: React.FC = () => {
    const [logement, setLogement] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");

    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fas fa-file-circle-check"></i> Fiches qualité
                    sécurité validées
                </h2>
            </div>
        </div>
    );
};

export default AllFichesqsPage;
