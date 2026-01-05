import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { requireAuth } from '@/http/guards/require-auth';
import { deleteListParamsSchema } from './schema';

const route: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/',
    {
      schema: {
        params: deleteListParamsSchema,
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      await app.listService.deleteList({
        currentUserId: user.id,
        listId: request.params.listId,
        boardId: request.params.boardId,
      });

      return reply.status(204).send();
    }
  );
};

export default route;
