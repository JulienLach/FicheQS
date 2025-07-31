import pool from "../config/db.config";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

function generateToken(userId: number) {
    const payload = { userId };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET non défini dans .env");
    return jsonwebtoken.sign(payload, secret, { expiresIn: "2h" });
}

export async function authenticateUser(email: string, password: string) {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        throw new Error("Utilisateur non trouvé");
    }

    const user = result.rows[0];

    // Vérification du mot de passe
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    if (user.password !== hashedPassword) {
        throw new Error("Mot de passe incorrect");
    }

    // Génération du token JWT
    const token = generateToken(user.id_user);

    return { userId: user.id_user, token };
}
