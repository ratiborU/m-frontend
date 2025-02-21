'use client'

export type TCategory = {
  id: number,
  title: string,
  description: number,
  createdAt: string,
  updatedAt: string,
}

export type TCategoryCreate = {
  title: string,
  description: number,
}