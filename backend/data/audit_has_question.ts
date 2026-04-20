import pool from "../config/db.config";
import { AuditHasQuestionData, Rating } from "../interfaces/interfaces";

export default class AuditHasQuestion {
    constructor(
        public idAudit: number,
        public idQuestion: number,
        public valeur: Rating,
        public observation: string | null
    ) {}

    public static async getQuestionsByAuditId(idAudit: number): Promise<AuditHasQuestionData[]> {
        const result = await pool.query(
            "SELECT id_audit, id_question, valeur, observation FROM audits_has_question WHERE id_audit = $1",
            [idAudit]
        );
        return result.rows.map(
            (row: any): AuditHasQuestionData => ({
                idAudit: row.id_audit,
                idQuestion: row.id_question,
                valeur: row.valeur as Rating,
                observation: row.observation,
            })
        );
    }
}
