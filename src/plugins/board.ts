import fp from 'fastify-plugin';
import { BoardRepository } from '../board/board.repo';
import { BoardService } from '../board/board.service';
import { BoardMemberRepository } from '../board-member/board-member.repo';
import { WorkspaceRepository } from '../workspace/workspace.repo';

export default fp(async (app) => {
  const boardService = new BoardService(
    new BoardRepository(),
    new BoardMemberRepository(),
    new WorkspaceRepository()
  );
  app.decorate('boardService', boardService);
});
