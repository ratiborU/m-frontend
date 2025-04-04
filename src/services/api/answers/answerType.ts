'use client'

export type TAnswer = {
  id: string,
  text: string,
  personId: string,
  commentId: string,
  createdAt: string,
  updatedAt: string,
}

export type TAnswerCreate = {
  text: string,
  personId: string,
  commentId: string,
}