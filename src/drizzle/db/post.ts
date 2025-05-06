import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user";

export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),

    authorId: uuid("author_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});