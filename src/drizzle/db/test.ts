import { sql } from "drizzle-orm";
import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";

export const tests = pgTable("tests", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  
    observations: text("observations"),
  
    isActive: boolean("is_active").default(true).notNull(),
  });