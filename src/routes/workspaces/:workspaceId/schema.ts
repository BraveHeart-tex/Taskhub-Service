import { z } from 'zod';

export const workspaceRouteParamsSchema = z.object({
  workspaceId: z.uuid(),
});
