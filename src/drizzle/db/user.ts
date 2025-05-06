import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { userRoles } from "./user_role";

export const users = pgTable("users", {

  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),

  firstName: text("first_name").notNull(),

  lastName: text("last_name").notNull(),

  phoneNumber: text("phone_number").notNull(),

  zipCode: text("zip_code").notNull(),

  govID: text("gov_id").notNull(),
  userRoleId: uuid("user_role_id")
    .notNull()
    .references(() => userRoles.id, { onDelete: "restrict", onUpdate: "cascade" })
    .default(sql`(SELECT id FROM user_roles WHERE name = 'guest' LIMIT 1)`),
});