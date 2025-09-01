import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { updateAccount } from "../../services/api";

const AccountForm: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const result = await updateAccount(parseInt(userId), email, password);

            console.log("Compte mis à jour avec succès");

            // Mise à jour du cookie email si l'email a été modifié
            document.cookie = `email=${encodeURIComponent(email)};path=/;max-age=${2 * 60 * 60}`;

            setTimeout(() => {
                navigate("/dashboard");
            });
        } catch (error: any) {
            console.log("Erreur lors de la mise à jour du compte");
        }
    }

    useEffect(() => {
        const email = decodeURIComponent(getCookie("email"));
        setEmail(email);
        const userId = decodeURIComponent(getCookie("userId"));
        setUserId(userId);
    }, []);

    return (
        <form className="ficheqsForm" onSubmit={handleSubmit}>
            <div className="formHeader">
                <div>
                    <label>Email :</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <small>Modifier le mot de passe</small>
                </div>
            </div>
            <hr />
            <button type="submit" className="buttonLogin">
                <i className="fas fa-save"></i>
                Enregister
            </button>
        </form>
    );
};

export default AccountForm;
