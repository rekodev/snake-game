import "@/app/db/envConfig";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "./index";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./app/db/migrations" });
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();
