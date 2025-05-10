import { pgTable, uuid, varchar, integer, decimal, date, timestamp } from 'drizzle-orm/pg-core';

import { transactionCategories } from './transaction_categories';
import { users } from './users';

export const installments = pgTable('installments', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    categoryId: uuid('category_id').references(() => transactionCategories.id).notNull(),

    title: varchar('title', { length: 100 }).notNull(), // Ex: "Financiamento do carro"
    totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
    numberOfInstallments: integer('installments').notNull(),
    startDate: date('start_date').notNull(),

    createdAt: timestamp('created_at').defaultNow(),
});