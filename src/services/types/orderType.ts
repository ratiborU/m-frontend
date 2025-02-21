'use client'

export type TOrder = {
  id: string,
  price: string,
  address: string,
  delivery: string,
  deliveryDays: string,
  comment: string,
  status: string,
  personId: string,
  createdAt: string,
  updatedAt: string,
}

export type TOrderCreate = {
  price: string,
  address: string,
  delivery: string,
  deliveryDays: string,
  comment: string,
  status: string,
  personId: string,
}