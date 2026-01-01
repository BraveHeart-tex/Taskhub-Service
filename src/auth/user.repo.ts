import { eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { type UserCreateInput, users } from '../db/schema';

export function createUserRepo(db: Db) {
  return {
    async create(input: UserCreateInput) {
      const [result] = await db.insert(users).values(input).returning();
      return result;
    },
    async findById(id: string) {
      const [user] = await db.select().from(users).where(eq(users.id, id));

      return user ?? null;
    },
    async findByEmail(email: string) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      return user ?? null;
    },
  };
}

export type UserRepo = ReturnType<typeof createUserRepo>;
