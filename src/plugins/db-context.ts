// db-context.plugin.ts
import fp from 'fastify-plugin';
import { dbContext } from '../db/context';

export default fp(async (app) => {
  app.addHook('onRequest', (_req, _reply, done) => {
    dbContext.run(
      {
        db: app.db,
        transactional: false,
        tx: null,
      },
      done
    );
  });
});
