import React from 'react';
import ProfileOrders from '@/widjets/profilePages/Orders/ProfileOrders';
import { getAllOrdersByPersonId } from '@/services/api/orders/orderService';
import { cookies } from 'next/headers';

const page = async () => {
  const orders = await getAllOrdersByPersonId(cookies().get('personId')?.value || 0);


  return (
    <>
      <ProfileOrders orders={orders} />
    </>
  );
};

export default page;