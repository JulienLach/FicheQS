import express from "express";
import { authenticateUser } from "../services/auth.services";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { userId, token } = await authenticateUser(email, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000, // 2h
        });

        res.status(200).json({ userId });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
});

export default router;
