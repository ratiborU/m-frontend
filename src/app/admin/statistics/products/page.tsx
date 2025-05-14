import { getAllOrderProducts } from '@/services/api/orderProducts/orderProductService';
import { getAllProducts } from '@/services/api/products/productService';
import ProductsStatistics from '@/widjets/statisticPages/products/ProductsStatistics';
import React from 'react';

const page = async () => {
  const orderProducts = await getAllOrderProducts();
  const products = await getAllProducts();
  const productKeys = products?.rows.reduce((acc: any, cur) => {
    acc[cur.name] = 0;
    return acc;
  }, {})
  console.log(productKeys)
  return (
    <>
      <ProductsStatistics orderProducts={orderProducts.rows} productKeys={productKeys} />
    </>
  );
};

export default page;