import pool from "../config/db.config";

export default class FicheqsHasField {
    constructor(
        public idFiche: number,
        public idField: number,
        public valeur: boolean | null,
        public description: string | null
    ) {}

    public static async getFieldsByFicheId(idFiche: number) {
        const query = "SELECT * FROM ficheqs_has_field WHERE id_fiche = $1";
        const values = [idFiche];
        const result = await pool.query(query, values);
        return result.rows.map(
            (row: any) =>
                new FicheqsHasField(
                    row.id_fiche,
                    row.id_field,
                    row.valeur,
                    row.description
                )
        );
    }
}
