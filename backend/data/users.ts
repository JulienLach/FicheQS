import pool from "../config/db.config";
import { UserData } from "../interfaces/types";

export default class Users {
    constructor(
        public idUser: number,
        public firstname: string,
        public lastname: string,
        public password: string,
        public email: string
    ) {}

    public static async getUserById(id: number): Promise<UserData> {
        const query = "SELECT * FROM users WHERE id_user = $1";
        const values = [id];
        const result = await pool.query(query, values);
        const row = result.rows[0];
        return {
            idUser: row.id_user,
            firstname: row.firstname,
            lastname: row.lastname,
            password: row.password,
            email: row.email
        };
    }
}
