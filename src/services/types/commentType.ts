'use client'

export type TComment = {
  id: number,
  text: string,
  rate: number,
  personId: number,
  productId: number,
  createdAt: string,
  updatedAt: string,
}

export type TCommentCreate = {
  text: string,
  rate: number,
  personId: number,
  productId: number,
}