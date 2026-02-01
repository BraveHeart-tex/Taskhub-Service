import type { DashboardReadRepository } from '@/repositories/dashboard-read.repo';
import type { DashboardDto } from '@/routes/users/me/dashboard/schema';

export class DashboardService {
  constructor(private readonly dashboardRepo: DashboardReadRepository) {}

  async getDashboard(userId: string): Promise<DashboardDto> {
    const workspaces = await this.dashboardRepo.findWorkspacesByUser(userId);
    const workspaceIds = workspaces.map((workspace) => workspace.id);

    const boards =
      await this.dashboardRepo.findBoardsByWorkspaceIds(workspaceIds);

    const favoriteBoardIds =
      await this.dashboardRepo.findFavoriteBoardIdsByUser(userId);

    const favoriteSet = new Set(favoriteBoardIds);

    return {
      workspaces,
      favorites: favoriteBoardIds,
      boards: boards.map((board) => ({
        ...board,
        isFavorited: favoriteSet.has(board.id),
      })),
    };
  }
}
