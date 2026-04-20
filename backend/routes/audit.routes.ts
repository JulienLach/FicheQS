import express from "express";
import { getAllAudits, getAuditById, createAudit, deleteAudit } from "../services/audit.services";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const audits = await getAllAudits();
        res.status(200).json(audits);
    } catch (error: any) {
        next(error);
    }
});

router.get("/:idAudit", async (req, res, next) => {
    try {
        const idAudit = Number(req.params.idAudit);
        const audit = await getAuditById(idAudit);
        res.status(200).json(audit);
    } catch (error: any) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { status, auditDate, site, auditeur, natureAudit, audites, observationGenerale, signature, signatureTimestamp, idUser, questions, actions } = req.body;
        const audit = await createAudit(status, auditDate, site, auditeur, natureAudit, audites, observationGenerale ?? null, signature ?? null, signatureTimestamp ?? null, idUser, questions, actions ?? []);
        res.status(201).json(audit);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/:idAudit", async (req, res, next) => {
    try {
        const idAudit = Number(req.params.idAudit);
        await deleteAudit(idAudit);
        res.status(200).json({ message: "Audit supprimé avec succès" });
    } catch (error: any) {
        next(error);
    }
});

export default router;
