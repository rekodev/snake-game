// books.ts
import { db } from "@/app/db";
import { UsersTable } from "@/app/db/schema";
import { User } from "@/app/types";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  const result = await db.select().from(UsersTable).orderBy(UsersTable.score);

  return c.json(result);
});
app.post("/", async (c) => {
  const user = await c.req.json<User>();

  return c.json({ message: "Score submitted!", user }, 201);
});

export default app;
