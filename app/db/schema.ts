import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  score: text("score").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
