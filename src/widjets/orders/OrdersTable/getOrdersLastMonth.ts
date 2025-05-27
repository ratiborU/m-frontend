import { TOrder } from "@/services/api/orders/orderType";
// import { getAllProducts } from "@/services/api/products/productService";
import { TProduct } from "@/services/api/products/productType";

export const getOrdersLastMonth = (orders: TOrder[]) => {
  const nowDate = new Date();
  const newOrders = orders.filter(x => {
    const orderDate = new Date(x.createdAt);
    if ((nowDate.getMonth() - 1) % 12 != orderDate.getMonth()) {
      return false;
    }
    return true;
  })
  return newOrders;
}

export const getOrdersThisMonth = (orders: TOrder[]) => {
  const nowDate = new Date();
  const newOrders = orders.filter(x => {
    const orderDate = new Date(x.createdAt);
    if (nowDate.getMonth() != orderDate.getMonth()) {
      return false;
    }
    return true;
  })
  return newOrders;
}

export const getProductsToSend = (orders: TOrder[]): TProduct[] => {
  const newOrders = orders.filter(x => x.status == 'В обработке')
  const orderProducts = newOrders.map(x => x.order_products).flat();
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const productsByKeys = orderProducts.reduce((acc: any, cur) => {
    if (acc[cur!.productId]) {
      acc[cur!.productId].sellCount += cur?.count;
    } else {
      cur!.product.sellCount = cur!.count;
      acc[cur!.productId] = cur?.product;
    }
    return acc;
  }, {})
  return Object.values(productsByKeys);
}

export const getOrdersToSend = (orders: TOrder[]) => {
  const newOrders = orders.filter(x => x.status == 'В обработке')
  return newOrders;
}