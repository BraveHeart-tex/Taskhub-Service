import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';

const logoutRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete('/logout', {
    handler: async (req, reply) => {
      const { user, session } = requireAuth(req);

      await app.authService.logout(session.id, user.id);

      reply.clearCookie('session_token');

      return reply.status(HttpStatus.NO_CONTENT).send();
    },
  });
};

export default logoutRoute;
