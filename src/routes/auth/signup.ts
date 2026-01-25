import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { SESSION_COOKIE_NAME } from '@/domain/auth/auth.constants';
import { AlreadyLoggedInError } from '@/domain/auth/auth.errors';
import { COMMON_COOKIE_SETTINGS } from '@/http/cookies';
import { HttpStatus } from '@/http/http-status';
import { apiErrorSchema } from '@/lib/shared/schemas/error';
import { authenticatedUserSchema, signUpBodySchema } from './schema';

const signUpRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/signup',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Sign up',
        description:
          'Creates a new user account and authenticates the user in a single operation.\n\n' +
          'On successful signup, a new session is created and a session cookie is set on the response.\n\n' +
          'If a user is already authenticated, the request is rejected.',
        body: signUpBodySchema,
        response: {
          [HttpStatus.CREATED]: authenticatedUserSchema,
          [HttpStatus.CONFLICT]: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      if (request.user?.id || request.session?.id) {
        throw new AlreadyLoggedInError();
      }

      const result = await app.authService.signup(request.body);

      reply.setCookie(
        SESSION_COOKIE_NAME,
        `${result.sessionId}.${result.sessionSecret}`,
        {
          ...COMMON_COOKIE_SETTINGS,
        }
      );

      return reply.status(HttpStatus.CREATED).send(result.user);
    }
  );
};

export default signUpRoute;
