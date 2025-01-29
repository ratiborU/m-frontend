import React from 'react';
// import ProductsTable from '@/widjets/products/ProductsTable/ProductsTable';
import OrdersTable from '@/widjets/orders/OrdersTable/OrdersTable';

export async function generateStaticParams() {
  const response = await fetch(`http://localhost:5000/api/orders?limit=100&page=1`, {
    next: {
      // revalidate: 3600, // обновлять каждый час
      tags: ['orders']
    }
  });
  const orders = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return orders.map((orders: { id: any; }) => orders.id);
}

const page = () => {
  return (
    <OrdersTable />
  );
};

export default page;