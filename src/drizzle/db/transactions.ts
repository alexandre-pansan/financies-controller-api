import { date, decimal, integer, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { installments } from "./installments";
import { transactionCategories } from "./transaction_categories";


export const transactionType = pgEnum('transaction_type', ['income', 'expense']);

export const transactions = pgTable('transactions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    title: varchar('title', { length: 100 }).notNull(),
    type: transactionType('type').notNull(),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    description: text('description'),
    date: date('date').notNull(),
    categoryId: uuid('catecory_id').references(() => transactionCategories.id).notNull(),
});