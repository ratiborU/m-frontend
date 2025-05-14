import React from 'react';
import OrdersTable from '@/widjets/orders/OrdersTable/OrdersTable';
import { getAllOrders } from '@/services/api/orders/orderService';

const page = async () => {
  const orders = await getAllOrders();

  return (
    <OrdersTable orders={orders} />
  );
};

export default page;