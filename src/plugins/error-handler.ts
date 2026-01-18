import fp from 'fastify-plugin';
import { DomainError } from '@/domain/domain-error';
import { isFastifyValidationError } from '@/http/fastify-validation-error';
import { HttpStatus } from '@/http/http-status';
import { errorRegistry } from '@/lib/transport/errors/error-registry';

export default fp(async (app) => {
  app.setErrorHandler((err, request, reply) => {
    request.log.error(err);

    const requestId = request.id;

    if (isFastifyValidationError(err)) {
      return reply.status(400).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          requestId,
          details: err.validation?.map((issue) => ({
            path: `${err.validationContext}${issue.instancePath || ''}`,
            message: issue.message,
          })),
        },
      });
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

    return (
      reply
        // biome-ignore lint/suspicious/noExplicitAny: any is fine here
        .status((err as any)?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          error: {
            // biome-ignore lint/suspicious/noExplicitAny: any is fine here
            code: (err as any)?.code || 'INTERNAL_ERROR',
            // biome-ignore lint/suspicious/noExplicitAny: any is fine here
            message: (err as any).message || 'Internal server error',
            requestId,
          },
        })
    );
  });
});
