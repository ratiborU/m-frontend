'use client'
import React from 'react';
import Product from '@/components/Product/Product';
import styles from './popularProducts.module.css'
import Title from '@/components/Title/Tile';
import { TPagination } from '@/services/types/paginationType';
import { TProduct } from '@/services/api/products/productType';

type PopularProductsProps = {
  products: TPagination<TProduct>
}

const PopularProducts = (props: PopularProductsProps) => {
  const { products } = props
  // const products = await getAllProducts();
  return (
    <>
      <Title text='Популярные товары' />
      <div className={styles.products}>
        {...products.rows.sort((a, b) => Number(b.commentsCount) - Number(a.commentsCount)).slice(0, 5).map(x => <Product key={`popular product ${x.id}`} {...x} />)}
      </div>
    </>

  );
};

export default PopularProducts;