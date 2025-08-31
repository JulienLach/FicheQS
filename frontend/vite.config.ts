import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, "../", "VITE_");

    return {
        plugins: [
            react(),
            VitePWA({
                registerType: "autoUpdate",
                includeAssets: ["favicon.ico", "icon-192x192.png", "icon-512x512.png"],
                manifest: {
                    name: "FicheQS",
                    short_name: "FicheQS",
                    start_url: "/",
                    display: "standalone",
                    background_color: "#ffffff",
                    theme_color: "#00DD80",
                    icons: [
                        {
                            src: "icon-192x192.png",
                            sizes: "192x192",
                            type: "image/png",
                            purpose: "any maskable",
                        },
                        {
                            src: "icon-512x512.png",
                            sizes: "512x512",
                            type: "image/png",
                            purpose: "any maskable",
                        },
                    ],
                },
                // Version simplifiée de Workbox
                workbox: {
                    globPatterns: ["**/*.{js,css,html,ico,png,jpg,svg}"],
                },
                devOptions: {
                    enabled: true,
                },
            }),
        ],
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
