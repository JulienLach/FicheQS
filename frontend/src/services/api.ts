const API_URL = import.meta.env.VITE_API_URL;

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
    return response.json();
}

export async function createFicheqs() {}

export async function getAllFicheqs() {}
