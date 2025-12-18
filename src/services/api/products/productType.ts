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
  commentsCount: string, // колличество комментариев
  productsCount: string, // колличество товара на складе
  sellCount: number, // количество продаж
  inOrdersCount: number, // количество заказов с этим товаром
  orderProductsCount: number, // сколько нужно подготовить к заказу
  categoryCharacteristics: object,
  categoryId: string,
  mainImage: string,
  createdAt: string,
  updatedAt: string,
  category: TCategory,
  favoriteProduct?: TFavoriteProduct,
  basketProduct?: TBasketProduct,
  // stone?: string,
  // size?: string,
  // material?: string,
  // fasteningType?: string,
  // amount?: string,
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
  // stone?: string,
  // size?: string,
  // material?: string,
  // fasteningType?: string,
  // amount?: string,
}

