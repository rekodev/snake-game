CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"score" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
