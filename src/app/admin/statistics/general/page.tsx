import React from 'react';
import GeneralStatistics from '@/widjets/statisticPages/general/GeneralStatistics';
import { getAllOrders } from '@/services/api/orders/orderService';

const page = async () => {
  const orders = await getAllOrders()
  return (
    <>
      <GeneralStatistics orders={orders} />
    </>
  );
};

export default page;