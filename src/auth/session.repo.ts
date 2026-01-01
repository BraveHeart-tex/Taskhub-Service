import { and, eq, gt } from 'drizzle-orm';
import type { Db } from '../db/client';
import { type SessionCreateInput, sessions } from '../db/schema';

export function createSessionRepo(db: Db) {
  return {
    async create(values: SessionCreateInput) {
      await db.insert(sessions).values(values);
    },
    async findValid(sessionId: string) {
      const [session] = await db
        .select()
        .from(sessions)
        .where(
          and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date()))
        );

      return session ?? null;
    },
    async delete(sessionId: string) {
      await db.delete(sessions).where(eq(sessions.id, sessionId));
    },
  };
}
