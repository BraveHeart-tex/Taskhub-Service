import type { BoardRepository } from '@/board/board.repo';
import type { BoardMemberRepository } from '@/board-member/board-member.repo';
import { withTransaction } from '@/db/transaction';
import { UnauthorizedError } from '@/domain/auth/auth.errors';
import { BoardNotFoundError } from '@/domain/board/board.errors';
import { ListNotFoundError } from '@/domain/board/list/list.errors';
import type { ListRepository } from './list.repo';

const LIST_POSITION_GAP = 1000;

export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly boardRepository: BoardRepository,
    private readonly boardMemberRepository: BoardMemberRepository
  ) {}
  async createList({
    currentUserId,
    boardId,
    title,
  }: {
    currentUserId: string;
    boardId: string;
    title: string;
  }) {
    return withTransaction(async () => {
      const board = await this.boardRepository.findById(boardId);
      if (!board) {
        throw new BoardNotFoundError();
      }

      const isCurrentUserBoardMember =
        await this.boardMemberRepository.isMember(boardId, currentUserId);
      if (!isCurrentUserBoardMember) {
        throw new UnauthorizedError();
      }

      const max = await this.listRepository.getMaxPosition(boardId);
      const position =
        max === null ? LIST_POSITION_GAP : max + LIST_POSITION_GAP;

      return this.listRepository.create({
        boardId,
        title,
        position,
      });
    });
  }
  async deleteList({
    currentUserId,
    listId,
    boardId,
  }: {
    currentUserId: string;
    listId: string;
    boardId: string;
  }) {
    return withTransaction(async () => {
      const board = await this.boardRepository.findById(boardId);
      if (!board) {
        throw new BoardNotFoundError();
      }

      const isCurrentUserBoardMember =
        await this.boardMemberRepository.isMember(boardId, currentUserId);
      if (!isCurrentUserBoardMember) {
        throw new UnauthorizedError();
      }

      const list = await this.listRepository.findById(listId);
      if (!list) {
        throw new ListNotFoundError();
      }

      await this.listRepository.delete(listId);
    });
  }
}
