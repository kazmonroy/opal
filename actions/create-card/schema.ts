import { z } from "zod";
export const createCardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2, {
      message: "Title must be at least 2 characters",
    }),
  boardId: z.string(),
  listId: z.string(),
});
