'use client'

import { TProduct } from "../products/productType"

export type TFavoriteProduct = {
  id: string,
  productId: string,
  personId: string,
  createdAt: string,
  updatedAt: string,
  product: TProduct
}

export type TFavoriteProductCreate = {
  productId: string,
  personId: string,
}