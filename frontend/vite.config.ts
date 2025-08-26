import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, "../", "VITE_");

    return {
        plugins: [react()],
        server: {
            port: 3000,
            proxy: {
                "/api": "http://localhost:3001",
            },
        },
        define: {
            "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
            "import.meta.env.VITE_APP_VERSION": JSON.stringify(env.VITE_APP_VERSION),
        },
    };
});
