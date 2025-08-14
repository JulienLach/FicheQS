import jsPDF from "jspdf";
import { formatDate } from "../../utils/date";

interface FicheQSData {
    email: string;
    visiteDate: string;
    logement: string;
    fields: {
        idField: number;
        valeur: boolean | null;
        description: string;
        label: string;
    }[];
}

/**
 * Fonction qui génère un PDF de la ficheqs
 * @param data données de la ficheQS
 * @returns {Blob} Le PDF généré sous forme de Blob
 */
export const generatePDF = (data: FicheQSData): Blob => {
    const doc = new jsPDF({
        orientation: "portrait",
    });

    // Configuration du style
    doc.setFontSize(18);
    doc.text("Fiche Qualité Sécurité", 105, 20, { align: "center" });

    // Info de base
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Informations générales", 20, 40);

    doc.setFont("helvetica", "normal");
    doc.text(`Date de visite: ${formatDate(data.visiteDate)}`, 20, 50);
    doc.text(`Logement: ${data.logement}`, 20, 60);
    doc.text(`Éditeur: ${data.email}`, 20, 70);

    // Position Y actuelle pour ajouter les sections
    let yPos = 90;

    // DAAF - fields 1 - 3
    doc.setFont("helvetica", "bold");
    doc.text("DAAF", 20, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    // Filtrer les champs DAAF
    const daafFields = data.fields.filter((field) => field.idField >= 1 && field.idField <= 3);

    daafFields.forEach((field) => {
        let status = field.valeur === true ? "OK" : field.valeur === false ? "Non OK" : "Non opérationel";
        doc.text(`- ${field.label}: ${status}`, 25, yPos);
        yPos += 7;

        if (field.description && field.valeur === false) {
            doc.setTextColor(255, 0, 0);
            doc.text(`  Note: ${field.description}`, 30, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 7;
        }
    });

    yPos += 5;

    // Installations de gaz - fields 4 - 6
    doc.setFont("helvetica", "bold");
    doc.text("Installations de gaz", 20, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    const gazFields = data.fields.filter((field) => field.idField >= 4 && field.idField <= 6);

    gazFields.forEach((field) => {
        let status = field.valeur === true ? "OK" : field.valeur === false ? "Non OK" : "Non opérationel";
        doc.text(`- ${field.label}: ${status}`, 25, yPos);
        yPos += 7;

        if (field.description && field.valeur === false) {
            doc.setTextColor(255, 0, 0);
            doc.text(`  Note: ${field.description}`, 30, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 7;
        }
    });

    yPos += 5;

    // Installations électriques - fields 7 - 9
    doc.setFont("helvetica", "bold");
    doc.text("Installations électriques", 20, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    const elecFields = data.fields.filter((field) => field.idField >= 7 && field.idField <= 9);

    elecFields.forEach((field) => {
        let status = field.valeur === true ? "OK" : field.valeur === false ? "Non OK" : "Non opérationel";
        doc.text(`- ${field.label}: ${status}`, 25, yPos);
        yPos += 7;

        if (field.description && field.valeur === false) {
            doc.setTextColor(255, 0, 0);
            doc.text(`  Note: ${field.description}`, 30, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 7;
        }
    });

    //

    return doc.output("blob");
};
