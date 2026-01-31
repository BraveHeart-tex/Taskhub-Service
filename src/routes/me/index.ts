import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';
import {
  authenticatedUserSchema,
  favoriteWorkspacesResponseSchema,
} from '../auth/schema';

const meRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/',
    {
      schema: {
        tags: ['Me'],
        summary: 'Get current user',
        description:
          'Returns the currently authenticated user.\n\n' +
          'This endpoint represents the `/me` resource and is used to hydrate ' +
          'user-specific identity and session state on the client.',
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

  app.get(
    '/favorite-workspaces',
    {
      schema: {
        tags: ['Me'],
        summary: 'Get favorite workspaces',
        description:
          'Returns the IDs of workspaces favorited by the current user.\n\n' +
          'This endpoint exposes user preferences and does not return workspace ' +
          'details. Clients are expected to compose this data with existing ' +
          'workspace queries.',
        response: {
          [HttpStatus.OK]: favoriteWorkspacesResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      const favoriteWorkspaces =
        await app.workspaceFavoriteService.getFavoriteWorkspaces(user.id);

      return reply.status(HttpStatus.OK).send(favoriteWorkspaces);
    }
  );
};

export default meRoute;
