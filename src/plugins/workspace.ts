import fp from 'fastify-plugin';
import { createWorkspaceRepo } from '../workspace/workspace.repo';
import { createWorkspaceService } from '../workspace/workspace.service';

export default fp(async (app) => {
  const workspaceService = createWorkspaceService(createWorkspaceRepo(app.db));
  app.decorate('workspace', workspaceService);
});
