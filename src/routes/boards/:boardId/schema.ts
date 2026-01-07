import { z } from 'zod';

export const boardIdPathParamsSchema = z.object({
  boardId: z.uuid(),
});
