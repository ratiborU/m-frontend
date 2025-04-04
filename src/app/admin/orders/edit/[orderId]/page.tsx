import React from 'react';
import EditOrder from '@/widjets/orders/EditOrder/EditOrder';
import { getOneOrder } from '@/services/api/orders/orderService';
import { getAllOrderProductsByOrderId } from '@/services/api/orderProducts/orderProductService';

const page = async ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const order = await getOneOrder(orderId);
  const orderProducts = await getAllOrderProductsByOrderId(orderId);

  return (
    <div>
      <EditOrder {...order} orderProducts={orderProducts.rows} />
    </div>
  );
};

export default page;