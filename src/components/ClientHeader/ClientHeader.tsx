'use client'

import React, { useEffect, useState } from 'react';
import styles from './clientHeader.module.css'
import Link from 'next/link';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';
import menuIcon from '../../../public/mobile/Menu.svg'
import Image from 'next/image';
import MobileHeaderMenuElement from '../MobileHeaderMenuElement/MobileHeaderMenuElement';
import catalogIcon from '../../../public/mobile/Menu open in menu.svg'
import contacts from '../../../public/mobile/Email.svg'
import orders from '../../../public/mobile/History.svg'
import products from '../../../public/mobile/Attach money.svg'
import comments from '../../../public/mobile/Question answer.svg'
import questions from '../../../public/mobile/Info.svg'
import SerachMobile from '../Search/SerachMobile';
import MobileMenuElement from '../MobileMenuElement/MobileMenuElement';
import home from '../../../public/mobile/Home.svg'
import catalog from '../../../public/mobile/Menu open.svg'
import favorite from '../../../public/mobile/Favorite.svg'
import cart from '../../../public/mobile/Shopping cart.svg'
import profile from '../../../public/mobile/Person.svg'
import login from '../../../public/mobile/Login.svg'
import homeActive from '../../../public/mobile/Home active.svg'
import catalogActive from '../../../public/mobile/Menu open active.svg'
import favoriteActive from '../../../public/mobile/Favorite active.svg'
import cartActive from '../../../public/mobile/Shopping cart active.svg'
import profileActive from '../../../public/mobile/Person active.svg'
import loginActivate from '../../../public/mobile/Login active.svg'
import { useLogoutMutation } from '@/hooks/auth/useLogoutMutation';
import { LocalStorageService } from '@/lib/helpers/localStorageService';
import { useRouter } from 'next/navigation';


const ClientHeader = () => {
  const person = usePersonContext();
  const [isLogedIn, setIsLoggedIn] = useState(false);
  const [personRole, setPersonRole] = useState("PERSON");
  const [isMenu, setIsMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!person.id);
    setPersonRole(person.id == '1' ? "ADMIN" : "PERSON")
  }, [person]);

  const onSuccess = () => {
    router.push('/authorization/login');
  }

  const onError = () => {

  }

  const { logout } = useLogoutMutation({ onSuccess, onError });

  const onMenuClick = () => {
    setIsMenu(!isMenu);
  }

  const onExitClick = async () => {
    setIsMenu(!isMenu);
    await logout();
    LocalStorageService.clear();
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftBlock}>
          <Link className={styles.logo} href={'/'}>NINA</Link>
          <Link className={styles.text} href={'/catalog'}>каталог</Link>
          <Link className={styles.phoneText} href={'tel:+79028706740'}>+7 (902) 870-67-40</Link>
          {/* <Search /> */}
        </div>
        <div className={styles.rightBlock}>
          <Link className={styles.icon} href={'/favorite'}>Избраное</Link>
          <Link className={styles.icon} href={'/basket'}>Корзина</Link>
          {isLogedIn && <Link className={styles.icon} href={'/profile/settings'}>Профиль</Link>}
          {!isLogedIn && <Link className={styles.icon} href={'/signin'}>Войти</Link>}
          {personRole == 'ADMIN' && <Link className={styles.icon} href={'/admin/products'}>Панель</Link>}
        </div>
      </div>

      <div className={styles.headerMobilePlace}></div>

      <div className={styles.headerMobile}>
        <button
          className={styles.menuButton}
          onClick={onMenuClick}
        >
          <Image
            src={menuIcon}
            alt={''}
            width={32}
            height={32}
          />
        </button>
        <SerachMobile />
      </div>

      <div className={isMenu ? styles.menu : styles.menuNone}>
        <MobileHeaderMenuElement icon={catalogIcon} text='Каталог' to='/catalog' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={contacts} text='Контакты' to='/profile/contacts' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={orders} text='История заказов' to='/profile/orders' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={products} text='Купленные товары' to='/profile/products' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={comments} text='Ваши комментарии' to='/profile/comments' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={questions} text='Популярные вопросы' to='/profile/about' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={questions} text='Выйти' to='/authorization/login' onClick={onExitClick} />
      </div>

      <div className={styles.mobileMenu}>
        <MobileMenuElement icon={home} activeIcon={homeActive} text='Главная' to='/' />
        <MobileMenuElement icon={catalog} activeIcon={catalogActive} text='Каталог' to='/catalog' />
        <MobileMenuElement icon={favorite} activeIcon={favoriteActive} text='Избранное' to='/favorite' />
        <MobileMenuElement icon={cart} activeIcon={cartActive} text='Корзина' to='/basket' />
        {isLogedIn && <MobileMenuElement icon={profile} activeIcon={profileActive} text='Профиль' to='/profile/settings' />}
        {!isLogedIn && <MobileMenuElement icon={login} activeIcon={loginActivate} text='Войти' to='/authorization/login' />}
      </div>
    </>
  );
};

export default ClientHeader;