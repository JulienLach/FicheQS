import { jsPDF } from "jspdf";
import { formatDate } from "../../utils/date";
import logoBase64 from "../../assets/images/logo-pdf.png";

interface FicheQSData {
    idFiche: number;
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

export const generatePDF = (data: FicheQSData): Blob => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
    });

    // Imports des polices + icones
    doc.addFont("/fonts/fa-solid-900.ttf", "FontAwesomeSolid", "normal");
    doc.addFont("/fonts/fa-regular-400.ttf", "FontAwesomeRegular", "normal");
    doc.addFont("/fonts/Inter-Regular.ttf", "Inter", "normal");
    doc.addFont("/fonts/Inter-SemiBold.ttf", "Inter", "semibold");
    doc.addFont("/fonts/Inter-Bold.ttf", "Inter", "bold");

    // En-tête
    doc.setFontSize(15);
    doc.setFont("Inter", "bold");
    doc.text("Fiche Qualité Sécurité du logement", 15, 15, { align: "left" });
    const titleWidth = doc.getTextWidth("Fiche Qualité Sécurité du logement");
    doc.addImage(logoBase64, "PNG", 15 + titleWidth + 3, 10, 5.2, 6); // x, y, largeur, hauteur

    // Séparateur horizontal sous le titre
    doc.setLineWidth(0.2);
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 20, 195, 20); // ligne horizontale à y=20

    // Bloc d'informations avec cadre
    doc.setDrawColor(0);

    // Informations sur une seule ligne
    doc.setFontSize(9);

    // Logement
    doc.setFont("Inter", "semibold");
    doc.text("Logement :", 15, 27.5);
    doc.setFont("Inter", "normal");
    doc.text(`${data.logement}`, 33, 27.5);
    // Par
    doc.setFont("Inter", "semibold");
    doc.text("Par :", 75, 27.5);
    doc.setFont("Inter", "normal");
    doc.text(`${data.email}`, 83, 27.5);
    // Date
    doc.setFont("Inter", "semibold");
    doc.text("Date :", 135, 27.5);
    doc.setFont("Inter", "normal");
    doc.text(`${formatDate(data.visiteDate)}`, 145, 27.5);
    // N°
    doc.setFont("Inter", "semibold");
    doc.text("N° :", 175, 27.5);
    doc.setFont("Inter", "normal");
    doc.text(`FQS-${data.idFiche}`, 182, 27.5);

    // Séparateur horizontal sous le bloc d'info
    doc.setLineWidth(0.2);
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 33, 195, 33);

    // Fonction pour ajouter une section avec ses champs
    const addSection = (title: string, fields: any[], startY: number): number => {
        let yPos = startY;

        // Titre de la section
        doc.setFont("Inter", "semibold");
        doc.setFontSize(11);
        doc.text(title, 15, yPos + 4);
        yPos += 12;

        // Contenu de la section
        doc.setFont("Inter", "normal");
        doc.setFontSize(10);

        fields.forEach((field) => {
            const status = getStatusText(field.valeur);

            // Calculer si on a besoin d'une nouvelle page
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            // Affichage du champ
            doc.text(`${field.label} :`, 15, yPos);

            // Ajout icône
            if (field.valeur === true) {
                doc.setFont("FontAwesomeSolid");
                doc.setTextColor(0, 196, 114);
                doc.text("\uF058", 145, yPos); // fa-circle-check
                doc.setFont("Inter", "normal");
                doc.setTextColor(0, 0, 0);
                doc.text(status, 150, yPos);
            } else if (field.valeur === false) {
                doc.setTextColor(255, 140, 0);
                doc.setFont("FontAwesomeRegular");
                doc.text("\uF133", 145, yPos); // fa-calendar
                doc.setFont("Inter", "normal");
                doc.setTextColor(0, 0, 0);
                doc.text(status, 150, yPos);
            } else {
                doc.setTextColor(128, 128, 128);
                doc.setFont("FontAwesomeSolid");
                doc.text("\uF057", 145, yPos); // fa-circle-xmark
                doc.setFont("Inter", "normal");
                doc.setTextColor(0, 0, 0);
                doc.text(status, 150, yPos);
            }

            doc.setTextColor(0, 0, 0); // Réinitialiser la couleur
            yPos += 6;

            // Affichage de la description si présente et Non OK
            if (field.description && field.valeur === false) {
                yPos += 3; // marge top
                doc.setDrawColor(220, 220, 220); // Gris clair
                doc.setLineWidth(0.2);
                doc.roundedRect(15, yPos - 4, 85, 7, 0.8, 0.8);
                doc.setTextColor(0, 0, 0);
                doc.text(`${field.description}`, 17, yPos + 0.7);
                yPos += 7 + 3;
            }
        });

        return yPos + 5; // Retourner la position Y finale + marge
    };

    // Fonction pour obtenir le texte du statut
    const getStatusText = (value: boolean | null): string => {
        if (value === true) return "Ok";
        if (value === false) return "Pas opérationnel";
        return "Non concerné";
    };

    // Position de départ pour les sections
    let currentY = 38;

    // Organiser les fields par catégories
    const fieldsByCategory = {
        DAAF: data.fields.filter((f) => f.idField >= 1 && f.idField <= 3),
        "Installations de gaz": data.fields.filter((f) => f.idField >= 4 && f.idField <= 6),
        "Installations électriques": data.fields.filter((f) => f.idField >= 7 && f.idField <= 10),
        "Risques de chute": data.fields.filter((f) => f.idField >= 11 && f.idField <= 13),
        Balcon: data.fields.filter((f) => f.idField >= 14 && f.idField <= 15),
        "Éviers, lavabos, baignoires, bacs à douche": data.fields.filter((f) => f.idField >= 16 && f.idField <= 17),
        "Faiences murales": data.fields.filter((f) => f.idField >= 18 && f.idField <= 20),
        "Meubles et placards": data.fields.filter((f) => f.idField >= 21 && f.idField <= 24),
        "Canalisations d'eau": data.fields.filter((f) => f.idField >= 25 && f.idField <= 26),
        Menuiseries: data.fields.filter((f) => f.idField >= 27 && f.idField <= 30),
        "Ventilation sanitaire": data.fields.filter((f) => f.idField >= 31 && f.idField <= 31),
        Embelissements: data.fields.filter((f) => f.idField >= 32 && f.idField <= 34),
        "Espaces extérieurs": data.fields.filter((f) => f.idField >= 35 && f.idField <= 35),
        "Équipements extérieurs": data.fields.filter((f) => f.idField >= 36 && f.idField <= 41),
        "Équipements divers": data.fields.filter((f) => f.idField >= 42 && f.idField <= 43),
        Propreté: data.fields.filter((f) => f.idField >= 44 && f.idField <= 54),
    };

    // Ajouter chaque section
    for (const [title, fields] of Object.entries(fieldsByCategory)) {
        if (fields.length > 0) {
            currentY = addSection(title, fields, currentY);
        }
    }

    return doc.output("blob");
};
