'use client'
import { TProduct } from "../products/productType";
import { TPerson } from "../persons/personType";

export type TComment = {
  id: string,
  text: string,
  rate: string,
  personId: string,
  productId: string,
  createdAt: string,
  updatedAt: string,
  product: TProduct,
  person: TPerson,
}

export type TCommentCreate = {
  text: string,
  rate: string,
  personId: string,
  productId: string,
}