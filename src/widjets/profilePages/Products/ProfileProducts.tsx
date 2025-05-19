import React from 'react';
import { THistoryProduct } from '@/services/api/historyProducts/historyProductType';
import Product from '@/components/Product/Product';
import styles from './prodileProducts.module.css'

type ProfileProductsPrps = {
  products: THistoryProduct[],
}

const ProfileProducts = (props: ProfileProductsPrps) => {
  const { products } = props;
  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Купленные товары</h1>
      <div className={styles.products}>
        {...products.map(x => <Product key={`history product key: ${x.id}`} {...x.product} />)}
      </div>
    </div>

  );
};

export default ProfileProducts;