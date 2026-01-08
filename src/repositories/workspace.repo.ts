import { and, eq } from 'drizzle-orm';
import { useDb } from '@/db/context';
import {
  type WorkspaceInsert,
  type WorkspaceRow,
  type WorkspaceUpdate,
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

  async findByOwnerAndName(ownerId: WorkspaceRow['ownerId'], name: string) {
    const db = useDb();
    const [result] = await db
      .select()
      .from(workspaces)
      .where(and(eq(workspaces.ownerId, ownerId), eq(workspaces.name, name)));
    return result;
  }
}
