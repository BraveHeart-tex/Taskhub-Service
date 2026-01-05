import { z } from 'zod';

export const deleteListParamsSchema = z.object({
  boardId: z.uuid(),
  listId: z.uuid(),
});
