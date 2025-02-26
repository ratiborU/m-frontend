'use client'

export type TProduct = {
  id: string,
  name: string,
  description: string,
  seoTitle: string,
  seoDescription: string,
  characteristics: string,
  price: string,
  discount: string,
  rate: string,
  commentsCount: string,
  productsCount: string,
  categoryId: string,
  mainImage: string,
  createdAt: string,
  updatedAt: string,
}

export type TProductCreate = {
  name: string,
  description: string,
  seoTitle: string,
  seoDescription: string,
  characteristics: string,
  price: string,
  discount: string,
  productsCount: string,
  categoryId: string,
  file: File, // ?
}

