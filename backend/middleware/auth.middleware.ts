import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const cookieHeader = req.headers.cookie;
    let token: string = "";

    if (cookieHeader) {
        const cookies = cookieHeader.split(";");
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split("=");
            if (name === "token") {
                token = value;
                break;
            }
        }
    }

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
