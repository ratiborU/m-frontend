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
  const { products, loyalty } = props;
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
          <BasketToOrderCard products={products} loyalty={loyalty} />
          <BasketToOrderTotal />
        </div>

      </div>


    </>
  );
};

export default Basket;