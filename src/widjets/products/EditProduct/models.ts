import { TImage } from "@/services/types/imageType"
import { TProduct } from "@/services/types/productType"

export type ProductScheme = {
  title: string,
  description: string,
  characteristics: string,
  price: string,
  rate: string,
  commentsCount: string,
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