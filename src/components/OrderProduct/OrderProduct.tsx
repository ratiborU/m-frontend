import React from 'react';
import styles from './orderProduct.module.css'
import { TProduct } from '@/services/api/products/productType';

type OrderProductProps = {
  product: TProduct,
  count: number
}

const OrderProduct = (props: OrderProductProps) => {
  const { product, count } = props;
  return (
    <div className={styles.block}>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.count}>{count}</div>
    </div>
  );
};

export default OrderProduct;