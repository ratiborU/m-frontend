import React from 'react';
import styles from './productCard.module.css'
// import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
// import Button from '../UI/Button/Button';
// import Link from 'next/link';
import { TProduct } from '@/services/api/products/productType';
import FavoriteButton from '../UI/FavoriteButton/FavoriteButton';
import NameAndProperty from '../UI/NameAndProperty/NameAndProperty';
import CartButton from '../UI/CartButton/CartButton';
import FavoriteButtonProductPage from '../UI/FavoriteButton/FavoriteButtonProductPage';

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
    <>
      <div className={styles.productCard}>
        <div className={styles.title}>
          <div className={styles.titleAndDiscount}>
            <p className={styles.titleText}>{Number(product.price) - Number(product.discount)} ₽</p>
            <p className={styles.titleTextDiscount}>{product.discount != '0' ? `${product.price} ₽` : ''}</p>
          </div>
          <FavoriteButton product={product} />
        </div>
        <div className={styles.properties}>
          {...Object.entries(product.categoryCharacteristics).map(x => (<>
            <NameAndProperty name={x[0]} value={x[1]} />
          </>))}
        </div>
        <CartButton text={'Добавить в корзину'} size={'l'} product={product} />
      </div>
      <div className={styles.productCardMobile}>
        <div className={styles.favoriteButton}>
          <FavoriteButtonProductPage product={product} />
        </div>
        <div className={styles.addButton}>
          <CartButton text={'Добавить в корзину'} size={'l'} product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;