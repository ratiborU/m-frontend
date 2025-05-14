'use client'
import { TPerson } from "../persons/personType"

export type TLoyalty = {
  id: string,
  points: string,
  cashback: string,
  total: string,
  personId: string,
  person?: TPerson,
  createdAt: string,
  updatedAt: string,
}
