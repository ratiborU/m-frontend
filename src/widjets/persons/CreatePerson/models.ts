import { z } from "zod";

export const createPersonSchema = z.object({
  firstName: z.string().min(1, 'мало'),
  secondName: z.string().min(1, 'мало'),
  fatherName: z.string().min(1, 'мало'),
  email: z.string().min(1, 'мало'),
  phoneNumber: z.string().min(1, 'мало'),
  password: z.string().min(1, 'мало'),
  role: z.string().min(1, 'мало'),
})

export type TCreatePersonSchema = z.infer<typeof createPersonSchema>;