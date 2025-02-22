import React from 'react';
import ProductsTable from '@/widjets/products/ProductsTable/ProductsTable';
// import { getAllProducts } from '@/services/api/productService';
// import { TProduct } from '@/services/types/productType';

// export async function generateStaticParams() {
//   const products = await getAllProducts();
//   // при загрузке все равно отправляется запрос по id на бек
//   return products.rows.map((product: TProduct) => product);
// }

const page = async () => {
  return (
    <ProductsTable />
  );
};

export default page;