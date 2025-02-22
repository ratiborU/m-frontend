import { TOrderProduct } from "@/services/api/orderProducts/orderProductType"
import { TOrder } from "@/services/api/orders/orderType"
import { TProduct } from "@/services/api/products/productType"

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