import path from "path";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const dbHost = process.env.NODE_ENV === "production" ? "db" : process.env.DB_HOST;

const pool = new Pool({
    user: process.env.DB_USER,
    host: dbHost,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
    console.log("Connected to the PostgreSQL database.");
});

pool.on("error", (err: any) => {
    console.error("Error connecting to the PostgreSQL database:", err);
});

export default pool;
