'use client'

export type TPagination<T> = {
  count: number,
  rows: T[]
}