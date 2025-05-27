import { TOrderProduct } from "@/services/api/orderProducts/orderProductType";
import { TProduct } from "@/services/api/products/productType";

export const getSellsByProductsLastMonth = (products: TProduct[], orderProducts: TOrderProduct[]): TProduct[] => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const productsByKeys = products.reduce((acc: any, cur: TProduct) => {
    acc[cur.id] = { ...cur, sellCount: 0 };
    return acc;
  }, {});

  const nowDate = new Date();

  const orderProductsThisMonth = orderProducts.filter(x => {
    const productDate = new Date(x.createdAt)
    if ((nowDate.getMonth() - 1) % 12 != productDate.getMonth()) {
      return false;
    }
    return true;
  })

  for (const orderProduct of orderProductsThisMonth) {
    productsByKeys[orderProduct.productId].sellCount += orderProduct.count;
  }
  return Object.values(productsByKeys);
}

export const getSellsByProductsThisMonth = (products: TProduct[], orderProducts: TOrderProduct[]): TProduct[] => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const productsByKeys = products.reduce((acc: any, cur: TProduct) => {
    acc[cur.id] = { ...cur, sellCount: 0 };
    return acc;
  }, {});

  const nowDate = new Date();

  const orderProductsThisMonth = orderProducts.filter(x => {
    const productDate = new Date(x.createdAt)
    if (nowDate.getMonth() != productDate.getMonth()) {
      return false;
    }
    return true;
  })

  for (const orderProduct of orderProductsThisMonth) {
    productsByKeys[orderProduct.productId].sellCount += orderProduct.count;
  }
  return Object.values(productsByKeys);
}