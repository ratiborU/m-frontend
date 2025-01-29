import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { orderColumns } from './columns';
import { getAllProducts } from './action';

const OrdersTable = async () => {
  const orders = await getAllProducts();
  console.log(orders);

  return (
    <div>
      <BaseGrid columns={orderColumns} data={orders.rows} />
    </div>
  );
};

export default OrdersTable;