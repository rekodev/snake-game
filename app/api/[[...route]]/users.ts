import { MAX_SCORE } from "@/app/constants";
import { db } from "@/app/db";
import { UsersTable } from "@/app/db/schema";
import { User } from "@/app/types";
import { desc } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono()
  .get("/", async (c) => {
    const result = await db
      .select()
      .from(UsersTable)
      .orderBy(desc(UsersTable.createdAt))
      .limit(100);

    return c.json(result);
  })
  .get("/high-scores", async (c) => {
    const result = await db
      .select()
      .from(UsersTable)
      .orderBy(desc(UsersTable.score))
      .limit(10);

    return c.json(result);
  })
  .post("/", async (c) => {
    const { name, score } = await c.req.json<Pick<User, "name" | "score">>();

    if (score < 0 || score > MAX_SCORE) {
      return c.json({ error: "Your score is invalid!" }, 400);
    }

    if (name.length < 3 || name.length > 20) {
      return c.json({ error: "Your name is invalid!" }, 400);
    }

    try {
      const result = await db
        .insert(UsersTable)
        .values({ name, score })
        .returning({ insertedId: UsersTable.id });

      return c.json({ message: "Score submitted!", result }, 201);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to submit score!" });
    }
  });

export default app;
