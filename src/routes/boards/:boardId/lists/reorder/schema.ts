import { z } from 'zod';

export const reOrderListDtoSchema = z.object({
  listId: z.uuid(),
});

export const reOrderListsBodySchema = z.object({
  lists: z.array(reOrderListDtoSchema),
});
