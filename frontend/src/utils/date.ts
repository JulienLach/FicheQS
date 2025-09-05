export function formatDate(dateString: string) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
}

export function toInputDateValue(dateString: string) {
    if (!dateString) return "";
    return dateString.split("T")[0];
}