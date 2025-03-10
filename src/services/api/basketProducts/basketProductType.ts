'use client'

export type TBasketProduct = {
  id: string,
  inOrder: boolean,
  count: string,
  productId: string,
  personId: string,
  createdAt: string,
  updatedAt: string,
}

export type TBasketProductCreate = {
  count: string,
  productId: string,
  personId: string,
}