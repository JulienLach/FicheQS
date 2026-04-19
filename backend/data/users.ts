import pool from "../config/db.config";
import { UserData } from "../interfaces/interfaces";
import { hashPassword } from "../utils/password";

export default class Users {
    constructor(
        public idUser: number,
        public firstname: string,
        public lastname: string,
        public password: string,
        public email: string,
        public role: number,
    ) {}

    public static async getUserById(id: number): Promise<UserData> {
        const query = "SELECT * FROM users WHERE id_user = $1";
        const result = await pool.query(query, [id]);
        const row = result.rows[0];
        return {
            idUser: row.id_user,
            firstname: row.firstname,
            lastname: row.lastname,
            password: row.password,
            email: row.email,
            role: row.role ?? 1,
        };
    }

    public static async getAllUsers(): Promise<{ users: any[] }> {
        const rows = await pool.query("SELECT id_user, email, firstname, lastname, role FROM users ORDER BY id_user");
        return {
            users: rows.rows.map((r: any) => ({
                idUser: r.id_user,
                email: r.email,
                firstname: r.firstname ?? "",
                lastname: r.lastname ?? "",
                role: r.role ?? 1,
            })),
        };
    }

    public static async createUser(email: string, password: string, firstname?: string, lastname?: string): Promise<void> {
        const hashed = hashPassword(password);
        await pool.query(
            "INSERT INTO users (email, password, firstname, lastname, role) VALUES ($1, $2, $3, $4, 1)",
            [email, hashed, firstname ?? null, lastname ?? null],
        );
    }

    public static async updateUser(idUser: number, email?: string, password?: string, firstname?: string, lastname?: string): Promise<void> {
        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;
        if (email !== undefined)     { fields.push(`email = $${idx++}`);     values.push(email); }
        if (firstname !== undefined) { fields.push(`firstname = $${idx++}`); values.push(firstname); }
        if (lastname !== undefined)  { fields.push(`lastname = $${idx++}`);  values.push(lastname); }
        if (password) {
            fields.push(`password = $${idx++}`);
            values.push(hashPassword(password));
        }
        if (fields.length === 0) return;
        values.push(idUser);
        await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id_user = $${idx}`, values);
    }
}
