'use client'
import { useGetLoyaltyQuery } from '@/hooks/loyalty/useGetLoyaltyQuery';
import React from 'react';
import styles from './loyalityCart.module.css'
import NameAndProperty from '../UI/NameAndProperty/NameAndProperty';

const LoyalutyCart = () => {
  const { data: loyalty } = useGetLoyaltyQuery();
  return (
    <div className={styles.block}>
      <p className={styles.title}>Серебрянный уровень</p>
      <NameAndProperty name='Ваши баллы' value={loyalty?.points} size='s' />
      <NameAndProperty name='Кэшбек с покупки' value={loyalty?.cashback} size='s' />
      <NameAndProperty name='Прогресс' value={loyalty?.total} size='s' />
    </div>
  );
};

export default LoyalutyCart;