import { AsyncLocalStorage } from 'node:async_hooks';
import type { DbExecutor } from './db-executor';

export const dbContext = new AsyncLocalStorage<{
  db: DbExecutor;
  transactional: boolean;
}>();

export function useDb(): DbExecutor {
  const store = dbContext.getStore();
  if (!store) {
    throw new Error('DB context not initialized');
  }
  return store.db;
}
