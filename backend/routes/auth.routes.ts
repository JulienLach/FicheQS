import express from "express";
import { authenticateUser } from "../services/auth.services";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { userId, token, firstname, lastname, role } = await authenticateUser(email, password);

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

        res.cookie("firstname", firstname || "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000,
        });

        res.cookie("lastname", lastname || "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000,
        });

        res.cookie("role", role, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000,
        });

        res.status(200).json({ email, userId, token, firstname, lastname, role });
    } catch (error: any) {
        next(error);
    }
});

export default router;
