import type { FastifyInstance } from 'fastify';
import { users } from '../../db/schema';

export default async function (app: FastifyInstance) {
  app.get('/', async () => {
    const result = await app.db.select().from(users);
    return { users: result };
  });
}
