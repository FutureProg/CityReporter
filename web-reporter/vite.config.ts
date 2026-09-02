import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [fresh(), basicSsl()],
});
