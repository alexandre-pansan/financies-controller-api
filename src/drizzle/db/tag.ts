import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const tags = pgTable("tags", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
});