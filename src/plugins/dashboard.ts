import fp from 'fastify-plugin';
import { DashboardReadRepository } from '@/repositories/dashboard-read.repo';
import { DashboardService } from '@/services/dashboard.service';

export default fp(async (app) => {
  const dashboardService = new DashboardService(new DashboardReadRepository());

  app.decorate('dashboardService', dashboardService);
});
