export interface formData {
    to: string;
    subject: string;
    body: string;
    attachmentBase64: string;
    filename: string;
}

export interface Field {
    idField: number;
    valeur: boolean | null;
    description: string;
    label: string;
}

export interface FieldSectionProps {
    title: string;
    fields: Field[];
    onFieldChange: (idx: number, key: string, value: any) => void;
    readOnly: boolean;
}
