'use client'
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import React from 'react';
import styles from './basketProduct.module.css';
import Image from 'next/image';
// import CheckBox from '../UI/CheckBox/CheckBox';
import OrderCartButton from '../UI/OrderCartButton/OrderCartButton';
import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';
import Link from 'next/link';


const BasketProduct = (props: TBasketProduct) => {
  const { product } = props;
  const order = useOrderContext();

  return (
    <>
      <div className={styles.block}>
        <Link href={`/product/${product.id}`}>
          <Image className={styles.image} src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/${product?.mainImage}` || ''} alt={''} width={180} height={180} />
        </Link>
        {/* <Image className={styles.image} src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/${product?.mainImage}` || ''} alt={''} width={180} height={180} /> */}
        <div className={styles.information}>
          <Link href={`/product/${product.id}`}>
            <p className={styles.name}>{product?.name}</p>
          </Link>

          <p className={styles.description}>Продукта в наличии {product?.productsCount} шт.</p>
          <div className={styles.prices}>
            <p className={styles.price}>{Number(product.price) - Number(product.discount) - order.discountPerPackage} ₽</p>
            <p className={styles.oldPrice}>{product.discount + order.discountPerPackage != '0' ? `${product.price} ₽` : ''}</p>
          </div>

          <div className={styles.orderButtons}>
            <OrderCartButton key={`order cart button key: ${product.id}`} {...props} />
          </div>
        </div>
        {/* <div className={styles.checkBox}>
          <CheckBox key={`order cart button key: ${product.id}`} />
        </div> */}
      </div>
    </>
  );
};

export default BasketProduct;