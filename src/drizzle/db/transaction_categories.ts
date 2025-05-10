import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { transactionGroups } from './transaction_groups';

export const transactionCategories = pgTable('transaction_categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    groupId: uuid('group_id').references(() => transactionGroups.id).notNull(),
    name: varchar('name', { length: 100 }).notNull(), // Ex: 'Gympass', 'Spotify'
});