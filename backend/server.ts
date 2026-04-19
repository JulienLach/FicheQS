import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { runMigrations } from "./updates/migration";
import { authenticateToken, requireAdmin } from "./middleware/auth.middleware";
import { sanitizeInputs } from "./middleware/sanitize.middleware";
import { rateLimit } from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import auditRoutes from "./routes/audit.routes";
import accountRoutes from "./routes/account.routes";
import emailRoutes from "./routes/email.routes";
import pdfRoutes from "./routes/pdf.routes";
import usersAdminRoutes from "./routes/users.routes";
import { updateUser } from "./services/users.services";
import { validatePassword } from "./utils/password";

dotenv.config();

// Gestion des exceptions non gérées
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

const PORT_BACKEND = process.env.PORT_BACKEND;
const ORIGIN_URL = process.env.ORIGIN_URL;
const SERVER_URL = process.env.SERVER_URL;

const app = express();

if (!ORIGIN_URL) {
    throw new Error("ORIGIN_URL missing");
}

const allowedOrigins = [ORIGIN_URL];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
    rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }),
    (req, res, next) => {
        // Cache-Control
        res.setHeader("Cache-Control", "private, no-cache");
        // Content Security Policy
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'"
        );
        // HSTS
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        // X-Content-Type-Options
        res.setHeader("X-Content-Type-Options", "nosniff");
        // X-Frame-Options
        res.setHeader("X-Frame-Options", "DENY");
        // X-XSS-Protection
        res.setHeader("X-XSS-Protection", "1; mode=block");
        next();
    },
    express.json({ limit: "20mb" }),
    express.urlencoded({ limit: "20mb", extended: true })
);

// Route publique
app.use("/login", authRoutes);
// Routes avec auth
app.use("/audits", authenticateToken, sanitizeInputs, auditRoutes);
app.use("/account", authenticateToken, sanitizeInputs, accountRoutes);
app.use("/email", authenticateToken, emailRoutes);
app.use("/pdf", authenticateToken, pdfRoutes);
app.use("/admin/users", authenticateToken, requireAdmin, sanitizeInputs, usersAdminRoutes);
app.put("/admin/users/:id", authenticateToken, requireAdmin, sanitizeInputs, async (req, res, next) => {
    try {
        const idUser = parseInt(req.params.id);
        const { email, password, firstname, lastname } = req.body;
        if (!email && !password && firstname === undefined && lastname === undefined) {
            res.status(400).json({ message: "Au moins un champ requis" });
            return;
        }
        if (password) {
            const passwordError = validatePassword(password);
            if (passwordError) {
                res.status(400).json({ message: passwordError });
                return;
            }
        }
        await updateUser(idUser, email || undefined, password || undefined, firstname, lastname);
        res.status(200).json({ message: "Utilisateur mis à jour" });
    } catch (error: any) {
        if (error.code === "23505") {
            res.status(409).json({ message: "Email déjà utilisé" });
            return;
        }
        next(error);
    }
});

// Middleware global de gestion centralisée des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global Error:", err.message || err);
    res.status(err.status || 500).json({ message: "Une erreur interne est survenue." });
});

async function startServer() {
    await runMigrations();
    app.listen(PORT_BACKEND, () => {
        console.log(`Server is running on ${SERVER_URL}`);
    });
}

startServer();
