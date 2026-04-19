import express from "express";
import PDFDocument from "pdfkit";
import path from "path";
import { Rating } from "../interfaces/interfaces";

const router = express.Router();

interface AuditPDFData {
    idAudit: number;
    auditeur: string;
    natureAudit: string;
    site: string;
    auditDate: string;
    audites: string;
    observationGenerale?: string;
    signature?: string;
    signatureTimestamp?: string | null;
    questions: {
        idQuestion: number;
        valeur: Rating;
        observation: string;
        label: string;
        section: string;
    }[];
    actions: {
        nature: string;
        delai: string;
        responsable: string;
    }[];
}

const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
};

const BLUE = "#2665ae";
const BLUE_LIGHT = "#eaf2f6";
const GREY_LINE = "#d1d5db";
const TEXT_DARK = "#1f2937";
const TEXT_MUTED = "#6b7280";

router.post("/generate", (req: express.Request, res: express.Response) => {
    try {
        const data: AuditPDFData = req.body;

        const doc = new PDFDocument({ size: "A4", margin: 50 });

        const fontsDir = path.join(__dirname, "../fonts");
        doc.registerFont("Inter", path.join(fontsDir, "Inter-Regular.ttf"));
        doc.registerFont("Inter-Bold", path.join(fontsDir, "Inter-Bold.ttf"));
        doc.registerFont("Inter-SemiBold", path.join(fontsDir, "Inter-SemiBold.ttf"));

        const logoPath = path.join(__dirname, "../images/logo-pdf.png");

        // ── En-tête ─────────────────────────────────────────────────────────
        doc.fontSize(15).font("Inter-Bold").fillColor("black").text("Audit sécurité", 50, 52);
        doc.image(logoPath, 455, 30, { width: 95 });
        doc.moveTo(50, 82).lineTo(550, 82).strokeColor(GREY_LINE).lineWidth(0.5).stroke();

        // ── Bloc info audit (2 colonnes) ────────────────────────────────────
        const infoTop = 90;
        const infoH = 90;
        doc.rect(50, infoTop, 500, infoH).fillColor(BLUE_LIGHT).fill();
        doc.rect(50, infoTop, 500, infoH).strokeColor(GREY_LINE).lineWidth(0.5).stroke();

        // Séparateur vertical central
        doc.moveTo(300, infoTop + 8).lineTo(300, infoTop + infoH - 8).strokeColor(GREY_LINE).lineWidth(0.5).stroke();

        const col1x = 60;
        const col2x = 310;
        let infoY = infoTop + 10;
        const lineGap = 22;

        const infoField = (label: string, value: string, x: number, y: number, maxWidth = 230) => {
            doc.fontSize(7.5).font("Inter-Bold").fillColor(TEXT_MUTED).text(label.toUpperCase(), x, y, { width: maxWidth });
            doc.fontSize(9.5).font("Inter-SemiBold").fillColor(TEXT_DARK).text(value || "—", x, y + 9, { width: maxWidth });
        };

        infoField("Auditeur", data.auditeur, col1x, infoY);
        infoField("Date", formatDate(data.auditDate), col2x, infoY);
        infoY += lineGap;
        infoField("Nature de l'audit", data.natureAudit, col1x, infoY);
        infoField("Site", data.site, col2x, infoY);
        infoY += lineGap;
        infoField("Audités", data.audites, col1x, infoY, 230);
        infoField("Réf.", `AUDIT-SECURITE-${data.idAudit}`, col2x, infoY);

        doc.fillColor("black");

        let yPos = infoTop + infoH + 14;

        // ── Sections & questions ────────────────────────────────────────────
        const sectionOrder = ["SSE", "EPI", "SANTE", "CULTURE_SECURITE", "ENVIRONNEMENT"];
        const sectionLabels: Record<string, string> = {
            SSE: "SSE — Sécurité Santé Environnement",
            EPI: "EPI — Équipement de Protection Individuelle",
            SANTE: "Santé",
            CULTURE_SECURITE: "Culture Sécurité",
            ENVIRONNEMENT: "Environnement",
        };

        const questionsBySection = new Map<string, typeof data.questions>();
        for (const q of data.questions) {
            if (!questionsBySection.has(q.section)) questionsBySection.set(q.section, []);
            questionsBySection.get(q.section)!.push(q);
        }

        const orderedSections = [
            ...sectionOrder.filter((s) => questionsBySection.has(s)),
            ...[...questionsBySection.keys()].filter((s) => !sectionOrder.includes(s)),
        ];

        for (const sectionKey of orderedSections) {
            const sectionQuestions = questionsBySection.get(sectionKey) || [];
            if (sectionQuestions.length === 0) continue;

            if (yPos > 700) { doc.addPage(); yPos = 50; }

            // Bannière de section bleue
            doc.rect(50, yPos, 500, 20).fillColor(BLUE).fill();
            doc.fontSize(10).font("Inter-SemiBold").fillColor("white")
                .text(sectionLabels[sectionKey] || sectionKey, 58, yPos + 5, { width: 480 });
            doc.fillColor("black");
            yPos += 24;

            for (let qi = 0; qi < sectionQuestions.length; qi++) {
                const q = sectionQuestions[qi];

                const labelText = q.label;
                const questionWidth = 365;
                const badgeAreaX = 460;

                doc.fontSize(9).font("Inter");
                const labelH = doc.heightOfString(labelText, { width: questionWidth });
                const obsH = q.observation
                    ? doc.fontSize(8.5).font("Inter").heightOfString(q.observation, { width: 360 }) + 12
                    : 0;
                const rowH = Math.max(labelH, 14) + (obsH > 0 ? obsH + 6 : 0) + 10;

                if (yPos + rowH > 770) { doc.addPage(); yPos = 50; }

                // Fond alterné
                const rowBg = qi % 2 === 0 ? "#ffffff" : "#f8fafc";
                doc.rect(50, yPos, 500, rowH).fillColor(rowBg).fill();

                // Numéro de question
                doc.fontSize(7.5).font("Inter-Bold").fillColor(TEXT_MUTED)
                    .text(`Q${q.idQuestion}`, 55, yPos + 4, { width: 20 });

                // Label question
                doc.fontSize(9).font("Inter").fillColor(TEXT_DARK)
                    .text(labelText, 78, yPos + 4, { width: questionWidth });

                // Badge rating
                if (q.valeur !== null) {
                    let badgeLabel = "";
                    let badgeColor = "#9ca3af";
                    let badgeW = 30;
                    if (q.valeur === "J") { badgeLabel = "Bon"; badgeColor = BLUE; badgeW = 32; }
                    else if (q.valeur === "L") { badgeLabel = "Insuffisant"; badgeColor = "#ff955c"; badgeW = 64; }
                    else if (q.valeur === "NC") { badgeLabel = "Non concerné"; badgeColor = "#9ca3af"; badgeW = 80; }

                    const badgeX = 548 - badgeW;
                    const badgeH = 15;
                    doc.roundedRect(badgeX, yPos + 2, badgeW, badgeH, 3).fillColor(badgeColor).fill();
                    doc.fontSize(7.5).font("Inter-Bold").fillColor("white")
                        .text(badgeLabel, badgeX, yPos + 5, { width: badgeW, align: "center" });
                } else {
                    doc.fontSize(9).font("Inter").fillColor(GREY_LINE).text("—", 536, yPos + 4, { width: 14 });
                }

                doc.fillColor("black");
                let rowY = yPos + Math.max(labelH, 14) + 8;

                // Observation
                if (q.observation) {
                    const obsBoxW = 420;
                    const obsBoxX = 78;
                    doc.fontSize(8.5).font("Inter");
                    const obsTextH = doc.heightOfString(q.observation, { width: obsBoxW - 10 });
                    const obsBoxH = obsTextH + 10;
                    doc.roundedRect(obsBoxX, rowY - 2, obsBoxW, obsBoxH, 2)
                        .strokeColor(GREY_LINE).lineWidth(0.5).stroke();
                    doc.fillColor(TEXT_DARK).text(q.observation, obsBoxX + 5, rowY + 3, { width: obsBoxW - 10 });
                    doc.fillColor("black");
                    rowY += obsBoxH + 4;
                }

                // Ligne séparatrice légère
                doc.moveTo(50, yPos + rowH).lineTo(550, yPos + rowH)
                    .strokeColor(GREY_LINE).lineWidth(0.3).stroke();

                yPos += rowH;
            }
            yPos += 8;
        }

        // ── Observation générale ────────────────────────────────────────────
        if (data.observationGenerale) {
            if (yPos > 700) { doc.addPage(); yPos = 50; }

            doc.rect(50, yPos, 500, 20).fillColor(BLUE).fill();
            doc.fontSize(10).font("Inter-SemiBold").fillColor("white")
                .text("Observation générale", 58, yPos + 5);
            doc.fillColor("black");
            yPos += 26;

            doc.fontSize(9.5).font("Inter");
            const obsH = doc.heightOfString(data.observationGenerale, { width: 488 });
            const obsBoxH = Math.max(obsH + 16, 36);
            doc.roundedRect(50, yPos, 500, obsBoxH, 3).strokeColor(GREY_LINE).lineWidth(0.5).stroke();
            doc.fillColor(TEXT_DARK).text(data.observationGenerale, 58, yPos + 8, { width: 488 });
            doc.fillColor("black");
            yPos += obsBoxH + 14;
        }

        // ── Actions correctives ─────────────────────────────────────────────
        if (data.actions && data.actions.length > 0) {
            if (yPos > 680) { doc.addPage(); yPos = 50; }

            doc.rect(50, yPos, 500, 20).fillColor(BLUE).fill();
            doc.fontSize(10).font("Inter-SemiBold").fillColor("white")
                .text("Actions correctives", 58, yPos + 5);
            doc.fillColor("black");
            yPos += 24;

            const colNature = 50;
            const colDelai = 305;
            const colResp = 405;
            const colEnd = 550;
            const headerH = 18;

            // En-tête du tableau
            doc.rect(colNature, yPos, colEnd - colNature, headerH).fillColor("#dbeafe").fill();
            doc.rect(colNature, yPos, colEnd - colNature, headerH).strokeColor(GREY_LINE).lineWidth(0.5).stroke();
            doc.fontSize(8.5).font("Inter-Bold").fillColor(TEXT_DARK);
            doc.text("Nature de l'action", colNature + 5, yPos + 5, { width: colDelai - colNature - 5 });
            doc.text("Délai", colDelai + 5, yPos + 5, { width: colResp - colDelai - 5 });
            doc.text("Responsable", colResp + 5, yPos + 5, { width: colEnd - colResp - 5 });
            yPos += headerH;

            for (let ai = 0; ai < data.actions.length; ai++) {
                const action = data.actions[ai];
                if (yPos > 760) { doc.addPage(); yPos = 50; }

                const rowH = 20;
                const rowBg = ai % 2 === 0 ? "#ffffff" : "#f8fafc";
                doc.rect(colNature, yPos, colEnd - colNature, rowH).fillColor(rowBg).fill();
                doc.rect(colNature, yPos, colEnd - colNature, rowH).strokeColor(GREY_LINE).lineWidth(0.3).stroke();

                doc.fontSize(8.5).font("Inter").fillColor(TEXT_DARK);
                doc.text(action.nature || "", colNature + 5, yPos + 6, { width: colDelai - colNature - 10 });
                doc.text(action.delai ? formatDate(action.delai) : "", colDelai + 5, yPos + 6, { width: colResp - colDelai - 10 });
                doc.text(action.responsable || "", colResp + 5, yPos + 6, { width: colEnd - colResp - 10 });
                yPos += rowH;
            }
            yPos += 10;
        }

        // ── Signature ───────────────────────────────────────────────────────
        if (data.signature) {
            if (yPos > 680) { doc.addPage(); yPos = 50; }
            yPos += 6;

            doc.rect(50, yPos, 500, 20).fillColor(BLUE).fill();
            doc.fontSize(10).font("Inter-SemiBold").fillColor("white")
                .text("Signature de l'audité", 58, yPos + 5);
            doc.fillColor("black");
            yPos += 26;

            doc.roundedRect(50, yPos, 220, 90).strokeColor(GREY_LINE).lineWidth(0.5).stroke();
            try {
                const base64Data = data.signature.replace(/^data:image\/png;base64,/, "");
                const imgBuffer = Buffer.from(base64Data, "base64");
                doc.image(imgBuffer, 55, yPos + 5, { width: 210, height: 80 });
            } catch {
                doc.fontSize(9).font("Inter").fillColor(TEXT_MUTED)
                    .text("(signature non disponible)", 60, yPos + 35);
            }
            yPos += 98;

            if (data.signatureTimestamp) {
                const d = new Date(data.signatureTimestamp);
                const formatted = `Signé le ${d.toLocaleDateString("fr-FR")} à ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
                doc.fontSize(8).font("Inter").fillColor(TEXT_MUTED).text(formatted, 50, yPos);
                yPos += 14;
            }
            doc.fillColor("black");
        }

        doc.end();

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
