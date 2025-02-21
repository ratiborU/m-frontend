'use client'

export type TBasketProduct = {
  id: number,
  inOrder: boolean,
  count: number,
  productId: number,
  personId: number,
  createdAt: string,
  updatedAt: string,
}

export type TBasketProductCreate = {
  inOrder: boolean,
  count: number,
  productId: number,
  personId: number,
}