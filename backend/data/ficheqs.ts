import pool from "../config/db.config";
import FicheqsHasField from "./ficheqs_has_field";
import { FicheqsData, FicheqsHasFieldData } from "../interfaces/interfaces";

export default class Ficheqs {
    constructor(
        public idFiche: number,
        public status: string,
        public visiteDate: string,
        public logement: string,
        public idUser: number
    ) {}

    public static async getAllFichesQS(): Promise<FicheqsData[]> {
        const result = await pool.query(
            "SELECT id_fiche, status, TO_CHAR(visite_date, 'YYYY-MM-DD') AS visite_date, logement, id_user FROM ficheqs ORDER BY visite_date DESC"
        );
        return result.rows.map(
            (row: any): FicheqsData => ({
                idFiche: row.id_fiche,
                status: row.status,
                visiteDate: row.visite_date,
                logement: row.logement,
                idUser: row.id_user,
            })
        );
    }

    public static async getFicheQSById(idFiche: number): Promise<{
        fiche: FicheqsData;
        fields: FicheqsHasFieldData[];
    }> {
        const query =
            "SELECT id_fiche, status, TO_CHAR(visite_date, 'YYYY-MM-DD') AS visite_date, logement, id_user FROM ficheqs WHERE id_fiche = $1";
        const values = [idFiche];
        const result = await pool.query(query, values);
        const row = result.rows[0];

        // Récupère les champs associés
        const fields = await FicheqsHasField.getFieldsByFicheId(idFiche);

        // Retourne un objet avec la fiche et ses champs associés de la table ficheqs_has_field
        return {
            fiche: {
                idFiche: row.id_fiche,
                status: row.status,
                visiteDate: row.visite_date,
                logement: row.logement,
                idUser: row.id_user,
            },
            fields: fields,
        };
    }

    public static async createFicheQS(
        status: number,
        visiteDate: string,
        logement: string,
        idUser: number,
        fields: {
            idField: number;
            valeur: boolean | null;
            description?: string;
        }[]
    ): Promise<FicheqsData> {
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

        return {
            idFiche: row.id_fiche,
            status: row.status,
            visiteDate: row.visite_date,
            logement: row.logement,
            idUser: row.id_user,
        };
    }

    public static async deleteFicheqs(idFiche: number): Promise<void> {
        const queryFields = "DELETE FROM ficheqs_has_field WHERE id_fiche = $1";
        const values = [idFiche];
        await pool.query(queryFields, values);

        const queryFiche = "DELETE FROM ficheqs WHERE id_fiche = $1";
        await pool.query(queryFiche, values);
    }
}
