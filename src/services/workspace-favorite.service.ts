import type { WorkspaceFavoriteRepository } from '@/repositories/workspace-favorite.repo';
import type { WorkspaceService } from './workspace.service';

export class WorkspaceFavoriteService {
  constructor(
    private readonly repo: WorkspaceFavoriteRepository,
    private readonly workspaceService: WorkspaceService,
  ) {}

  async favorite(userId: string, workspaceId: string) {
    await this.workspaceService.assertMember(userId, workspaceId);

    await this.repo.insert(userId, workspaceId);

    return { favorited: true };
  }

  async unfavorite(userId: string, workspaceId: string) {
    await this.workspaceService.assertMember(userId, workspaceId);

    await this.repo.delete(userId, workspaceId);

    return { favorited: false };
  }
}
