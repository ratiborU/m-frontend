'use client'
import { TProduct } from "../products/productType";

type TTFIDF = {
  term: string,
  tfidf: number
}

export type TComment = {
  id: string,
  tfidfs: TTFIDF[],
  productId: string,
  product?: TProduct,
  createdAt: string,
  updatedAt: string,

}

export type TCommentCreate = {
  text: string,
  rate: string,
  personId: string,
  productId: string,
}