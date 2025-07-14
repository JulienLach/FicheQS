import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authenticateToken } from "./middleware/auth.middleware";
import ficheqsRoutes from "./routes/ficheqs.routes";

dotenv.config();

const PORT = process.env.PORT || 3001;
const ORIGIN_URL = process.env.ORIGIN_URL;
const SERVER_URL = process.env.SERVER_URL;

const app = express();

const allowedOrigins = [
    ORIGIN_URL, // http://localhost:3000
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Test!");
});

// Route d'authentification
app.use("/login", authRoutes);

// Routes ficheqs
app.use("/ficheqs", authenticateToken, ficheqsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${SERVER_URL}`);
});
