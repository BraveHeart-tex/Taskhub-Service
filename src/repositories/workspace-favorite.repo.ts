import { and, eq } from 'drizzle-orm';
import { useDb } from '@/db/context';
import { workspaceFavorites } from '@/db/schema';

export class WorkspaceFavoriteRepository {
  async exists(userId: string, workspaceId: string): Promise<boolean> {
    const db = useDb();
    const row = await db
      .select({ userId: workspaceFavorites.userId })
      .from(workspaceFavorites)
      .where(
        and(
          eq(workspaceFavorites.userId, userId),
          eq(workspaceFavorites.workspaceId, workspaceId)
        )
      )
      .limit(1);

    return row.length > 1;
  }

  async insert(userId: string, workspaceId: string): Promise<void> {
    const db = useDb();
    await db
      .insert(workspaceFavorites)
      .values({ userId, workspaceId })
      .onConflictDoNothing();
  }

  async delete(userId: string, workspaceId: string): Promise<void> {
    const db = useDb();
    await db
      .delete(workspaceFavorites)
      .where(
        and(
          eq(workspaceFavorites.userId, userId),
          eq(workspaceFavorites.workspaceId, workspaceId)
        )
      );
  }
  async findByUserId(userId: string): Promise<string[]> {
    const db = useDb();
    const rows = await db
      .select({ workspaceId: workspaceFavorites.workspaceId })
      .from(workspaceFavorites)
      .where(and(eq(workspaceFavorites.userId, userId)));

    return rows.map((row) => row.workspaceId);
  }
}
