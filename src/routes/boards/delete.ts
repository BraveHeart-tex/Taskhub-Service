import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { UnauthenticatedError } from '../../domain/auth/auth.errors';
import { deleteBoardParamsSchema } from './schema';

const route: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/:id',
    {
      schema: {
        params: deleteBoardParamsSchema,
      },
    },
    async (request, reply) => {
      if (!request.user || !request.session?.id) {
        throw new UnauthenticatedError();
      }

      const { id } = request.params;

      await app.boardService.delete(id, request.user.id);

      return reply.status(204).send();
    }
  );
};

export default route;
