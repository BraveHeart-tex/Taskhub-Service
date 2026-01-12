import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { SESSION_COOKIE_NAME } from '@/domain/auth/auth.constants';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';

const logoutRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete('/logout', {
    handler: async (request, reply) => {
      const { user, session } = requireAuth(request);

      await app.authService.logout(session.id, user.id);

      reply.clearCookie(SESSION_COOKIE_NAME);

      return reply.status(HttpStatus.NO_CONTENT).send();
    },
  });
};

export default logoutRoute;
