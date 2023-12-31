import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "@stylexjs/babel-plugin",
            {
              classNamePrefix: "Stg-CMS-",
              runtimeInjection: true
            },
          ],
        ],
      },
    }),
  ],
});
