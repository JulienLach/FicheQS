import pool from "../config/db.config";

export default class Users {
    constructor(
        public idUser: number,
        public username: string,
        public password: string,
        public email: string
    ) {}

    public static async getUserById(id: number) {
        const query = "SELECT * FROM users WHERE id_user = $1";
        const values = [id];
        const result = await pool.query(query, values);
        const row = result.rows[0];
        return new Users(row.id_user, row.username, row.password, row.email);
    }
}
