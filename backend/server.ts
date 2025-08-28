import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { authenticateToken } from "./middleware/auth.middleware";
import authRoutes from "./routes/auth.routes";
import ficheqsRoutes from "./routes/ficheqs.routes";
import emailRoutes from "./routes/email.routes";

dotenv.config();

const PORT_BACKEND = process.env.PORT_BACKEND;
const ORIGIN_URL = process.env.ORIGIN_URL;
const SERVER_URL = process.env.SERVER_URL;

const app = express();

if (!ORIGIN_URL) {
    throw new Error("ORIGIN_URL missing");
}

const allowedOrigins = [ORIGIN_URL, "http://localhost:3000"];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (req, res) => {
    res.send("Test!");
});

// Route d'authentification
app.use("/login", authRoutes);

// Routes ficheqs
app.use("/ficheqs", authenticateToken, ficheqsRoutes);

// Routes email
app.use("/email", authenticateToken, emailRoutes);

app.listen(PORT_BACKEND, () => {
    console.log(`Server is running on ${SERVER_URL}`);
});
