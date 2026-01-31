import fp from 'fastify-plugin';
import { WorkspaceFavoriteRepository } from '@/repositories/workspace-favorite.repo';
import { WorkspaceFavoriteService } from '@/services/workspace-favorite.service';

export default fp(async (app) => {
  const workspaceFavoriteService = new WorkspaceFavoriteService(
    new WorkspaceFavoriteRepository(),
    app.workspaceService,
  );

  app.decorate('workspaceFavoriteService', workspaceFavoriteService);
});
