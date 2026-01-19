'use client'
// import React from 'react';
import MobileHeaderMenuElement from '../MobileHeaderMenuElement/MobileHeaderMenuElement';
import styles from './header.module.css'
import React, { useEffect, useState } from 'react';
// import styles from './clientHeader.module.css'
// import Link from 'next/link';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';
import menuIcon from '../../../public/mobile/Menu.svg'
import Image from 'next/image';
// import MobileHeaderMenuElement from '../MobileHeaderMenuElement/MobileHeaderMenuElement';
import catalogIcon from '../../../public/mobile/Menu open in menu.svg'
import contacts from '../../../public/mobile/Email.svg'
import orders from '../../../public/mobile/History.svg'
import products from '../../../public/mobile/Attach money.svg'
import comments from '../../../public/mobile/Question answer.svg'
import questions from '../../../public/mobile/Info.svg'
// import SerachMobile from '../Search/SerachMobile';
// import MobileMenuElement from '../MobileMenuElement/MobileMenuElement';
// import home from '../../../public/mobile/Home.svg'
// import catalog from '../../../public/mobile/Menu open.svg'
// import favorite from '../../../public/mobile/Favorite.svg'
// import cart from '../../../public/mobile/Shopping cart.svg'
// import profile from '../../../public/mobile/Person.svg'
// import login from '../../../public/mobile/Login.svg'
// import homeActive from '../../../public/mobile/Home active.svg'
// import catalogActive from '../../../public/mobile/Menu open active.svg'
// import favoriteActive from '../../../public/mobile/Favorite active.svg'
// import cartActive from '../../../public/mobile/Shopping cart active.svg'
// import profileActive from '../../../public/mobile/Person active.svg'
// import loginActivate from '../../../public/mobile/Login active.svg'
import { useLogoutMutation } from '@/hooks/auth/useLogoutMutation';
import { LocalStorageService } from '@/lib/helpers/localStorageService';
import { useRouter } from 'next/navigation';

const MobileHeaderAdmin = () => {
  const person = usePersonContext();
  // const [isLogedIn, setIsLoggedIn] = useState(false);
  // const [personRole, setPersonRole] = useState("PERSON");
  const [isMenu, setIsMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // setIsLoggedIn(!!person.id);
    // setPersonRole(person.id == '1' ? "ADMIN" : "PERSON")
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
    <div className={styles.headerMobileBlock}>
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
        <p className={styles.textMobile}>Панель администратора</p>
        {/* <SerachMobile /> */}
      </div>

      <div className={isMenu ? styles.menu : styles.menuNone}>
        <MobileHeaderMenuElement icon={catalogIcon} text='Товары' to='/admin/products' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={contacts} text='Заказы' to='/admin/orders' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={orders} text='Пользователи' to='/admin/persons' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={products} text='Комментарии' to='/admin/comments' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={comments} text='Статистика' to='/admin/statistics/general' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={questions} text='Категории' to='/admin/other/categories' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={questions} text='Другое' to='/admin/other' onClick={onMenuClick} />
        <MobileHeaderMenuElement icon={questions} text='Сайт' to='/catalog' onClick={onExitClick} />
      </div>
    </div>
  );
};

export default MobileHeaderAdmin;