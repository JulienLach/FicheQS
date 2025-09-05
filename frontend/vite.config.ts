import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
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
        define: {
            "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
        },
        server: {
            port: 3000,
            host: "0.0.0.0",
            proxy: {
                "/api": "http://localhost:3001",
            },
        },
    };
});
