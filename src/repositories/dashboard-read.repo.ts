import { and, eq } from 'drizzle-orm';
import { useDb } from '@/db/context';
import {
  boardFavorites,
  boards,
  workspaceMembers,
  workspaces,
} from '@/db/schema';

export class DashboardReadRepository {
  async getDashboardRows(userId: string) {
    const db = useDb();

    return db
      .select({
        workspaceId: workspaces.id,
        workspaceName: workspaces.name,
        role: workspaceMembers.role,

        boardId: boards.id,
        boardTitle: boards.title,

        isFavorited: boardFavorites.boardId,
      })
      .from(workspaceMembers)
      .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
      .leftJoin(boards, eq(boards.workspaceId, workspaces.id))
      .leftJoin(
        boardFavorites,
        and(
          eq(boardFavorites.boardId, boards.id),
          eq(boardFavorites.userId, userId)
        )
      )
      .where(eq(workspaceMembers.userId, userId));
  }
}
