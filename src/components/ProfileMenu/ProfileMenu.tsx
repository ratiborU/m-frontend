'use client'

import React from 'react';
import styles from './profileMenu.module.css'
import Link from 'next/link';
import { logout } from '@/services/api/auth/authorizationService';
import { LocalStorageService } from '@/lib/helpers/localStorageService';

const ProfileMenu = () => {

  const onExitClick = async () => {
    await logout();
    LocalStorageService.clear();
  }

  return (
    <div className={styles.menu}>
      <h1 className={styles.title}>Профиль</h1>
      <div className={styles.menuListWithExit}>
        <div className={styles.menuList}>
          <Link className={styles.link} href={'/profile/settings'}>Личные данные</Link>
          <Link className={styles.link} href={'/profile/orders'}>История заказов</Link>
          <Link className={styles.link} href={'/profile/comments'}>Ваши комментарии</Link>
          <Link className={styles.link} href={'/profile/products'}>Купленные товары</Link>
          {/* <Link className={styles.link} href={'/profile/cupouns'}>Ваши купоны</Link> */}
          <Link className={styles.link} href={'/profile/conf'}>Политика конфиденциальности</Link>
          <Link className={styles.link} href={'/profile/data'}>Политика обработки персональных данных</Link>
          <Link className={styles.link} href={'/profile/return'}>Возврат товара</Link>
          <Link className={styles.link} href={'/profile/contacts'}>Контакты</Link>
          <Link className={styles.link} href={'/profile/about'}>О нас</Link>
        </div>
        <Link onClick={() => onExitClick()} className={styles.link} href={'/login'}>Выйти</Link>
      </div>

    </div>
  );
};

export default ProfileMenu;