import { z } from "zod";

export const createCommentSchema = z.object({
  text: z.string().min(1, 'мало'),
  rate: z.string().min(1, 'мало'),
  personId: z.string().min(1, 'мало'),
  productId: z.string().min(1, 'мало'),
})

export type TCreateCommentSchema = z.infer<typeof createCommentSchema>;