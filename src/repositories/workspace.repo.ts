import { and, eq, getTableColumns } from 'drizzle-orm';
import { useDb } from '@/db/context';
import {
  type WorkspaceInsert,
  type WorkspaceRow,
  type WorkspaceUpdate,
  workspaceMembers,
  workspaces,
} from '@/db/schema';

export class WorkspaceRepository {
  async create(values: WorkspaceInsert) {
    const db = useDb();
    const [result] = await db.insert(workspaces).values(values).returning();
    return result;
  }

  async update(id: WorkspaceRow['id'], changes: WorkspaceUpdate) {
    const db = useDb();
    const [result] = await db
      .update(workspaces)
      .set(changes)
      .where(eq(workspaces.id, id))
      .returning();

    return result;
  }

  async delete(id: WorkspaceRow['id']) {
    const db = useDb();
    await db.delete(workspaces).where(eq(workspaces.id, id)).returning();
  }

  async findById(id: WorkspaceRow['id']) {
    const db = useDb();
    const [result] = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, id));
    return result;
  }

  async findByUserId(userId: string) {
    const db = useDb();
    const ownedWorkspaces = await db
      .select(getTableColumns(workspaces))
      .from(workspaces)
      .where(eq(workspaces.ownerId, userId));

    const memberWorkspaces = await db
      .select(getTableColumns(workspaces))
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        and(
          eq(workspaceMembers.workspaceId, workspaces.id),
          eq(workspaceMembers.userId, userId)
        )
      );

    const workspaceMap = new Map<string, WorkspaceRow>();
    for (const workspace of ownedWorkspaces) {
      workspaceMap.set(workspace.id, workspace);
    }
    for (const workspace of memberWorkspaces) {
      workspaceMap.set(workspace.id, workspace);
    }

    return Array.from(workspaceMap.values());
  }
}
