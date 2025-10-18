import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { runMigrations } from "./updates/migration";
import { authenticateToken } from "./middleware/auth.middleware";
import { sanitizeInputs } from "./middleware/sanitize.middleware";
import authRoutes from "./routes/auth.routes";
import ficheqsRoutes from "./routes/ficheqs.routes";
import accountRoutes from "./routes/account.routes";
import emailRoutes from "./routes/email.routes";

dotenv.config();

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
app.use("/ficheqs", authenticateToken, sanitizeInputs, ficheqsRoutes);
app.use("/account", authenticateToken, sanitizeInputs, accountRoutes);
app.use("/email", authenticateToken, emailRoutes);

async function startServer() {
    await runMigrations();
    app.listen(PORT_BACKEND, () => {
        console.log(`Server is running on ${SERVER_URL}`);
    });
}

startServer();
