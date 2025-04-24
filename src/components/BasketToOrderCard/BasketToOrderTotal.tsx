import React from 'react';
import styles from './basketToOrderCard.module.css'
import Button from '../UI/Button/Button';
import Link from 'next/link';

const BasketToOrderTotal = () => {
  return (
    <div className={styles.basketTotalMobile}>
      <p className={styles.basketTotalMobileTitle}>Итог 4000 Р</p>
      <Link href={'/order'}>
        <Button text={'Оформить заказ'} size={'m'} />
      </Link>

    </div>
  );
};

export default BasketToOrderTotal;