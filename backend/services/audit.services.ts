import Audit from "../data/audit";
import { AuditData, AuditHasQuestionData, ActionCorrectiveData, Rating } from "../interfaces/interfaces";

export async function getAllAudits(): Promise<AuditData[]> {
    return await Audit.getAllAudits();
}

export async function getAuditById(idAudit: number): Promise<{
    audit: AuditData;
    questions: AuditHasQuestionData[];
    actions: ActionCorrectiveData[];
}> {
    return await Audit.getAuditById(idAudit);
}

export async function createAudit(
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
    actions: { nature: string; delai: string; responsable: string }[]
): Promise<AuditData> {
    return await Audit.createAudit(status, auditDate, site, auditeur, natureAudit, audites, observationGenerale, signature, signatureTimestamp, idUser, questions, actions);
}

export async function deleteAudit(idAudit: number): Promise<void> {
    return await Audit.deleteAudit(idAudit);
}
