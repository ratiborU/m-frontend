import React from 'react';
import BasketProduct from '@/components/BasketProduct/BasketProduct';
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import styles from './basket.module.css'
import BasketToOrderCard from '@/components/BasketToOrderCard/BasketToOrderCard';

type BasketProps = {
  products: TBasketProduct[];
}

const Basket = (props: BasketProps) => {
  const { products } = props;
  return (
    <>
      <div className={styles.basket}>
        <div className={styles.basketProducts}>
          {...products.map((x, i) => (
            <BasketProduct
              key={`basket asdasdproduct: ${i}`}
              {...x}
            />
          ))}
        </div>
        <BasketToOrderCard products={products} />
      </div>

    </>
  );
};

export default Basket;