import type { FastifyError, FastifySchemaValidationError } from 'fastify';

interface FastifyValidationError extends FastifyError {
  code: 'FST_ERR_VALIDATION';
  statusCode: 400;
  validation: FastifySchemaValidationError[];
  validationContext?: 'body' | 'querystring' | 'params' | 'headers';
}

export function isFastifyValidationError(
  err: unknown
): err is FastifyValidationError {
  return (
    typeof err === 'object' &&
    err !== null &&
    // biome-ignore lint/suspicious/noExplicitAny: using any is fine here
    (err as any).code === 'FST_ERR_VALIDATION' &&
    // biome-ignore lint/suspicious/noExplicitAny: using any is fine here
    Array.isArray((err as any).validation)
  );
}
