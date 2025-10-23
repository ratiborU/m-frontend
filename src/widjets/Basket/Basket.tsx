import React from 'react';
import BasketProduct from '@/components/BasketProduct/BasketProduct';
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import styles from './basket.module.css'
import BasketToOrderCard from '@/components/BasketToOrderCard/BasketToOrderCard';
import Title from '@/components/Title/Tile';
import BasketToOrderTotal from '@/components/BasketToOrderCard/BasketToOrderTotal';
import { TLoyalty } from '@/services/api/loyalty/loyaltyType';

type BasketProps = {
  products: TBasketProduct[];
  loyalty: TLoyalty;
}

const Basket = (props: BasketProps) => {
  const { products } = props;
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.basketFlex}>
          <div className={styles.basket}>
            <div className={styles.title}>
              <Title text={'Корзина'} margin={false} marginTop={false} />
            </div>

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
          <BasketToOrderTotal products={products} />
        </div>

      </div>


    </>
  );
};

export default Basket;