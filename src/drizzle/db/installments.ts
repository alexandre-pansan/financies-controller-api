import { pgTable, uuid, varchar, integer, decimal, date, timestamp } from 'drizzle-orm/pg-core';

import { transactionCategories } from './transaction_categories';
import { users } from './users';
import { transactions } from './transactions';

export const installments = pgTable('installments', {
    id: uuid('id').defaultRandom().primaryKey(),
    transactionId: uuid('transaction_id').references(() => transactions.id).notNull(),
    number: integer('number').notNull(),

    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
    dueDate: date('due_date').notNull(),
    paidAt: date('paid_at'),
});