import React from 'react';
import ProductsTable from '@/widjets/products/ProductsTable/ProductsTable';
import { getAllProducts } from '@/services/api/products/productService';
import { getAllOrderProducts } from '@/services/api/orderProducts/orderProductService';
// import { getAllProducts } from '@/services/api/productService';
// import { TProduct } from '@/services/types/productType';

// export async function generateStaticParams() {
//   const products = await getAllProducts();
//   // при загрузке все равно отправляется запрос по id на бек
//   return products.rows.map((product: TProduct) => product);
// }

const page = async () => {
  const products = await getAllProducts();
  const orderProducts = await getAllOrderProducts();

  return (
    <ProductsTable products={products.rows} orderProducts={orderProducts.rows} />
  );
};

export default page;