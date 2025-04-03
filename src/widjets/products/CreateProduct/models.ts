// 'use client'

// import { z } from "zod";

// export const createProductSchema = z.object({
//   name: z.string().min(1, 'Минимальная длина 1 символ'),
//   description: z.string().min(1, 'Минимальная длина 1 символ'),
//   seoTitle: z.string().min(1, 'Минимальная длина 1 символ'),
//   seoDescription: z.string().min(1, 'Минимальная длина 1 символ'),
//   characteristics: z.string().min(1, 'Минимальная длина 1 символ'),
//   price: z.string().min(1, 'Минимальная длина 1 символ'),
//   discount: z.string().min(1, 'Минимальная длина 1 символ'),
//   categoryId: z.string().min(1, 'Минимальная длина 1 символ'),
//   productsCount: z.string().min(1, 'Минимальная длина 1 символ'),
//   stone: z.string().min(1, 'Минимальная длина 1 символ'),
//   size: z.string().min(1, 'Минимальная длина 1 символ'),
//   material: z.string().min(1, 'Минимальная длина 1 символ'),
//   fasteningType: z.string().min(1, 'Минимальная длина 1 символ'),
//   amount: z.string().min(1, 'Минимальная длина 1 символ'),
//   file: z.instanceof(FileList),
// })

// export type TCreateProductSchema = z.infer<typeof createProductSchema>;