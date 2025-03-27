'use client'
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import React from 'react';
import styles from './basketProduct.module.css';
import Image from 'next/image';
import CheckBox from '../UI/CheckBox/CheckBox';
import OrderCartButton from '../UI/OrderCartButton/OrderCartButton';


const BasketProduct = (props: TBasketProduct) => {
  const { product } = props;

  return (
    <>
      <div className={styles.block}>
        <Image className={styles.image} src={`http://localhost:5000/${product?.mainImage}` || ''} alt={''} width={180} height={180} />
        <div className={styles.information}>
          <p className={styles.name}>{product?.name}</p>
          <p className={styles.description}>{product?.description}</p>
          <p className={styles.price}>{product?.price} ₽</p>
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