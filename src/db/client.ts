import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DrizzleLogger } from './logger';
import * as schema from './schema';

export function createDb(databaseUrl: string) {
  const pool = new Pool({
    connectionString: databaseUrl,
  });

  const logger = new DrizzleLogger();
  const db = drizzle(pool, { schema, logger });

  return { db, pool };
}

export type Db = ReturnType<typeof createDb>['db'];
