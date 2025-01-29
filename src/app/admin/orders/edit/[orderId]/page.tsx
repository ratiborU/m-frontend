import React from 'react';
import EditOrder from '@/widjets/orders/EditOrder/EditOrder';
import { TOrder } from '@/services/types/orderType';
import { TOrderProduct } from '@/services/types/orderProductType';

const page = async ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, { cache: 'no-cache' });
  const order: TOrder = await response.json();

  const response2 = await fetch(`http://localhost:5000/api/orderProducts/byOrderId/${orderId}`, { cache: 'no-cache' });
  const { rows: orderProducts }: { count: number, rows: TOrderProduct[] } = await response2.json();

  return (
    <div>
      <EditOrder {...order} products={orderProducts} />
    </div>
  );
};

export default page;