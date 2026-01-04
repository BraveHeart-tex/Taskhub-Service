import { useDb } from '../db/context';
import { type BoardMemberCreateInput, boardMembers } from '../db/schema';

export class BoardMemberRepository {
  async create(values: BoardMemberCreateInput) {
    const db = useDb();
    const [boardMember] = await db
      .insert(boardMembers)
      .values(values)
      .returning();
    return boardMember;
  }
}
