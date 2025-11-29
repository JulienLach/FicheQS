import express from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const router = express.Router();

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

const getStatusText = (valeur: boolean | null): string => {
    if (valeur === true) return "✓";
    if (valeur === false) return "✗";
    return "non concerné";
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
};

router.post("/generate", (req: express.Request, res: express.Response) => {
    try {
        console.log("PDF generate called with data:", req.body);
        const data: FicheQSData = req.body;

        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
        });

        // Enregistrer les polices
        const fontsDir = path.join(__dirname, "../fonts");
        doc.registerFont("Inter", path.join(fontsDir, "Inter-Regular.ttf"));
        doc.registerFont("Inter-Bold", path.join(fontsDir, "Inter-Bold.ttf"));
        doc.registerFont("Inter-SemiBold", path.join(fontsDir, "Inter-SemiBold.ttf"));

        // Ajouter le logo
        const logoPath = path.join(__dirname, "../images/logo-pdf.png");
        doc.image(logoPath, 50, 45, { width: 18 });

        // En-tête
        doc.fontSize(15).font("Inter-Bold").text("Fiche Qualité Sécurité du logement", 80, 50);

        // Ligne séparatrice
        doc.moveTo(50, 85).lineTo(550, 85).stroke();

        // Informations
        doc.fontSize(10).font("Inter-Bold").text("Logement :", 50, 95);
        doc.font("Inter").text(data.logement, 115, 95);

        doc.font("Inter-Bold").text("Par :", 50, 110);
        doc.font("Inter").text(data.email, 75, 110);

        doc.font("Inter-Bold").text("Date :", 50, 125);
        doc.font("Inter").text(formatDate(data.visiteDate), 80, 125);

        doc.font("Inter-Bold").text("N° :", 50, 140);
        doc.font("Inter").text(`FQS-${data.idFiche}`, 70, 140);

        // Ligne séparatrice
        doc.moveTo(50, 160).lineTo(550, 160).stroke();

        let yPos = 175;

        // Grouper les fields par sections (simplifié, basé sur idField)
        const sections = [
            { title: "DAAF", start: 1, end: 3 },
            { title: "Installations de gaz", start: 4, end: 6 },
            { title: "Installations électriques", start: 7, end: 10 },
            { title: "Risque de chute", start: 11, end: 13 },
            { title: "Balcon", start: 14, end: 15 },
            { title: "Éviers, lavabos, baignoires, bacs à douche", start: 16, end: 17 },
            { title: "Faiences murales", start: 18, end: 19 },
            { title: "Meubles et placards", start: 20, end: 23 },
            { title: "Canalisations d'eau", start: 24, end: 25 },
            { title: "Menuiseries", start: 26, end: 29 },
            { title: "Ventilation sanitaire", start: 30, end: 30 },
            { title: "Embellissements", start: 31, end: 33 },
            { title: "Espaces extérieurs", start: 34, end: 34 },
            { title: "Équipements extérieurs", start: 35, end: 37 },
            { title: "Équipements divers", start: 38, end: 43 },
            { title: "Propreté", start: 44, end: 55 },
        ];

        sections.forEach((section) => {
            const sectionFields = data.fields.filter((f) => f.idField >= section.start && f.idField <= section.end);
            if (sectionFields.length > 0) {
                if (yPos > 700) {
                    doc.addPage();
                    yPos = 50;
                }

                doc.fontSize(11).font("Inter-SemiBold").text(section.title, 50, yPos);
                yPos += 20;

                sectionFields.forEach((field) => {
                    if (yPos > 750) {
                        doc.addPage();
                        yPos = 50;
                    }

                    const status = getStatusText(field.valeur);
                    doc.fontSize(10).font("Inter").text(`- ${field.label} : ${status}`, 70, yPos);
                    if (field.description) {
                        // Dessiner un rectangle arrondi autour de la description
                        const descX = 65;
                        const descY = yPos + 18;
                        const descWidth = 400; // Largeur approximative
                        const descHeight = 24; // Hauteur approximative
                        doc.strokeColor("lightgray")
                            .lineWidth(1)
                            .roundedRect(descX, descY, descWidth, descHeight, 2)
                            .stroke();
                        doc.fontSize(10).text(`${field.description}`, 80, yPos + 22);
                        yPos += 45;
                    } else {
                        yPos += 15;
                    }
                });
                yPos += 10;
            }
        });

        doc.end();

        // Collecter le PDF en buffer
        const chunks: Buffer[] = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => {
            const pdfBuffer = Buffer.concat(chunks);
            const pdfBase64 = pdfBuffer.toString("base64");
            res.json({ pdfBase64 });
        });
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Erreur lors de la génération du PDF" });
    }
});

export default router;
