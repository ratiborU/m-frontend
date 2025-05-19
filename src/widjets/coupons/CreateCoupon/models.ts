import { z } from "zod";

export const createCouponSchema = z.object({
  value: z.string().min(1, 'мало'),
  text: z.string().min(1, 'мало'),
  discount: z.string().min(1, 'мало'),
  personId: z.string(),
})

export type TCreateCouponSchema = z.infer<typeof createCouponSchema>;