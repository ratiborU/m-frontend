import React from 'react';
import defaultIcon from '../../../public/mobile/File.svg'
import styles from './mobileHeaderMenuElement.module.css'
import Image from 'next/image';
import Link from 'next/link';

type MobileHeaderMenuElementProps = {
  icon?: string,
  text?: string,
  to?: string,
  onClick?: () => void
}

const MobileHeaderMenuElement = (props: MobileHeaderMenuElementProps) => {
  const { icon = defaultIcon, text = 'Перейти', to = '/', onClick = () => { } } = props;

  return (
    <Link className={styles.link} href={to} onClick={onClick} >
      <Image className={styles.image} src={icon} alt={''} />
      <p className={styles.text}>{text}</p>
    </Link>
  );
};

export default MobileHeaderMenuElement;