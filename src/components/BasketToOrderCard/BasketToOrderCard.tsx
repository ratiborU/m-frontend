'use client'
import React, { useEffect, useState } from 'react';
import styles from './basketToOrderCard.module.css'
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import Button from '../UI/Button/Button';
import Link from 'next/link';
import NameAndProperty from '../UI/NameAndProperty/NameAndProperty';
import { productDiscounts } from '@/services/api/products/productDiscountSistem';
import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';
import { useOrderSetterContext } from '@/providers/OrderProvider/hooks/useOrderSetterContext';

type BasketToOrderCardProps = {
  // total: number,
  // discount: number,
  products: TBasketProduct[],
}

const BasketToOrderCard = (props: BasketToOrderCardProps) => {
  const { products } = props;

  const total = products.reduce((acc, cur) => acc + Number(cur.count) * Number(cur.product.price), 0)
  const [curentDiscountCount, setCurrentDiscountCount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);

  const order = useOrderContext();
  const setOrder = useOrderSetterContext();

  useEffect(() => {
    setOrder.setProductsCartCount(products.reduce((acc, cur) => acc + Number(cur.count), 0));
    setOrder.setDiscountPerPackage(productDiscounts.reduce((acc, cur) => order.productsCartCount >= cur[0] ? cur[1] : acc, 0));
    setCurrentDiscountCount(productDiscounts.reduce((acc, cur) => order.productsCartCount >= cur[0] ? cur[0] : acc, 0));
    setTotalWithDiscount(products.reduce((acc, cur) => acc + Number(cur.count) * (Number(cur.product.price) - Number(cur.product.discount) - order.discountPerPackage), 0))
  }, [products, setOrder, order.discountPerPackage, order.productsCartCount]);

  return (
    <div className={styles.basketToOrderCard}>
      <div className={styles.title}>
        <p className={styles.titleText}>К оплате</p>
        <p className={styles.titleText}>{totalWithDiscount} ₽</p>
      </div>
      <p className={styles.beforeDiscount}>{total != totalWithDiscount ? `${total} ₽` : ''}</p>
      <div className={styles.products}>
        <NameAndProperty name={`Скидка на 1 от ${curentDiscountCount || '___'} шт.`} value={`${order.discountPerPackage} ₽`} size='l' />
        <NameAndProperty name='Товаров' value={`${order.productsCartCount} шт.`} size='l' />
        {...products.map(x => (
          <NameAndProperty
            key={`basket to order count product: ${x.id}`}
            name={`${x.product.name}`}
            value={`${x.count} шт.`}
            size='l'
          />
        ))}

      </div>
      <Link href={'/order'}>
        <Button text={'Перейти к оформлению'} size={'l'} buttonProps={{}} />
      </Link>

    </div>
  );
};

export default BasketToOrderCard;