export interface UserData {
    idUser: number;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    role: number;
}

export type Rating = 'J' | 'L' | 'NC' | null;

export interface AuditData {
    idAudit: number;
    status: number;
    auditDate: string;
    site: string;
    auditeur: string;
    natureAudit: string;
    audites: string;
    observationGenerale: string | null;
    signature: string | null;
    signatureTimestamp: string | null;
    idUser: number;
}

export interface QuestionData {
    idQuestion: number;
    name: string;
    section: string;
}

export interface AuditHasQuestionData {
    idAudit: number;
    idQuestion: number;
    valeur: Rating;
    observation: string | null;
}

export interface ActionCorrectiveData {
    idAction?: number;
    idAudit?: number;
    nature: string;
    delai: string;
    responsable: string;
}
