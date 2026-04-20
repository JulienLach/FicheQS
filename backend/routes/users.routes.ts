import express from "express";
import { getAllUsers, createUser } from "../services/users.services";
import { validatePassword } from "../utils/password";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const data = await getAllUsers();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email et mot de passe requis" });
            return;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            res.status(400).json({ message: passwordError });
            return;
        }
        await createUser(email, password, firstname, lastname);
        res.status(201).json({ message: "Utilisateur créé" });
    } catch (error: any) {
        if (error.code === "23505") {
            res.status(409).json({ message: "Email déjà utilisé" });
            return;
        }
        next(error);
    }
});

export default router;
