import pool from "../config/db.config";

export async function runMigrations(): Promise<void> {
    const client = await pool.connect();

    try {
        // Version cible depuis les variables d'environnement
        const { version: targetVersion } = require("../package.json");
        console.log(`Target application version: ${targetVersion}`);

        if (!targetVersion) {
            throw new Error("VITE_APP_VERSION must be set in environment variables");
        }

        // Liste des migrations à appliquer
        const migrations: { version: string; updateDatabase: () => Promise<void> }[] = [
            // {
            //     version: "1.0.71",
            //     updateDatabase: async () => {
            //         // Insérer les migrations ici
            //     },
            // },
        ];

        // Appliquer les migrations jusqu'à la version cible
        for (const migration of migrations) {
            if (migration.version <= targetVersion) {
                console.log(`Applying migration to ${migration.version}`);
                await migration.updateDatabase();
            }
        }

        console.log(`Migrations completed, database updated to ${targetVersion}`);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    } finally {
        client.release();
    }
}
