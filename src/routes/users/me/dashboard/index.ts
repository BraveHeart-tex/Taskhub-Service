import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { HttpStatus } from '@/http/http-status';
import { requireAuth } from '@/lib/require-auth';
import { dashboardSchema } from './schema';

const dashboardRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/',
    {
      schema: {
        tags: ['Dashboard'],
        summary: 'Get user dashboard',
        description:
          'Returns the workspaces and boards required to hydrate the authenticated user’s dashboard.',
        response: {
          [HttpStatus.OK]: dashboardSchema,
        },
      },
    },
    async (request, reply) => {
      const { user } = requireAuth(request);

      const result = await app.dashboardService.getDashboard(user.id);

      return reply.send(result);
    }
  );
};

export default dashboardRoute;
