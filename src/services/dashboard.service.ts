import type { DashboardReadRepository } from '@/repositories/dashboard-read.repo';
import type { DashboardDto } from '@/routes/users/me/dashboard/schema';

export class DashboardService {
  constructor(private readonly dashboardRepo: DashboardReadRepository) {}

  async getDashboard(userId: string): Promise<DashboardDto> {
    const rows = await this.dashboardRepo.getDashboardRows(userId);

    const workspacesMap = new Map<
      string,
      { id: string; name: string; role: 'owner' | 'admin' | 'member' }
    >();

    const boards: DashboardDto['boards'] = [];
    const favorites: string[] = [];

    for (const row of rows) {
      if (!workspacesMap.has(row.workspaceId)) {
        workspacesMap.set(row.workspaceId, {
          id: row.workspaceId,
          name: row.workspaceName,
          role: row.role,
        });
      }

      if (row.boardId) {
        boards.push({
          id: row.boardId,
          title: row.boardTitle!,
          workspaceId: row.workspaceId,
          isFavorited: row.isFavorited !== null,
        });

        if (row.isFavorited) {
          favorites.push(row.boardId);
        }
      }
    }

    return {
      workspaces: Array.from(workspacesMap.values()),
      boards,
      favorites,
    };
  }
}
