import { TImage } from "@/services/types/imageType"
import { TProduct } from "@/services/types/productType"

export type ProductScheme = {
  name: string,
  description: string,
  seoTitle: string,
  seoDescription: string,
  characteristics: string,
  price: string,
  discount: string,
  rate: string,
  commentsCount: string,
  productsCount: string,
  categoryId: string,
  file: FileList
}

export type MainImageScheme = {
  file: FileList
}

export type ImageScheme = {
  img: FileList
}

export interface EditProductProps extends TProduct {
  images: TImage[]
}