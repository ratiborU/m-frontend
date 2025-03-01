import React from 'react';
import styles from './clientHeader.module.css'
import Search from '../Search/Search';
import Link from 'next/link';

const ClientHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.leftBlock}>
        <Link className={styles.logo} href={'/'}>Mircos</Link>
        <Link className={styles.text} href={'/catalog'}>каталог</Link>
        <Search />
      </div>
      <div className={styles.rightBlock}>
        <Link className={styles.icon} href={'/authorization/login'}>Избраное</Link>
        <Link className={styles.icon} href={'/admin/products'}>Корзина</Link>
        <Link className={styles.icon} href={'/authorization/login'}>Профиль</Link>
      </div>
    </div>
  );
};

export default ClientHeader;