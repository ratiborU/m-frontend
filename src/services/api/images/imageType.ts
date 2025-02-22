'use client'

export type TImage = {
  id: number,
  productId: string,
  path: string,
  createdAt: string,
  updatedAt: string,
}

export type TImageCreate = {
  productId: string,
  img: File,
}