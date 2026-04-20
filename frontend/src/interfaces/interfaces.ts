export interface formData {
    to: string;
    subject: string;
    body: string;
    attachmentBase64: string;
    filename: string;
}

export type Rating = 'J' | 'L' | 'NC' | null;

export interface AuditQuestion {
    idQuestion: number;
    valeur: Rating;
    observation: string;
    label: string;
    section: string;
}

export interface QuestionSectionProps {
    title: string;
    sectionKey: string;
    questions: AuditQuestion[];
    onQuestionChange: (sectionKey: string, idx: number, key: string, value: any) => void;
    readOnly: boolean;
    startIndex?: number;
}

export interface ActionCorrective {
    nature: string;
    delai: string;
    responsable: string;
}

export interface UserAdmin {
    idUser: number;
    email: string;
    firstname: string;
    lastname: string;
    role: number;
}

export interface PendingAudit {
    localId: string;
    payload: any;
    savedAt: string;
}

export interface AuditMeta {
    idAudit: number;
    status: number;
    auditDate: string;
    site: string;
    auditeur: string;
    natureAudit: string;
    audites: string;
    observationGenerale: string;
    signature: string;
}
