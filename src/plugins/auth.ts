import fp from 'fastify-plugin';
import { createAuthService } from '../auth/auth.service';
import { createSessionRepo } from '../auth/session.repo';
import { createUserRepo } from '../auth/user.repo';

export default fp(async (app) => {
  const authService = createAuthService(
    createUserRepo(app.db),
    createSessionRepo(app.db)
  );

  app.decorate('auth', authService);

  app.addHook('preHandler', async (request) => {
    const token = request.cookies.session_token;
    const result = await authService.validateSession(token);

    if (result) {
      request.user = result.user;
      request.session = result.session;
    }
  });
});
