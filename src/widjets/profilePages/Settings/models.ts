import { z } from "zod";

export const editPersonProfileSchema = z.object({
  fio: z.string().min(1, 'мало'),
  email: z.string().min(1, 'мало'),
  phoneNumber: z.string().min(1, 'мало'),
})

export type TEditPersonProfileSchema = z.infer<typeof editPersonProfileSchema>;

export const changePersonPasswordSchema = z.object({
  oldPassword: z.string().min(1, 'мало'),
  newPassword: z.string().min(1, 'мало'),
  newPasswordAgain: z.string().min(1, 'мало'),
})

export type TChangePersonPasswordSchema = z.infer<typeof changePersonPasswordSchema>;