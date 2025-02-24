import { z } from "zod";

export const createOrderSchema = z.object({
  price: z.string().min(1, 'мало'),
  address: z.string().min(1, 'мало'),
  delivery: z.string().min(1, 'мало'),
  deliveryDays: z.string().min(1, 'мало'),
  comment: z.string().min(1, 'мало'),
  status: z.string().min(1, 'мало'),
  personId: z.string().min(1, 'мало'),
})

export type TCreateOrderSchema = z.infer<typeof createOrderSchema>;