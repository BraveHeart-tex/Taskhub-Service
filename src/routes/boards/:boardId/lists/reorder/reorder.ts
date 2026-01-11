import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';
import { boardRouteParamsSchema } from '../../schema';
import { reOrderListsBodySchema } from './schema';

const route: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {
      schema: {
        params: boardRouteParamsSchema,
        body: reOrderListsBodySchema,
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      await app.listService.reorderLists({
        currentUserId: user.id,
        boardId: request.params.boardId,
        items: request.body.lists,
      });

      return reply.status(HttpStatus.NO_CONTENT).send();
    }
  );
};

export default route;
