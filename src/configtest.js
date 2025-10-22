import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom", // ⚡ activa window y document
        setupFiles: "./src/setupTests.ts",
    },
});
