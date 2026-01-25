import { z } from 'zod';

export const boardRouteParamsSchema = z.object({
  workspaceId: z.uuid(),
  boardId: z.uuid(),
});
