import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { authenticateUser } from "../../services/api";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || email.trim() === "") {
            setError("Email invalide");
            return;
        }

        try {
            const response = await authenticateUser(email, password);
            console.log("Connexion réussie :", response);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="email">Identifiant :</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="formGroup">
                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="buttonLogin">
                <i className="fa fa-user"></i>Connexion
            </button>
        </form>
    );
};

export default LoginForm;
