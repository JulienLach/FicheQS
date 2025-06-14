import pool from "../config/db.config";

export default class Fields {
    constructor(public idField: number, public name: string) {}

    public static async getAllFields() {
        const result = await pool.query("SELECT * FROM fields");
        return result.rows.map(
            (row: any) => new Fields(row.id_field, row.name)
        );
    }
}
