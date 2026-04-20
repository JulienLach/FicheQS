import pool from "../config/db.config";
import jsonwebtoken from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/password";

function generateToken(userId: number, role: number) {
    const payload = { userId, role };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET non défini dans .env");
    return jsonwebtoken.sign(payload, secret, { expiresIn: "2h" });
}

export async function authenticateUser(email: string, password: string) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
        throw new Error("Utilisateur non trouvé");
    }

    const user = result.rows[0];

    if (!verifyPassword(password, user.password)) {
        throw new Error("Mot de passe incorrect");
    }

    const token = generateToken(user.id_user, user.role ?? 1);

    return { userId: user.id_user, token, firstname: user.firstname, lastname: user.lastname, role: user.role ?? 1 };
}

export async function updateAccount(userId: number, email: string, password?: string) {
    try {
        const fields: string[] = ["email = $1"];
        const values: any[] = [email];

        if (password) {
            fields.push(`password = $${values.length + 1}`);
            values.push(hashPassword(password));
        }

        values.push(userId);
        const query = `UPDATE users SET ${fields.join(", ")} WHERE id_user = $${values.length} RETURNING *`;
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }

        return { success: true, message: "Compte mis à jour avec succès", email };
    } catch (error: any) {
        throw new Error(`Erreur lors de la mise à jour du compte: ${error.message}`);
    }
}
