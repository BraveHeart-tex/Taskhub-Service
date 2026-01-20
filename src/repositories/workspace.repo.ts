import { eq, inArray, sql } from 'drizzle-orm';
import { useDb } from '@/db/context';
import {
  users,
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
    const accessibleWorkspaceIds = db
      .select({ workspaceId: workspaces.id })
      .from(workspaces)
      .where(eq(workspaces.ownerId, userId))
      .union(
        db
          .select({ workspaceId: workspaceMembers.workspaceId })
          .from(workspaceMembers)
          .where(eq(workspaceMembers.userId, userId))
      );

    const baseWorkspaces = await db
      .select({
        id: workspaces.id,
        name: workspaces.name,
        ownerId: workspaces.ownerId,
        createdAt: workspaces.createdAt,
        updatedAt: workspaces.updatedAt,
        isCurrentUserOwner: eq(workspaces.ownerId, userId),
      })
      .from(workspaces)
      .where(inArray(workspaces.id, accessibleWorkspaceIds));

    const memberCounts = await db
      .select({
        workspaceId: workspaceMembers.workspaceId,
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(workspaceMembers)
      .where(inArray(workspaceMembers.workspaceId, accessibleWorkspaceIds))
      .groupBy(workspaceMembers.workspaceId);

    const memberCountMap = new Map(
      memberCounts.map((m) => [m.workspaceId, m.count])
    );

    const memberPreviews = await db
      .select({
        workspaceId: workspaceMembers.workspaceId,
        id: users.id,
        name: users.fullName,
        avatarUrl: users.avatarUrl,
      })
      .from(workspaceMembers)
      .innerJoin(users, eq(users.id, workspaceMembers.userId))
      .where(inArray(workspaceMembers.workspaceId, accessibleWorkspaceIds))
      .orderBy(workspaceMembers.createdAt);

    const membersPreviewMap = new Map<
      string,
      { id: string; name: string; avatarUrl: string }[]
    >();

    for (const row of memberPreviews) {
      const list = membersPreviewMap.get(row.workspaceId) ?? [];
      if (list.length < 5) {
        list.push({
          id: row.id,
          name: row.name,
          avatarUrl: row.avatarUrl || '',
        });
        membersPreviewMap.set(row.workspaceId, list);
      }
    }

    return baseWorkspaces.map((ws) => ({
      ...ws,
      memberCount: memberCountMap.get(ws.id) ?? 0,
      membersPreview: membersPreviewMap.get(ws.id) ?? [],
    }));
  }
}
