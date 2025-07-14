import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Token manquant" });
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).json({ message: "JWT_SECRET non défini" });
        return;
    }

    try {
        const payload = jwt.verify(token, secret);
        (req as any).user = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide" });
    }
}
