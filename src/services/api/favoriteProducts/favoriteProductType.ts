'use client'

export type TFavoriteProduct = {
  id: string,
  productId: string,
  personId: string,
  createdAt: string,
  updatedAt: string,
}

export type TFavoriteProductCreate = {
  productId: string,
  personId: string,
}