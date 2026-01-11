import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
  workspaceRouteParamsSchema,
  workspaceSchema,
} from './schema';

const route: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {
      schema: {
        body: createWorkspaceSchema,
        response: {
          [HttpStatus.CREATED]: workspaceSchema,
        },
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      const { name } = request.body;

      const workspace = await app.workspaceService.create({
        name,
        ownerId: user.id,
      });

      return reply.status(HttpStatus.CREATED).send(workspace);
    }
  );

  app.patch(
    '/:id',
    {
      schema: {
        params: workspaceRouteParamsSchema,
        body: updateWorkspaceSchema,
        response: {
          [HttpStatus.OK]: workspaceSchema,
        },
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      const { id } = request.params;
      const { name } = request.body;

      const updatedWorkspace = await app.workspaceService.update({
        workspaceId: id,
        changes: { name },
        currentUserId: user.id,
      });

      return reply.status(HttpStatus.OK).send(updatedWorkspace);
    }
  );

  app.delete(
    '/:id',
    {
      schema: {
        params: workspaceRouteParamsSchema,
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      const workspaceId = request.params.id;

      await app.workspaceService.delete(user.id, workspaceId);

      return reply.status(HttpStatus.NO_CONTENT).send();
    }
  );
};

export default route;
