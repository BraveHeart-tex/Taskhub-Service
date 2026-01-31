import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';
import { workspaceRouteParamsSchema } from '@/routes/workspaces/:workspaceId/schema';

const route: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {
      schema: {
        tags: ['Workspaces'],
        summary: 'Favorite a workspace',
        description: "Add a workspace to the user's favorite list",
        params: workspaceRouteParamsSchema,
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      await app.workspaceFavoriteService.favorite(
        user.id,
        request.params.workspaceId,
      );

      return reply.status(HttpStatus.NO_CONTENT).send();
    },
  );
  app.delete(
    '/',
    {
      schema: {
        tags: ['Workspaces'],
        summary: 'Unfavorite a workspace',
        description: "Remove a workspace from the user's favorite list",
        params: workspaceRouteParamsSchema,
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      await app.workspaceFavoriteService.unfavorite(
        user.id,
        request.params.workspaceId,
      );

      return reply.status(HttpStatus.NO_CONTENT).send();
    },
  );
};

export default route;
