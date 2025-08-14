import express from "express";
import { sendPDF } from "../utils/email";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { to, subject, body, attachmentBase64 } = req.body;
        const email = await sendPDF(to, subject, body, attachmentBase64);
        res.status(200).json(email);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
