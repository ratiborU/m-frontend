'use client'
import React, { useEffect, useState } from 'react';
import home from '../../../public/mobile/Home.svg'
import homeActive from '../../../public/mobile/Home active.svg'
import styles from './mobileMenuElement.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MobileMenuElementProps = {
  icon?: string,
  activeIcon?: string,
  text?: string,
  to?: string
}

const MobileMenuElement = (props: MobileMenuElementProps) => {
  const { icon = home, activeIcon = homeActive, text = 'Главная', to = '/' } = props;
  const [isActive, setIsActive] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsActive(pathName == to)
  }, [pathName, to])

  return (
    <Link className={styles.button} href={to}>
      {!isActive && <Image className={styles.image} src={icon} alt={''} width={32} height={32} />}
      {isActive && <Image className={styles.image} src={activeIcon} alt={''} width={32} height={32} />}
      {/* <p className={isActive ? styles.textActive : styles.text}>{text}</p> */}
    </Link>
  );
};

export default MobileMenuElement;