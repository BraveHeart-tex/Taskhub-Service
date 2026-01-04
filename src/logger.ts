import pino from 'pino';
import pinoPretty from 'pino-pretty';

const isProd = process.env.NODE_ENV === 'production';

export const logger = pino(
  {
    level: process.env.LOG_LEVEL ?? (isProd ? 'info' : 'debug'),
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
    ],
    base: {
      service: 'taskhub-api',
      env: process.env.NODE_ENV,
    },
  },
  isProd
    ? undefined
    : pinoPretty({
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      })
);
