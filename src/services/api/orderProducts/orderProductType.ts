'use client'
import { TProduct } from "../products/productType"

export type TOrderProduct = {
  id: number,
  count: number,
  productId: number,
  orderId: number,
  product?: TProduct,
  createdAt: string,
  updatedAt: string,
}

export type TOrderProductCreate = {
  count: number,
  productId: number,
  orderId: number,
}