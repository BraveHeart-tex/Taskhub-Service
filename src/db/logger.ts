import type { Logger } from 'drizzle-orm';
import { logger } from '@/logger';

export class DrizzleLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    if (process.env.NODE_ENV === 'production') {
      logger.debug({ query }, 'db.query');
      return;
    }

    logger.debug(
      {
        query,
        params,
      },
      'db.query'
    );
  }
}
