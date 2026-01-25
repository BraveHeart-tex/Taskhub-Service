import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { SESSION_COOKIE_NAME } from '@/domain/auth/auth.constants';
import { AlreadyLoggedInError } from '@/domain/auth/auth.errors';
import { COMMON_COOKIE_SETTINGS } from '@/http/cookies';
import { HttpStatus } from '@/http/http-status';
import { apiErrorSchema } from '@/lib/shared/schemas/error';
import { authenticatedUserSchema, loginBodySchema } from './schema';

const loginRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Log in',
        description:
          'Authenticates a user using email and password and creates a new session.\n\n' +
          'On successful authentication, a session cookie is set on the response.\n\n' +
          'If the user is already authenticated, the request is rejected.\n\n' +
          'The returned payload contains basic user information for immediate client hydration.',
        body: loginBodySchema,
        response: {
          [HttpStatus.CREATED]: authenticatedUserSchema,
          [HttpStatus.BAD_REQUEST]: apiErrorSchema,
          [HttpStatus.CONFLICT]: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      if (request.user?.id || request.session?.id) {
        throw new AlreadyLoggedInError();
      }

      const result = await app.authService.login(
        request.body.email,
        request.body.password
      );

      reply.setCookie(
        SESSION_COOKIE_NAME,
        `${result.sessionId}.${result.sessionSecret}`,
        {
          ...COMMON_COOKIE_SETTINGS,
        }
      );

      return reply.status(HttpStatus.CREATED).send({
        id: result.user.id,
        email: result.user.email,
        fullName: result.user.fullName,
        createdAt: result.user.createdAt,
      });
    }
  );
};

export default loginRoute;
