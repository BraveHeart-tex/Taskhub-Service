import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { SESSION_COOKIE_NAME } from '@/domain/auth/auth.constants';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';

const logoutRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/logout',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Log out',
        description:
          'Terminates the current authenticated session and clears the session cookie. ' +
          'The operation is idempotent and succeeds even if the session has already been invalidated.',
      },
    },
    async (request, reply) => {
      const { user, session } = requireAuth(request);

      await app.authService.logout(session.id, user.id);

      reply.clearCookie(SESSION_COOKIE_NAME);

      return reply.status(HttpStatus.NO_CONTENT).send();
    }
  );
};

export default logoutRoute;
