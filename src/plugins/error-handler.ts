import fp from 'fastify-plugin';
import { DomainError } from '@/domain/domain-error';
import { errorRegistry } from '@/lib/transport/errors/error-registry';

export default fp(async (app) => {
  app.setErrorHandler((err, request, reply) => {
    const requestId = request.id;

    if (app.config.NODE_ENV === 'development') {
      request.log.error(err);
    }

    if (err instanceof DomainError) {
      const mapping = errorRegistry.get(
        err.constructor as new () => DomainError
      );

      if (mapping) {
        return reply.status(mapping.status).send({
          error: {
            code: err.code,
            message: mapping.message,
            requestId,
          },
        });
      }
    }

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
