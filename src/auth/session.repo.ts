import { and, eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { type SessionCreateInput, sessions } from '../db/schema';

export function createSessionRepo(db: Db) {
  return {
    async create(values: SessionCreateInput) {
      await db.insert(sessions).values(values);
    },
    async findById(sessionId: string) {
      const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.id, sessionId));

      return session ?? null;
    },
    async updateExpiresAt(sessionId: string, expiresAt: string) {
      await db
        .update(sessions)
        .set({ expiresAt })
        .where(eq(sessions.id, sessionId));
    },
    async delete(sessionId: string) {
      await db.delete(sessions).where(eq(sessions.id, sessionId));
    },
    async deleteByIdAndUserId(sessionId: string, userId: string) {
      await db
        .delete(sessions)
        .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)));
    },
  };
}

export type SessionRepo = ReturnType<typeof createSessionRepo>;
