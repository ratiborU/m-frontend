'use client'
import { TImage } from "@/services/api/images/imageType"
import { TProduct } from "@/services/api/products/productType"
import { z } from "zod";

export const editProductSchema = z.object({
  name: z.string().min(1, 'мало'),
  description: z.string().min(1, 'мало'),
  seoTitle: z.string().min(1, 'мало'),
  seoDescription: z.string().min(1, 'мало'),
  characteristics: z.string().min(1, 'мало'),
  price: z.string().min(1, 'мало'),
  discount: z.string().min(1, 'мало'),
  categoryId: z.string().min(1, 'мало'),
  productsCount: z.string().min(1, 'мало'),
  stone: z.string().min(1, 'Минимальная длина 1 символ'),
  size: z.string().min(1, 'Минимальная длина 1 символ'),
  material: z.string().min(1, 'Минимальная длина 1 символ'),
  fasteningType: z.string().min(1, 'Минимальная длина 1 символ'),
  amount: z.string().min(1, 'Минимальная длина 1 символ'),
})

export type TEditProductSchema = z.infer<typeof editProductSchema>;

export type MainImageScheme = {
  file: FileList
}

export type ImageScheme = {
  img: FileList
}

export interface EditProductProps extends TProduct {
  images: TImage[]
}

export const stoneOptions = [];

export const sizeOptions = [];

export const materialOptions = [];

export const fasteningTypeOptions = [];