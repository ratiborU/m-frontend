'use client'
import { TFavoriteProduct } from "../favoriteProducts/favoriteProductType"
import { TBasketProduct } from "../basketProducts/basketProductType"
import { TCategory } from "../categories/categoryType"

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
  category: TCategory,
  favoriteProduct?: TFavoriteProduct,
  basketProduct?: TBasketProduct
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

