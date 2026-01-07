import { z } from 'zod';
import { boardIdPathParamsSchema } from '../../schema';

export const deleteBoardMemberParamsSchema = boardIdPathParamsSchema.extend({
  userId: z.uuid(),
});
