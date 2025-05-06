import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userRoles = pgTable('user_role', {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text('name'),
});