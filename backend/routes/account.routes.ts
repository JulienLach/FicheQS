import express from "express";
import { updateAccount } from "../services/account.services";
import { validatePassword } from "../utils/password";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { userId, email, password } = req.body;
        if (password) {
            const passwordError = validatePassword(password);
            if (passwordError) {
                res.status(400).json({ message: passwordError });
                return;
            }
        }
        const credentials = await updateAccount(userId, email, password);
        res.status(201).json(credentials);
    } catch (error: any) {
        next(error);
    }
});

export default router;
