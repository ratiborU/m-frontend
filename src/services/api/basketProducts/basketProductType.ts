'use client'

import { TProduct } from "../products/productType"

export type TBasketProduct = {
  id: string,
  inOrder: boolean,
  count: string,
  productId: string,
  personId: string,
  createdAt: string,
  updatedAt: string,
  product: TProduct,
}

export type TBasketProductCreate = {
  count: string,
  productId: string,
  personId: string,
}