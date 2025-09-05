import express from "express";
import { updateAccount } from "../services/account.services";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, email, password } = req.body;
        const credentials = await updateAccount(userId, email, password);
        res.status(201).json(credentials);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
