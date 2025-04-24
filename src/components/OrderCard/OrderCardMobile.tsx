import React from 'react';
import styles from './orderCard.module.css'
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import Button from '../UI/Button/Button';
import { TCoupon } from '@/services/api/coupons/couponType';
import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';
import NameAndProperty from '../UI/NameAndProperty/NameAndProperty';

type OrderCardMobileProps = {
  products?: TBasketProduct[],
  coupon?: TCoupon,
}

const OrderCardMobile = (props: OrderCardMobileProps) => {
  const { products = [], coupon } = props;
  const order = useOrderContext();

  const total = products.reduce((acc, cur) => acc + Number(cur.count) * Number(cur.product.price), 0)
  const totalProductsDiscount = products.reduce((acc, cur) => acc + Number(cur.count) * (Number(cur.product.price) - Number(cur.product.discount)), 0);
  const totalWithDiscount = !coupon
    ? totalProductsDiscount
    : coupon.discount.at(-1) !== '%'
      ? totalProductsDiscount - Number(coupon.discount)
      : totalProductsDiscount * (1 - Number(coupon.discount.slice(0, coupon.discount.length - 1)) / 100)
  const totalCount = products.reduce((acc, cur) => acc + Number(cur.count), 0)

  const totalWithDiscountProducts = totalWithDiscount - order.discountPerPackage * order.productsCartCount;

  return (
    <div className={styles.orderCardMobile}>
      <div className={styles.orderCardMobileTitleBlock}>
        <p className={styles.orderCardMobileTitleText}>К оплате</p>
        <p className={styles.orderCardMobileTitleText}>{totalWithDiscountProducts} ₽</p>
      </div>
      {total - totalWithDiscountProducts >= 0 && <p className={styles.orderCardMobileOldPrice}>{total} ₽</p>}

      <div className={styles.mobileProducts}>
        <NameAndProperty name={`Товаров ${totalCount} шт`} value={`${totalWithDiscountProducts} ₽`} size='s' />
        {...products.map(x => (
          <NameAndProperty key={`order mobile product key: ${x.id}`} name={`${x.product.name}, ${x.count} шт`} value={`${(Number(x.product.price) - Number(x.product.discount) - order.discountPerPackage) * Number(x.count)} ₽`} size='s' />
        ))}
      </div>
      <Button text='Перейти к оплате' size='m' />
    </div>
  );
};

export default OrderCardMobile;