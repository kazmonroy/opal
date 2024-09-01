import { z } from "zod";
export const updateCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, {
      message: "Title must be at least 3 characters",
    }),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, {
        message: "Description is too short. Must be at least 3 characters",
      })
  ),
});
