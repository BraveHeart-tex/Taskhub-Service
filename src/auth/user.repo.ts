import { eq } from 'drizzle-orm';
import { useDb } from '../db/context';
import { type UserCreateInput, users } from '../db/schema';

export class UserRepo {
  async create(input: UserCreateInput) {
    const db = useDb();
    const [result] = await db.insert(users).values(input).returning();
    return result;
  }

  async findById(id: string) {
    const db = useDb();
    const [user] = await db.select().from(users).where(eq(users.id, id));

    return user ?? null;
  }

  async findByEmail(email: string) {
    const db = useDb();
    const [user] = await db.select().from(users).where(eq(users.email, email));

    return user ?? null;
  }
}
