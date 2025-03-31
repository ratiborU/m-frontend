'use client'

import { TOrderProduct } from "../orderProducts/orderProductType"
import { TPerson } from "../persons/personType"

export type TOrder = {
  id: string,
  price: string,
  address: string,
  delivery: string,
  deliveryDays: string,
  comment: string,
  status: string,
  personId: string,
  person?: TPerson,
  order_products?: TOrderProduct[],
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