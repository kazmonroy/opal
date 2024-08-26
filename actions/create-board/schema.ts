import { z } from 'zod';

export const createBoardSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, {
      message: 'Title must be at least 3 characters',
    }),
  image: z.string({
    required_error: 'Image is required',
    invalid_type_error: 'Image is required',
  }),
});
