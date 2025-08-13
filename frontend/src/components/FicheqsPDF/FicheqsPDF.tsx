import jsPDF from "jspdf";

/**
 * Fonction qui génère un PDF de la ficheqs
 * @returns {Blob} Le PDF généré sous forme de Blob
 */
export const generateSimplePDF = () => {
    const doc = new jsPDF();

    doc.text("Fiche Qualité Sécurité", 10, 10);

    return doc.output("blob");
};
