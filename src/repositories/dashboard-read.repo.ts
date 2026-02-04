import { and, eq, inArray } from 'drizzle-orm';
import { useDb } from '@/db/context';
import {
  boardFavorites,
  boards,
  workspaceMembers,
  workspaces,
} from '@/db/schema';

export class DashboardReadRepository {
  async getUserWorkspaces(userId: string) {
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

  async getBoardsForWorkspaces(userId: string, workspaceIds: string[]) {
    const db = useDb();

    if (workspaceIds.length === 0) return [];

    return db
      .select({
        workspaceId: boards.workspaceId,
        id: boards.id,
        title: boards.title,
        isFavorited: boardFavorites.boardId,
      })
      .from(boards)
      .leftJoin(
        boardFavorites,
        and(
          eq(boardFavorites.boardId, boards.id),
          eq(boardFavorites.userId, userId)
        )
      )
      .where(inArray(boards.workspaceId, workspaceIds));
  }
}
