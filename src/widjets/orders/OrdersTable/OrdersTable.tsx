import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { orderColumns } from './columns';
import { getAllOrders } from '@/services/api/orders/orderService';

const OrdersTable = async () => {
  const orders = await getAllOrders();

  return (
    <div>
      <BaseGrid columns={orderColumns} data={orders.rows} />
    </div>
  );
};

export default OrdersTable;