import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            react(),
        ],
        define: {
            "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
        },
        server: {
            port: 3000,
            host: "0.0.0.0",
            proxy: {
                "/api": "http://localhost:3001",
                // A utiliser pour tester sur un ip local
                // "/api": {
                //     target: "http://localhost:3001",
                //     rewrite: (path) => path.replace(/^\/api/, ""),
                // },
            },
        },
    };
});
