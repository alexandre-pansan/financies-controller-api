import { pgTable, uuid } from "drizzle-orm/pg-core";
import { posts } from "./post";
import { tags } from "./tag";

export const postTags = pgTable("post_tags", {
    postId: uuid("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),

    tagId: uuid("tag_id")
        .notNull()
        .references(() => tags.id, { onDelete: "cascade" }),
});