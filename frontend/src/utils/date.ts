export function formatDate(dateString: string) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("T")[0].split("-");
    // Ajoute +1 au jour
    const newDay = String(Number(day) + 1).padStart(2, "0");
    return `${newDay}/${month}/${year}`;
}

export function toInputDateValue(dateString: string) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("T")[0].split("-");
    const newDay = String(Number(day) + 1).padStart(2, "0");
    return `${year}-${month}-${newDay}`;
}