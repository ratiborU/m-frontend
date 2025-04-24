import React from 'react';
import BasketProduct from '@/components/BasketProduct/BasketProduct';
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import styles from './basket.module.css'
import BasketToOrderCard from '@/components/BasketToOrderCard/BasketToOrderCard';
import Title from '@/components/Title/Tile';
import BasketToOrderTotal from '@/components/BasketToOrderCard/BasketToOrderTotal';

type BasketProps = {
  products: TBasketProduct[];
}

const Basket = (props: BasketProps) => {
  const { products } = props;
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.basketFlex}>
          <div className={styles.basket}>
            <Title text={'Корзина'} margin={false} marginTop={false} />
            <div className={styles.basketProducts}>
              {...products.map((x, i) => (
                <BasketProduct
                  key={`basket asdasdproduct: ${i}`}
                  {...x}
                />
              ))}
            </div>
          </div>
          <BasketToOrderCard products={products} />
          <BasketToOrderTotal />
        </div>

      </div>


    </>
  );
};

export default Basket;