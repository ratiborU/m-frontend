import { TOrderProduct } from "@/services/types/orderProductType"
import { TOrder } from "@/services/types/orderType"
import { TProduct } from "@/services/types/productType"

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

export interface EditOrderProps extends TOrder {
  orderProducts: TOrderProduct[],
  products: TProduct[]
}