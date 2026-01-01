import { eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { type UserCreateInput, users } from '../db/schema';

export function createUserRepo(db: Db) {
  return {
    async findByEmail(email: string) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      return user ?? null;
    },
    async create(input: UserCreateInput) {
      const [result] = await db.insert(users).values(input).returning();
      return result;
    },
  };
}
