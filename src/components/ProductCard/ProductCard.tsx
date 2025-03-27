import React from 'react';
import styles from './productCard.module.css'
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import Button from '../UI/Button/Button';
import Link from 'next/link';
import { TProduct } from '@/services/api/products/productType';
import FavoriteButton from '../UI/FavoriteButton/FavoriteButton';
import NameAndProperty from '../UI/NameAndProperty/NameAndProperty';
import CartButton from '../UI/CartButton/CartButton';

type ProductCardProps = {
  // total: number,
  // discount: number,
  product: TProduct,
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  // const total = products.reduce((acc, cur) => acc + Number(cur.count) * Number(cur.product.price), 0)
  // const totalWithDiscount = products.reduce((acc, cur) => acc + Number(cur.count) * (Number(cur.product.price) - Number(cur.product.discount)), 0)
  // const totalCount = products.reduce((acc, cur) => acc + Number(cur.count), 0)

  return (
    <div className={styles.productCard}>
      <div className={styles.title}>
        <p className={styles.titleText}>{product.price} ₽</p>
        <FavoriteButton product={product} />
      </div>
      <div className={styles.properties}>
        <NameAndProperty name={'Камень'} value={'Гороскоп'} />
        <NameAndProperty name={'Размер'} value={'Средний'} />
        <NameAndProperty name={'Материал'} value={'Сталь'} />
        <NameAndProperty name={'Крепление'} value={'Завальцованные'} />
        <NameAndProperty name={'Количество'} value={'12 шт.'} />

      </div>
      {/* <Link href={'/order'}> */}
      <CartButton text={'Добавить в корзину'} size={'l'} product={product} />
      {/* <Button text={'Добавить в корзину'} size={'l'} buttonProps={{}} /> */}
      {/* </Link> */}

    </div>
  );
};

export default ProductCard;