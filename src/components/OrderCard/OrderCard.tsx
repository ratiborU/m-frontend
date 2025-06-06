import React from 'react';
import styles from './orderCard.module.css'
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import Button from '../UI/Button/Button';
import { TCoupon } from '@/services/api/coupons/couponType';
import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';
import { useGetLoyaltyQuery } from '@/hooks/loyalty/useGetLoyaltyQuery';
// import Link from 'next/link';
// import { useCreateOrderMutation } from '@/hooks/orders/useCreateOrderMutation';


type BasketToOrderCardProps = {
  // total: number,
  // discount: number,
  products: TBasketProduct[],
  coupon?: TCoupon,
  isLoyalty?: boolean,
}

const OrderCard = (props: BasketToOrderCardProps) => {
  const { products, coupon, isLoyalty = false } = props;
  const order = useOrderContext();
  const { data } = useGetLoyaltyQuery();

  const total = products.reduce((acc, cur) => acc + Number(cur.count) * Number(cur.product.price), 0)
  const totalProductsDiscount = products.reduce((acc, cur) => acc + Number(cur.count) * (Number(cur.product.price) - Number(cur.product.discount)), 0);
  const totalWithDiscount = !coupon
    ? totalProductsDiscount
    : coupon.discount.at(-1) !== '%'
      ? totalProductsDiscount - Number(coupon.discount)
      : totalProductsDiscount * (1 - Number(coupon.discount.slice(0, coupon.discount.length - 1)) / 100)
  const totalCount = products.reduce((acc, cur) => acc + Number(cur.count), 0)
  const totalWithDiscountProducts = totalWithDiscount - order.discountPerPackage * order.productsCartCount;

  const loyaltyPayCount = isLoyalty ? Math.min(Number(data?.points), Math.floor(totalWithDiscountProducts * 0.3)) : 0;
  const loyaltyGetCount = Math.floor((totalWithDiscountProducts - loyaltyPayCount) * Number(data?.cashback) / 100);



  return (
    <div className={styles.basketToOrderCard}>
      <div className={styles.title}>
        <p className={styles.titleText}>К оплате</p>
        <p className={styles.titleText}>{totalWithDiscountProducts - loyaltyPayCount} ₽</p>
      </div>
      <p className={styles.beforeDiscount}>{total} ₽</p>
      <div className={styles.products}>
        {coupon && <div className={styles.product}>
          <p className={styles.text}>Скидка {coupon.discount} по {coupon.value}</p>
        </div>}
        {
          isLoyalty && <div className={styles.product}>
            <p className={styles.text}>Спишется баллов</p>
            <p className={styles.text}>{loyaltyPayCount} б</p>
          </div>
        }
        <div className={styles.product}>
          <p className={styles.text}>Вам начислится</p>
          <p className={styles.text}>{loyaltyGetCount} б</p>
        </div>
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