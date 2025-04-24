'use client'
import { TProduct } from "../products/productType";
import { TPerson } from "../persons/personType";

export type THistoryProduct = {
  id: string,
  count: string,
  inOrderCount: string,
  viewsCount: string,
  isInFavorite: string,
  recomendationK: string,
  productId: string,
  product: TProduct,
  person?: TPerson,
  personId: string,
}

export type THistoryProductCreate = {
  count: string,
  inOrderCount: string,
  viewsCount: string,
  isInFavorite: string,
  recomendationK: string,
  productId: string,
  personId: string,
}