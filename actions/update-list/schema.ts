import { z } from 'zod';
export const updateListSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(3, {
      message: 'Title must be at least 3 characters',
    }),
  id: z.string(),
  boardId: z.string(),
});
