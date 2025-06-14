import pool from "../config/db.config";

export default class FicheqsHasField {
    constructor(
        public idFiche: number,
        public idField: number,
        public valeur: boolean | null,
        public description: string | null
    ) {}

    // Met à jour la valeur et la description pour un champ d'une fiche
    public static async setFieldValue(
        idFiche: number,
        idField: number,
        valeur: boolean | null,
        description?: string
    ) {
        // Validation métier
        if (valeur === false && (!description || description.trim() === "")) {
            throw new Error("Description obligatoire si valeur = false");
        }
        if (valeur !== false) {
            description = "";
        }

        const query = `UPDATE ficheqs_has_field SET valeur = $1, description = $2 WHERE id_fiche = $3 AND id_field = $4`;
        const values = [valeur, description, idFiche, idField];
        await pool.query(query, values);
    }

    // Récupère la valeur et la description pour un champ d'une fiche
    public static async getFieldValue(idFiche: number, idField: number) {
        const query =
            "SELECT * FROM ficheqs_has_field WHERE id_fiche = $1 AND id_field = $2";
        const values = [idFiche, idField];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new FicheqsHasField(
            row.id_fiche,
            row.id_field,
            row.valeur,
            row.description
        );
    }
}
