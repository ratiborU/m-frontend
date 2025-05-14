'use client'
import React from 'react';
import Product from '@/components/Product/Product';
import styles from './specialOfferProducts.module.css'
import Title from '@/components/Title/Tile';
import { TPagination } from '@/services/types/paginationType';
import { TProduct } from '@/services/api/products/productType';

type PopularProductsProps = {
  products: TProduct[]
}

const SpecialOfferProducts = (props: PopularProductsProps) => {
  const { products } = props
  // const products = await getAllProducts();
  return (
    <>
      <Title text='Специальные предложения для вас' margin={false} />
      <div className={styles.products}>
        {...products.slice(0, 4).map(x => <Product key={`popular product ${x.id}`} {...x} />)}
      </div>
    </>

  );
};

export default SpecialOfferProducts;