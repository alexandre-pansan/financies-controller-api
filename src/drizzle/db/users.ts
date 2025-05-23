
import { pgTable, text, uuid } from "drizzle-orm/pg-core";


export const users = pgTable("users", {

  id: uuid("id").notNull().primaryKey().defaultRandom(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  password: text("password").notNull(),

});