import { dbContext } from './context';
import type { Tx } from './db-executor';

export async function withTransaction<T>(
  fn: (tx: Tx) => Promise<T>
): Promise<T> {
  const store = dbContext.getStore();
  if (!store) throw new Error('No CLS store');

  if (store.tx) {
    return fn(store.tx);
  }

  return store.db.transaction(async (tx) => {
    return dbContext.run({ ...store, tx, transactional: true }, () => fn(tx));
  });
}
