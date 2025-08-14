import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Transporteur avec les informations du serveur SMTP Mailjet
const transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY,
    },
});

/**
 * Envoie un email avec pièce jointe PDF
 * @param to - Adresse email du destinataire
 * @param subject - Sujet de l'email
 * @param body - Contenu texte de l'email
 * @param attachments - Tableau de pièces jointes
 * @returns Promise qui se résout quand l'email est envoyé
 */
export async function sendPDF(
    to: string,
    subject: string,
    body: string,
    attachments: any[]
): Promise<{ success: boolean; message: string }> {
    const emailData = {
        from: process.env.EMAIL || "noreply@ficheqs.com",
        to,
        subject,
        body,
        attachments,
    };

    try {
        const info = await transporter.sendMail(emailData);
        console.log("Email envoyé:", info.response);
        return { success: true, message: "Email envoyé avec succès" };
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        return { success: false, message: error instanceof Error ? error.message : "Erreur inconnue" };
    }
}
