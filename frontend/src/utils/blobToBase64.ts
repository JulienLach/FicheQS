/**
 * Fonction utilitaire pour convertir un Blob en base64
 * @param blob - Le Blob à convertir en base64
 * @returns Une Promise qui se résout avec la chaîne base64
 */
export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // Extraire uniquement la partie base64 sans le préfixe "data:application/pdf;base64,"
            const base64 = base64String.split(",")[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
