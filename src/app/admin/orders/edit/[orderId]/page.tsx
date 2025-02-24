import React from 'react';
import EditOrder from '@/widjets/orders/EditOrder/EditOrder';
import { TOrder } from '@/services/api/orders/orderType';
import { TOrderProduct } from '@/services/api/orderProducts/orderProductType';
import { TProduct } from '@/services/api/products/productType';
import { getOneOrder } from '@/services/api/orders/orderService';
import { getAllOrderProductsByOrderId } from '@/services/api/orderProducts/orderProductService';

const page = async ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const order = await getOneOrder(orderId);
  const orderProducts = await getAllOrderProductsByOrderId(orderId);
  // Сделать функционал получения продуктов на беке 
  // одним запросом а не вот это вот все

  // const response2 = await fetch(`http://localhost:5000/api/orderProducts/byOrderId/${orderId}`, { cache: 'no-cache' });
  // const { rows: orderProducts }: { count: number, rows: TOrderProduct[] } = await response2.json();

  // const products: TProduct[] = [...Array(orderProducts.length)];
  // for (let i = 0; i < products.length; i++) {
  //   const responseProduct = await fetch(`http://localhost:5000/api/products/${orderProducts[i].productId}`, { cache: 'no-cache' })
  //   products[i] = await responseProduct.json();
  // }

  return (
    <div>
      <EditOrder {...order} orderProducts={orderProducts.rows} />
    </div>
  );
};

export default page;