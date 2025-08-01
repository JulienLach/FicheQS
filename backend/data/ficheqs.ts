import pool from "../config/db.config";
import FicheqsHasField from "./ficheqs_has_field";

export default class Ficheqs {
    constructor(
        public idFiche: number,
        public status: string,
        public visiteDate: Date,
        public logement: string,
        public idUser: number
    ) {}

    public static async getAllFichesQS() {
        const result = await pool.query("SELECT * FROM ficheqs ORDER BY visite_date DESC");
        return result.rows.map(
            (row: any) => new Ficheqs(row.id_fiche, row.status, row.visite_date, row.logement, row.id_user)
        );
    }

    public static async getFicheQSById(idFiche: number) {
        const query = "SELECT * FROM ficheqs WHERE id_fiche = $1";
        const values = [idFiche];
        const result = await pool.query(query, values);
        const row = result.rows[0];

        // Récupère les champs associés
        const fields = await FicheqsHasField.getFieldsByFicheId(idFiche);

        // Retourne un objet avec la fiche et ses champs
        return {
            fiche: new Ficheqs(row.id_fiche, row.status, row.visite_date, row.logement, row.id_user),
            fields: fields,
        };
    }

    public static async createFicheQS(
        status: number,
        visiteDate: Date,
        logement: string,
        idUser: number,
        fields: {
            idField: number;
            valeur: boolean | null;
            description?: string;
        }[]
    ) {
        // 1. Insérer la fiche dans la table ficheqs
        const query = `
            INSERT INTO ficheqs (status, visite_date, logement, id_user) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
        const values = [status, visiteDate, logement, idUser];
        const result = await pool.query(query, values);
        const row = result.rows[0];

        // 2. Insérer tous les champs renseignés par l'utilisateur
        for (const field of fields) {
            await pool.query(
                "INSERT INTO ficheqs_has_field (id_fiche, id_field, valeur, description) VALUES ($1, $2, $3, $4)",
                [row.id_fiche, field.idField, field.valeur, field.description || null]
            );
        }

        return new Ficheqs(row.id_fiche, row.status, row.visite_date, row.logement, row.id_user);
    }
}
