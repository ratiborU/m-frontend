import { TOrderProduct } from "@/services/api/orderProducts/orderProductType"
import { TOrder } from "@/services/api/orders/orderType"
// import { TProduct } from "@/services/api/products/productType"
import { z } from "zod";


export type PersonScheme = {
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

export const editOrderSchema = z.object({
  price: z.string().min(1, 'мало'),
  address: z.string().min(1, 'мало'),
  delivery: z.string().min(1, 'мало'),
  deliveryDays: z.string().min(1, 'мало'),
  comment: z.string(),
  status: z.string().min(1, 'мало'),
  personId: z.string().min(1, 'мало'),
})

export type TEditOrderSchema = z.infer<typeof editOrderSchema>;

export interface EditOrderProps extends TOrder {
  orderProducts: TOrderProduct[],
}

export const statusOptions = [
  {
    text: 'Ожидает оплаты',
    value: 'Ожидает оплаты'
  },
  {
    text: 'Подтвержден',
    value: 'Подтвержден'
  },
  {
    text: 'Собран',
    value: 'Собран'
  },
  {
    text: 'В пути',
    value: 'В пути'
  },
  {
    text: 'Доставлен',
    value: 'Доставлен'
  },
  {
    text: 'Возврат',
    value: 'Возврат'
  },
  {
    text: 'Отменен',
    value: 'Отменен'
  }
]