import React from 'react';
import styles from './clientHeader.module.css'
import Search from '../Search/Search';
import Link from 'next/link';
import { cookies } from 'next/headers';

const ClientHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.leftBlock}>
        <Link className={styles.logo} href={'/'}>Mircos</Link>
        <Link className={styles.text} href={'/catalog'}>каталог</Link>
        {/* <Search /> */}
      </div>
      <div className={styles.rightBlock}>
        <Link className={styles.icon} href={'/favorite'}>Избраное</Link>
        <Link className={styles.icon} href={'/basket'}>Корзина</Link>
        <Link className={styles.icon} href={'/profile'}>Профиль</Link>
        {
          cookies().get('personId')?.value == '1' &&
          <Link className={styles.icon} href={'/admin/products'}>Панель</Link>
        }
      </div>
    </div>
  );
};

export default ClientHeader;