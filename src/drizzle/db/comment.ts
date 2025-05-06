import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { posts } from "./post";
import { users } from "./user";

export const comments = pgTable("comments", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),

    postId: uuid("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),

    authorId: uuid("author_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});