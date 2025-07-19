import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FicheqsForm.css";

const FicheqsForm: React.FC = () => {
    const [status, setStatus] = useState("");
    const [idUser, setIdUser] = useState("");
    const [visiteDate, setVisiteDate] = useState("");
    const [logement, setLogement] = useState("");
    const [fields, setFields] = useState([
        { idField: 1, valeur: null, description: "" },
        { idField: 2, valeur: null, description: "" },
    ]);
    const navigate = useNavigate();

    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <form className="ficheqsForm" onSubmit={handleSubmit}>
            <div>
                <label>Date de visite :</label>
                <input
                    type="date"
                    value={visiteDate}
                    onChange={(e) => setVisiteDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Logement :</label>
                <input
                    type="text"
                    value={logement}
                    onChange={(e) => setLogement(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Par :</label>
                <input
                    type="text"
                    value={idUser}
                    onChange={(e) => setIdUser(e.target.value)}
                    required
                />
            </div>
            <hr />
            <div>
                <h3>DAAF</h3>
                <label>Champs :</label>
                {fields.map((field, idx) => (
                    <div key={field.idField} className="daaf-field">
                        <button
                            type="button"
                            className={
                                field.valeur === true
                                    ? "switch active"
                                    : "switch"
                            }
                            onClick={() =>
                                handleFieldChange(idx, "valeur", true)
                            }
                        >
                            OK
                        </button>
                        <button
                            type="button"
                            className={
                                field.valeur === false
                                    ? "switch active"
                                    : "switch"
                            }
                            onClick={() =>
                                handleFieldChange(idx, "valeur", false)
                            }
                        >
                            Pas opérationel
                        </button>
                        {field.valeur === false && (
                            <input
                                type="text"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <button type="submit">Créer la fiche</button>
        </form>
    );
};

export default FicheqsForm;
