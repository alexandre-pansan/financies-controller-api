import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const transactionGroups = pgTable('transaction_groups', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull().unique(), // Ex: 'Cartão de Crédito', 'Pix'
});