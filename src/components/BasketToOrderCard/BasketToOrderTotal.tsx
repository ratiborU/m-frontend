"use client"
import React, { useEffect, useState } from 'react';
import styles from './basketToOrderCard.module.css'
import Button from '../UI/Button/Button';
import Link from 'next/link';
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';
import { useOrderSetterContext } from '@/providers/OrderProvider/hooks/useOrderSetterContext';
import { productDiscounts } from '@/services/api/products/productDiscountSistem';

type BasketToOrderCardProps = {
  products: TBasketProduct[]
  // discount: number,
  // products: TBasketProduct[],
  // loyalty: TLoyalty,
}

const BasketToOrderTotal = (props: BasketToOrderCardProps) => {
  const { products } = props;

  const total = products.reduce((acc, cur) => acc + Number(cur.count) * Number(cur.product.price), 0)
  const [curentDiscountCount, setCurrentDiscountCount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  // const [loyaltyCount, setLoyaltyCount] = useState(0);

  const order = useOrderContext();
  const setOrder = useOrderSetterContext();

  useEffect(() => {
    console.log(products);
    setOrder.setProductsCartCount(products.reduce((acc, cur) => acc + Number(cur.count), 0));
    setOrder.setDiscountPerPackage(productDiscounts.reduce((acc, cur) => order.productsCartCount >= cur[0] ? cur[1] : acc, 0));
    setCurrentDiscountCount(productDiscounts.reduce((acc, cur) => order.productsCartCount >= cur[0] ? cur[0] : acc, 0));
    setTotalWithDiscount(products.reduce((acc, cur) => acc + Number(cur.count) * (Number(cur.product.price) - Number(cur.product.discount) - order.discountPerPackage), 0))
    // setLoyaltyCount(Math.floor(products.reduce((acc, cur) => acc + Number(cur.count) * (Number(cur.product.price) - Number(cur.product.discount) - order.discountPerPackage), 0) * Number(loyalty.cashback) / 100));
  }, [products, setOrder, order.discountPerPackage, order.productsCartCount]);

  return (
    <div className={styles.basketTotalMobile}>
      <div className={styles.totalBlock}>
        <p className={styles.basketTotalMobileTitle}>Итог {totalWithDiscount} ₽</p>
        <p className={styles.totalWithoutDiscount}>{total} ₽</p>
      </div>
      {/* <p>sd</p> */}
      <Link href={'/order'}>
        <Button text={'Перейти к оформлению'} size={'m'} />
      </Link>

    </div>
  );
};

export default BasketToOrderTotal;