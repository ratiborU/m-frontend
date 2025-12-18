'use client'
import React from 'react';
import Product from '@/components/Product/Product';
import styles from './fourProductsBlock.module.css'
import Title from '@/components/Title/Tile';
import { TPagination } from '@/services/types/paginationType';
import { TProduct } from '@/services/api/products/productType';
// import Title from '@/components/UI/Title/Title';
import ProductNew from '@/components/Product/ProductNew';

type FourProductsBlockProps = {
  title: string,
  products: TProduct[]
}

const FourProductsBlock = (props: FourProductsBlockProps) => {
  const { title, products } = props
  
  return (
    <>
      {/* <Title text={title} margin={false} /> */}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.products}>
        {
          ...products
            .slice(0, 4)
            .map(x => (
              <ProductNew key={`popular product ${x.id}`} {...x} />
            ))
        }
      </div>
    </>

  );
};

export default FourProductsBlock;