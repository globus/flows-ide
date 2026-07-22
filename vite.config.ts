import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  /**
   * The public base path the app is served from. On GitHub Pages this is
   * `/flows-ide/` (see `.env`); deployments that serve from the root (e.g. the
   * SST/CloudFront `sandbox` stage) override it to `/` via `VITE_BASE_PATH`.
   *
   * `process.env` takes precedence so deploy tooling can override the committed
   * `.env` value; `loadEnv` only reads `.env*` files.
   */
  const base = process.env.VITE_BASE_PATH ?? env.VITE_BASE_PATH ?? "/";

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist",
      rolldownOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          // Dedicated entry for the OAuth2 redirect route. GitHub Pages serves
          // `authenticate.html` at `/authenticate`, matching the redirect URI.
          authenticate: resolve(__dirname, "authenticate.html"),
        },
      },
    },
  };
});
