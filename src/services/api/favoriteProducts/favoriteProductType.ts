'use client'

export type TFavoriteProduct = {
  id: number,
  productId: number,
  personId: number,
  createdAt: string,
  updatedAt: string,
}

export type TFavoriteProductCreate = {
  productId: number,
  personId: number,
}