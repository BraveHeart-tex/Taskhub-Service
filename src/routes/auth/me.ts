import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';
import { authenticatedUserSchema } from './schema';

const meRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/me',
    {
      schema: {
        response: {
          [HttpStatus.OK]: authenticatedUserSchema,
        },
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      return reply.status(HttpStatus.OK).send(user);
    }
  );
};

export default meRoute;
