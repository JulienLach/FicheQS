import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        coverage: {
            provider: "v8",
            reporter: ["text", "html", "json", "lcov"],
            exclude: ["node_modules/**", "dist/**", "**/*.d.ts", "test/**", "**/*.test.ts"],
        },
    },
});
