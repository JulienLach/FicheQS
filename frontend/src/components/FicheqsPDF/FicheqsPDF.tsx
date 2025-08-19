import { jsPDF } from "jspdf";
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

export const generatePDF = (data: FicheQSData): Blob => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
    });

    // Ajouter la police Font Awesome
    doc.addFont("/src/assets/fonts/fa-solid-900.ttf", "FontAwesomeSolid", "normal");
    doc.addFont("/src/assets/fonts/fa-regular-400.ttf", "FontAwesomeRegular", "normal");

    // Ajout de l'en-tête
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Fiche Qualité Sécurité du logement", 105, 15, { align: "center" });

    // Bloc d'informations avec cadre
    doc.setDrawColor(0);
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(10, 20, 190, 15, 2, 2, "F");

    // Informations sur une seule ligne
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`Logement : ${data.logement}`, 15, 28);
    doc.text(`Par : ${data.email}`, 70, 28);
    doc.text(`Date : ${formatDate(data.visiteDate)}`, 125, 28);
    doc.text(`N° : FQS-001`, 175, 28);

    // Fonction pour ajouter une section avec ses champs
    const addSection = (title: string, fields: any[], startY: number): number => {
        let yPos = startY;

        // Titre de la section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setFillColor(200, 200, 200);
        doc.rect(10, yPos, 190, 8, "F");
        doc.text(title, 15, yPos + 5.5);
        yPos += 12;

        // Contenu de la section
        doc.setFont("helvetica", "normal");
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

            // Ajouter l'icône uniquement si valeur est true
            if (field.valeur === true) {
                doc.setFont("FontAwesomeSolid");
                doc.setTextColor(0, 128, 0);
                doc.text("\uF058", 145, yPos); // Unicode pour fa-circle-check
                doc.setFont("helvetica", "normal"); // Revenir à Helvetica pour le texte
                doc.setTextColor(0, 128, 0); // Vert pour OK
                doc.text(status, 150, yPos); // Texte après l'icône
            } else {
                // Couleur du statut selon la valeur
                if (field.valeur === false) {
                    doc.setTextColor(255, 140, 0); // Orange pour Pas opérationnel
                    doc.setFont("FontAwesomeRegular");
                    doc.text("\uF133", 145, yPos); // Unicode pour fa-calendar
                    doc.setFont("helvetica", "normal");
                } else {
                    doc.setTextColor(128, 128, 128); // Gris pour Non concerné
                }
                doc.text(status, 150, yPos); // Texte sans icône
            }

            doc.setTextColor(0, 0, 0); // Réinitialiser la couleur
            yPos += 6;

            // Affichage de la description si présente et Non OK
            if (field.description && field.valeur === false) {
                doc.setTextColor(255, 0, 0);
                doc.text(` ${field.description}`, 20, yPos);
                doc.setTextColor(0, 0, 0);
                yPos += 6;
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
    let currentY = 50;

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
