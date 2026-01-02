import { sql } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { customTimestamp } from './timestamp';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: customTimestamp('created_at')
    .$defaultFn(() => sql`NOW()`)
    .notNull(),
  updatedAt: customTimestamp('updated_at')
    .$defaultFn(() => sql`NOW()`)
    .notNull()
    .$onUpdateFn(() => sql`NOW()`),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  secretHash: text('secret_hash').notNull(),
  expiresAt: customTimestamp('expires_at').notNull(),
});

export const workspaces = pgTable('workspaces', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: customTimestamp('created_at')
    .$defaultFn(() => sql`NOW()`)
    .notNull(),
  updatedAt: customTimestamp('updated_at')
    .$defaultFn(() => sql`NOW()`)
    .notNull()
    .$onUpdateFn(() => sql`NOW()`),
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Workspace = typeof workspaces.$inferSelect;

export type UserCreateInput = typeof users.$inferInsert;

export type SessionCreateInput = typeof sessions.$inferInsert;

export type WorkspaceCreateInput = typeof workspaces.$inferInsert;
export type WorkspaceUpdateInput = Pick<Workspace, 'name'>;
