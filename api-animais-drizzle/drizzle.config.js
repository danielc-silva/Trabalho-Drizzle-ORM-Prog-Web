import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.js",      // Caminho para o arquivo onde está o pgTable
  dialect: "postgresql",     // Tipo do banco
  dbCredentials: {
    url: "postgres://postgres:postgres@localhost:5432/banco-animais",
  },
});