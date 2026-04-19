import pool from "../config/db.config";
import AuditHasQuestion from "./audit_has_question";
import { AuditData, AuditHasQuestionData, ActionCorrectiveData, Rating } from "../interfaces/interfaces";

export default class Audit {
    constructor(
        public idAudit: number,
        public status: number,
        public auditDate: string,
        public site: string,
        public auditeur: string,
        public natureAudit: string,
        public audites: string,
        public observationGenerale: string | null,
        public signature: string | null,
        public signatureTimestamp: string | null,
        public idUser: number,
    ) {}

    public static async getAllAudits(): Promise<AuditData[]> {
        const result = await pool.query(
            "SELECT id_audit, status, TO_CHAR(audit_date, 'YYYY-MM-DD') AS audit_date, site, auditeur, nature_audit, audites, id_user FROM audits ORDER BY id_audit DESC",
        );
        return result.rows.map(
            (row: any): AuditData => ({
                idAudit: row.id_audit,
                status: row.status,
                auditDate: row.audit_date,
                site: row.site,
                auditeur: row.auditeur,
                natureAudit: row.nature_audit,
                audites: row.audites,
                observationGenerale: row.observation_generale,
                signature: row.signature,
                signatureTimestamp: row.signature_timestamp ?? null,
                idUser: row.id_user,
            }),
        );
    }

    public static async getAuditById(idAudit: number): Promise<{
        audit: AuditData;
        questions: AuditHasQuestionData[];
        actions: ActionCorrectiveData[];
    }> {
        const result = await pool.query(
            "SELECT id_audit, status, TO_CHAR(audit_date, 'YYYY-MM-DD') AS audit_date, site, auditeur, nature_audit, audites, observation_generale, signature, signature_timestamp, id_user FROM audits WHERE id_audit = $1",
            [idAudit],
        );
        const row = result.rows[0];

        const questions = await AuditHasQuestion.getQuestionsByAuditId(idAudit);

        const actionsResult = await pool.query(
            "SELECT id_action, id_audit, nature, TO_CHAR(delai, 'YYYY-MM-DD') AS delai, responsable FROM actions_correctives WHERE id_audit = $1",
            [idAudit],
        );
        const actions: ActionCorrectiveData[] = actionsResult.rows.map((r: any) => ({
            idAction: r.id_action,
            idAudit: r.id_audit,
            nature: r.nature,
            delai: r.delai,
            responsable: r.responsable,
        }));

        return {
            audit: {
                idAudit: row.id_audit,
                status: row.status,
                auditDate: row.audit_date,
                site: row.site,
                auditeur: row.auditeur,
                natureAudit: row.nature_audit,
                audites: row.audites,
                observationGenerale: row.observation_generale,
                signature: row.signature,
                signatureTimestamp: row.signature_timestamp ?? null,
                idUser: row.id_user,
            },
            questions,
            actions,
        };
    }

    public static async createAudit(
        status: number,
        auditDate: string,
        site: string,
        auditeur: string,
        natureAudit: string,
        audites: string,
        observationGenerale: string | null,
        signature: string | null,
        signatureTimestamp: string | null,
        idUser: number,
        questions: { idQuestion: number; valeur: Rating; observation?: string }[],
        actions: { nature: string; delai: string; responsable: string }[],
    ): Promise<AuditData> {
        const result = await pool.query(
            `INSERT INTO audits (status, audit_date, site, auditeur, nature_audit, audites, observation_generale, signature, signature_timestamp, id_user)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING *`,
            [
                status,
                auditDate,
                site,
                auditeur,
                natureAudit,
                audites,
                observationGenerale || null,
                signature || null,
                signatureTimestamp || null,
                idUser,
            ],
        );
        const row = result.rows[0];

        for (const q of questions) {
            await pool.query(
                "INSERT INTO audits_has_question (id_audit, id_question, valeur, observation) VALUES ($1, $2, $3, $4)",
                [row.id_audit, q.idQuestion, q.valeur ?? null, q.observation || null],
            );
        }

        for (const a of actions) {
            await pool.query(
                "INSERT INTO actions_correctives (id_audit, nature, delai, responsable) VALUES ($1, $2, $3, $4)",
                [row.id_audit, a.nature || null, a.delai || null, a.responsable || null],
            );
        }

        return {
            idAudit: row.id_audit,
            status: row.status,
            auditDate: row.audit_date,
            site: row.site,
            auditeur: row.auditeur,
            natureAudit: row.nature_audit,
            audites: row.audites,
            observationGenerale: row.observation_generale,
            signature: row.signature,
            signatureTimestamp: row.signature_timestamp ?? null,
            idUser: row.id_user,
        };
    }

    public static async deleteAudit(idAudit: number): Promise<void> {
        await pool.query("DELETE FROM audits WHERE id_audit = $1", [idAudit]);
    }
}
