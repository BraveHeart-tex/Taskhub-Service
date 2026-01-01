import 'fastify';
import type { Db } from '../db/client';

declare module 'fastify' {
  interface FastifyInstance {
    db: Db;
    config: {
      NODE_ENV: string;
      PORT: number;
      DATABASE_URL: string;
    };
  }
}
