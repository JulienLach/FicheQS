import pool from "../config/db.config";
import { FieldData } from "../interfaces/interfaces";

export default class Fields {
    constructor(public idField: number, public name: string) {}

    public static async getAllFields(): Promise<FieldData[]> {
        const result = await pool.query("SELECT * FROM fields");
        return result.rows.map(
            (row: any): FieldData => ({
                idField: row.id_field,
                name: row.name,
            })
        );
    }
}
