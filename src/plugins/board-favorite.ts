import fp from 'fastify-plugin';
import { BoardFavoriteRepository } from '@/repositories/board-favorite.repo';
import { BoardMemberRepository } from '@/repositories/board-member.repo';
import { BoardFavoriteService } from '@/services/board-favorite.service';

export default fp(async (app) => {
  const boardFavoriteService = new BoardFavoriteService(
    new BoardMemberRepository(),
    new BoardFavoriteRepository()
  );

  app.decorate('boardFavoriteService', boardFavoriteService);
});
