import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import type * as schema from './schema';

export type DbExecutor =
  | NodePgDatabase<typeof schema>
  // biome-ignore lint/suspicious/noExplicitAny: any is fine here
  | PgTransaction<any, typeof schema, any>;
