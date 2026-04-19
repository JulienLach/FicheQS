const isLocalhost = window.location.hostname === "localhost";
const API_URL = isLocalhost ? "http://localhost:3001" : "/api";

import { formData } from "../interfaces/interfaces";

export async function authenticateUser(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Identifiants invalides");
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
}

export async function createAudit(auditData: any) {
    const response = await fetch(`${API_URL}/audits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auditData),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la création de l'audit");
    }
    return response.json();
}

export async function getAllAudits() {
    const response = await fetch(`${API_URL}/audits`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des audits");
    }
    return response.json();
}

export async function getAuditById(idAudit: number) {
    const response = await fetch(`${API_URL}/audits/${idAudit}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'audit");
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

export async function generatePDF(pdfData: any) {
    const response = await fetch(`${API_URL}/pdf/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pdfData),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la génération du PDF");
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

export async function getAdminUsers() {
    const response = await fetch(`${API_URL}/admin/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
    }
    return response.json();
}

export async function updateAdminUser(idUser: number, email?: string, password?: string, firstname?: string, lastname?: string) {
    const response = await fetch(`${API_URL}/admin/users/${idUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname, lastname }),
        credentials: "include",
    });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Erreur lors de la mise à jour");
    }
    return response.json();
}

export async function createAdminUser(email: string, password: string, firstname?: string, lastname?: string) {
    const response = await fetch(`${API_URL}/admin/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname, lastname }),
        credentials: "include",
    });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Erreur lors de la création de l'utilisateur");
    }
    return response.json();
}

export async function deleteAudit(idAudit: number) {
    const response = await fetch(`${API_URL}/audits/${idAudit}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'audit");
    }
    return response.json();
}
