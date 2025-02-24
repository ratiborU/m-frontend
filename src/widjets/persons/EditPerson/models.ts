import { z } from "zod";

export const editPersonSchema = z.object({
  firstName: z.string().min(1, 'мало'),
  secondName: z.string().min(1, 'мало'),
  fatherName: z.string().min(1, 'мало'),
  email: z.string().min(1, 'мало'),
  phoneNumber: z.string().min(1, 'мало'),
})

export type TEditPersonSchema = z.infer<typeof editPersonSchema>;