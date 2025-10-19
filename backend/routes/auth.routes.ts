import express from "express";
import { authenticateUser } from "../services/auth.services";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { userId, token } = await authenticateUser(email, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000, // 2h
        });

        res.cookie("userId", userId, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000,
        });

        res.cookie("email", email, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000,
        });

        res.status(200).json({ email, userId, token });
    } catch (error: any) {
        next(error);
    }
});

export default router;
