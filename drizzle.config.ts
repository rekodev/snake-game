import "@/app/db/envConfig";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/db/schema.ts",
  dialect: "postgresql",
  out: "./app/db/migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
