'use client'

export type TCategory = {
  id: string,
  name: string,
  description: string,
  parameters: object,
  createdAt: string,
  updatedAt: string,
}

export type TCategoryCreate = {
  name: string,
  description: string,
  parameters: object,
}