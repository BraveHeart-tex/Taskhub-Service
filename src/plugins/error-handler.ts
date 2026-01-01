import fp from 'fastify-plugin';
import { isFastifyHttpError } from '../errors/is-http-error';

export default fp(async (app) => {
  app.setErrorHandler((err, request, reply) => {
    const requestId = request.id;

    if (isFastifyHttpError(err)) {
      return reply.status(err.statusCode).send({
        error: {
          ...err.error,
          requestId,
        },
      });
    }

    // Truly unknown errors
    request.log.error(err);

    return reply.status(500).send({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
        requestId,
      },
    });
  });
});
