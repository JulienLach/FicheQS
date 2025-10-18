import express from "express";
import { getAllFichesQS, getFicheQSById, createFicheQS, deleteFicheqs } from "../services/ficheqs.services";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const fiches = await getAllFichesQS();
        res.status(200).json(fiches);
    } catch (error: any) {
        next(error);
    }
});

router.get("/:idFiche", async (req, res, next) => {
    try {
        const idFiche = Number(req.params.idFiche);
        const ficheqs = await getFicheQSById(idFiche);
        res.status(200).json(ficheqs);
    } catch (error: any) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { status, visiteDate, logement, idUser, fields } = req.body;
        const ficheqs = await createFicheQS(status, visiteDate, logement, idUser, fields);
        res.status(201).json(ficheqs);
    } catch (error: any) {
        next(error);
    }
});

router.delete("/:idFiche", async (req, res, next) => {
    try {
        const idFiche = Number(req.params.idFiche);
        await deleteFicheqs(idFiche);
        res.status(200).json({ message: "Fiche supprimée avec succès" });
    } catch (error: any) {
        next(error);
    }
});

export default router;
