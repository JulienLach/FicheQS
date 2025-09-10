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

pool.query("SELECT NOW()", (err, res) => {
    if (err) console.error("DB Connection Error:", err);
    else console.log("DB Connected successfully at startup");
});

export default pool;
