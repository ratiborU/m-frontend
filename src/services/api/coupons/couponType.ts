'use client'
import { TProduct } from "../products/productType";
import { TPerson } from "../persons/personType";

export type TCoupon = {
  id: string,
  value: string,
  text?: string,
  discount: string,
  minPrice?: string,
  maxDiscount?: string,
  isOnceOnly?: boolean,
  createdAt: string,
  updatedAt: string,
  product?: TProduct,
  person?: TPerson,
  personId?: string,
  productId?: string,
}

export type TCouponCreate = {
  value: string,
  text?: string,
  discount?: string,
  minPrice?: string,
  maxDiscount?: string,
  isOnceOnly?: boolean,
  personId?: string,
  productId?: string,
}