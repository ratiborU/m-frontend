'use client'

import React, { useEffect, useState } from 'react';
import styles from './clientHeader.module.css'
import Link from 'next/link';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';
// import { cookies } from 'next/headers';

const ClientHeader = () => {
  const person = usePersonContext();
  const [isLogedIn, setIsLoggedIn] = useState(false);
  const [personRole, setPersonRole] = useState("PERSON");
  // const isLogedIn = !!person.id;

  useEffect(() => {
    setIsLoggedIn(!!person.id);
    setPersonRole(person.id == '1' ? "ADMIN" : "PERSON")
  }, [person.id]);

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
        {isLogedIn && <Link className={styles.icon} href={'/profile/settings'}>Профиль</Link>}
        {!isLogedIn && <Link className={styles.icon} href={'/authorization/registration'}>Войти</Link>}
        {personRole == 'ADMIN' && <Link className={styles.icon} href={'/admin/products'}>Панель</Link>}
      </div>
    </div>
  );
};

export default ClientHeader;