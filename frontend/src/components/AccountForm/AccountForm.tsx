import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { updateAccount } from "../../services/api";
import { validatePassword } from "../../utils/password";

const AccountForm: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (password) {
            const error = validatePassword(password);
            if (error) {
                setPasswordError(error);
                return;
            }
        }
        setPasswordError(null);

        try {
            await updateAccount(parseInt(userId), email, password);
            document.cookie = `email=${encodeURIComponent(email)};path=/;max-age=${2 * 60 * 60}`;
            setTimeout(() => navigate("/dashboard"));
        } catch {
            console.log("Erreur lors de la mise à jour du compte");
        }
    }

    useEffect(() => {
        setEmail(decodeURIComponent(getCookie("email")));
        setUserId(decodeURIComponent(getCookie("userId")));
    }, []);

    return (
        <form className="auditqsForm" onSubmit={handleSubmit}>
            <div className="formHeader">
                <div>
                    <label>Email :</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError(null);
                        }}
                    />
                    <small>
                        Laisser vide pour ne pas changer — 12 caractères minimum, 1 majuscule, 1 chiffre, 1 caractère
                        spécial
                    </small>
                    {passwordError && <p className="errorMessage">{passwordError}</p>}
                </div>
            </div>
            <button type="submit" className="buttonLogin">
                Enregistrer
            </button>
        </form>
    );
};

export default AccountForm;
