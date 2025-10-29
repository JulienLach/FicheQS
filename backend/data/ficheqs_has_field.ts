import pool from "../config/db.config";
import { FicheqsHasFieldData } from "../interfaces/interfaces";

export default class FicheqsHasField {
    constructor(
        public idFiche: number,
        public idField: number,
        public valeur: boolean | null,
        public description: string | null
    ) {}

    public static async getFieldsByFicheId(idFiche: number): Promise<FicheqsHasFieldData[]> {
        const query = "SELECT * FROM ficheqs_has_field WHERE id_fiche = $1";
        const values = [idFiche];
        const result = await pool.query(query, values);
        return result.rows.map(
            (row: any): FicheqsHasFieldData => ({
                idFiche: row.id_fiche,
                idField: row.id_field,
                valeur: row.valeur,
                description: row.description,
            })
        );
    }
}
