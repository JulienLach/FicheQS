const API_URL = import.meta.env.VITE_API_URL;
import { formData } from "../types/api.types";

export async function authenticateUser(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });
    console.log("body", { email, password });
    console.log("response", response);
    if (!response.ok) {
        throw new Error("Erreur de connexion");
    }

    const data = await response.json();
    // cookie dans le localstorage après login pour la redirection
    localStorage.setItem("token", data.token);
    return data;
}

export async function createFicheqs(ficheData: any) {
    const response = await fetch(`${API_URL}/ficheqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ficheData),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la création de la fiche");
    }
    return response.json();
}

export async function getAllFicheqs() {
    const response = await fetch(`${API_URL}/ficheqs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des fichesqs");
    }
    return response.json();
}

export async function getFicheQSById(idFiche: number) {
    const response = await fetch(`${API_URL}/ficheqs/${idFiche}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la ficheqs");
    }
    return response.json();
}

export async function sendPDF(formData: formData) {
    const response = await fetch(`${API_URL}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur de l'envoi du PDF par email");
    }
    return response.json();
}

export async function updateAccount(userId: number, email: string, password: string) {
    const response = await fetch(`${API_URL}/account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, password }),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du compte");
    }
    return response.json();
}
