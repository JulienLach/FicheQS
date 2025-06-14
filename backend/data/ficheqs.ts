import pool from "../config/db.config";

export default class Ficheqs {
    constructor(
        public idFiche: number,
        public status: string,
        public visiteDate: Date,
        public logement: string,
        public idUser: number
    ) {}

    public static async getAllFichesQS() {
        const result = await pool.query("SELECT * FROM ficheqs");
        return result.rows.map(
            (row: any) =>
                new Ficheqs(
                    row.id_fiche,
                    row.status,
                    row.visite_date,
                    row.logement,
                    row.id_user
                )
        );
    }

    public static async getFicheQSById(idFiche: number) {
        const query = "SELECT * FROM ficheqs WHERE id_fiche = $1";
        const values = [idFiche];
        const result = await pool.query(query, values);
        const row = result.rows[0];
        return new Ficheqs(
            row.id_fiche,
            row.status,
            row.visite_date,
            row.logement,
            row.id_user
        );
    }

    public static async createFicheQS(
        idFiche: number,
        status: string,
        visiteDate: Date,
        logement: string,
        idUser: number
    ) {
        const query = `
            INSERT INTO ficheqs (id_fiche, status, visite_date, logement, id_user) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
        `;
        const values = [idFiche, status, visiteDate, logement, idUser];
        const result = await pool.query(query, values);
        const row = result.rows[0];
        return new Ficheqs(
            row.id_fiche,
            row.status,
            row.visite_date,
            row.logement,
            row.id_user
        );
    }
}
