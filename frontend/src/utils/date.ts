export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
}

export function toInputDateValue(dateString: string) {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 10);
}
