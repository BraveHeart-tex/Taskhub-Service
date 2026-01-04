import { AsyncLocalStorage } from 'node:async_hooks';
import type { DbExecutor, Tx } from './db-executor';

export const dbContext = new AsyncLocalStorage<{
  db: DbExecutor;
  transactional: boolean;
  tx: Tx | null;
}>();

export function useDb() {
  const store = dbContext.getStore();
  if (!store) {
    throw new Error('DB context not initialized');
  }

  return store.tx ?? store.db;
}
