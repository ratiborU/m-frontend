'use client'

export type TOrderProduct = {
  id: number,
  count: number,
  productId: number,
  orderId: number,
  createdAt: string,
  updatedAt: string,
}

export type TOrderProductCreate = {
  count: number,
  productId: number,
  orderId: number,
}