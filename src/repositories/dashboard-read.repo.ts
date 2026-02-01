import { eq, inArray } from 'drizzle-orm';
import { useDb } from '@/db/context';
import {
  boardFavorites,
  boards,
  workspaceMembers,
  workspaces,
} from '@/db/schema';

export class DashboardReadRepository {
  async findWorkspacesByUser(userId: string) {
    const db = useDb();
    return db
      .select({
        id: workspaces.id,
        name: workspaces.name,
        role: workspaceMembers.role,
      })
      .from(workspaceMembers)
      .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
      .where(eq(workspaceMembers.userId, userId));
  }

  async findBoardsByWorkspaceIds(workspaceIds: string[]) {
    if (workspaceIds.length === 0) return [];
    const db = useDb();

    return db
      .select({
        id: boards.id,
        title: boards.title,
        workspaceId: boards.workspaceId,
      })
      .from(boards)
      .where(inArray(boards.workspaceId, workspaceIds));
  }

  async findFavoriteBoardIdsByUser(userId: string) {
    const db = useDb();
    const rows = await db
      .select({ boardId: boardFavorites.boardId })
      .from(boardFavorites)
      .where(eq(boardFavorites.userId, userId));

    return rows.map((r) => r.boardId);
  }
}
