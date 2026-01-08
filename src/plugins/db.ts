import fp from 'fastify-plugin';
import { createDb } from '@/db/client';

export default fp(async (app) => {
  const { db, pool } = createDb(app.config.DATABASE_URL);

  app.decorate('db', db);

  app.addHook('onClose', async () => {
    await pool.end();
  });
});
