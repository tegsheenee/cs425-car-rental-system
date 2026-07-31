import app from "./app";
import { pool } from "./db/database";

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
const port = process.env.PORT || 3000;

async function startServer(): Promise<void> {
    try {
        await pool.query("SELECT NOW()");

        console.log("Connected to PostgreSQL");

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to PostgreSQL:", error);
        process.exit(1);
    }
}

startServer();