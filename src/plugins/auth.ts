import fp from 'fastify-plugin';
import { createSessionRepo } from '../auth/session.repo';

export default fp(async (app) => {
  const sessionRepo = createSessionRepo(app.db);

  app.decorateRequest('user', null);

  app.addHook('preHandler', async (request) => {
    const sessionId = request.cookies.session ?? null;
    if (!sessionId) return;

    const session = await sessionRepo.findValid(sessionId);
    if (!session) return;

    request.user = { id: session.userId };
  });
});
