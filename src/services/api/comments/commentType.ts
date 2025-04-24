'use client'
import { TProduct } from "../products/productType";
import { TPerson } from "../persons/personType";
import { TAnswer } from "../answers/answerType";

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
  answer?: TAnswer,
}

export type TCommentCreate = {
  text: string,
  rate: string,
  personId: string,
  productId: string,
}