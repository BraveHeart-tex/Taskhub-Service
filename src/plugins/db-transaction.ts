import fp from 'fastify-plugin';

import { dbContext } from '../db/context';

export default fp(async (app) => {
  app.addHook('onRoute', (route) => {
    const originalHandler = route.handler;
    if (!originalHandler) return;

    route.handler = async function (this, req, reply) {
      const transactional = route.config?.transactional === true;
      if (!transactional) {
        return dbContext.run({ db: app.db, transactional: false }, () =>
          originalHandler.call(this, req, reply)
        );
      }

      return app.db.transaction(async (tx) => {
        return dbContext.run({ db: tx, transactional: true }, () =>
          originalHandler.call(this, req, reply)
        );
      });
    };
  });
});
