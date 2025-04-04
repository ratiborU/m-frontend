import React from 'react';
import styles from './orderCard.module.css'
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import Button from '../UI/Button/Button';
// import Link from 'next/link';
// import { useCreateOrderMutation } from '@/hooks/orders/useCreateOrderMutation';


type BasketToOrderCardProps = {
  // total: number,
  // discount: number,
  products: TBasketProduct[],
}

const OrderCard = (props: BasketToOrderCardProps) => {
  const { products } = props;
  const total = products.reduce((acc, cur) => acc + Number(cur.count) * Number(cur.product.price), 0)
  const totalWithDiscount = products.reduce((acc, cur) => acc + Number(cur.count) * (Number(cur.product.price) - Number(cur.product.discount)), 0)
  const totalCount = products.reduce((acc, cur) => acc + Number(cur.count), 0)

  return (
    <div className={styles.basketToOrderCard}>
      <div className={styles.title}>
        <p className={styles.titleText}>К оплате</p>
        <p className={styles.titleText}>{totalWithDiscount} ₽</p>
      </div>
      <p className={styles.beforeDiscount}>{total} ₽</p>
      <div className={styles.products}>
        <div className={styles.product}>
          <p className={styles.text}>Товаров</p>
          <p className={styles.text}>{totalCount} шт</p>
        </div>
        {...products.map(x => (
          <div key={`basket to order count product: ${x.id}`} className={styles.product}>
            <p className={styles.text}>{x.product.name}</p>
            <p className={styles.text}>{x.count} шт</p>
          </div>
        ))}

      </div>
      <Button
        text={'Перейти к покупке'}
        size={'l'}
        buttonProps={{
          type: 'submit'
        }}
      />

    </div>
  );
};

export default OrderCard;