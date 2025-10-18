import express from "express";
import { updateAccount } from "../services/account.services";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { userId, email, password } = req.body;
        const credentials = await updateAccount(userId, email, password);
        res.status(201).json(credentials);
    } catch (error: any) {
        next(error);
    }
});

export default router;
