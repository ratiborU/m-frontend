'use client'

export type TAnswer = {
  id: number,
  text: string,
  personId: number,
  commentId: number,
  createdAt: string,
  updatedAt: string,
}

export type TAnswerCreate = {
  text: string,
  personId: number,
  commentId: number,
}