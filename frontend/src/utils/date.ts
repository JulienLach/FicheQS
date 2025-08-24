export function formatDate(dateString: string) {
    if (!dateString) return "";
    // Prend juste la partie date, sans conversion
    const [year, month, day] = dateString.slice(0, 10).split("-");
    return `${day}/${month}/${year}`;
}

export function toInputDateValue(dateString: string) {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 10);
}
