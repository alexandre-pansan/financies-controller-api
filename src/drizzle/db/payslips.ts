import { date, decimal, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { transactions } from "./transactions";

export const payslips = pgTable('payslips', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    fileUrl: text('file_url').notNull(),
    relatedMonth: date('related_month').notNull(), // Usa apenas ano-mês no frontend
    transactionId: uuid('transaction_id').references(() => transactions.id),
});