import React from 'react';
import styles from './header.module.css'
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link className={styles.activeLink} href={'/admin/products'}>Товары</Link>
                <Link className={styles.link} href={'/admin/orders'}>Заказы</Link>
                <Link className={styles.link} href={'/admin/persons'}>Пользователи</Link>
                <Link className={styles.link} href={'/admin/comments'}>Комментарии</Link>
                
                <Link className={styles.link} href={'/admin/products'}>Статистика</Link>
                <Link className={styles.link} href={'/admin/products'}>Другое</Link>
                <Link className={styles.link} href={'/'}>Сайт</Link>
            </nav>
        </header>
    );
};

export default Header;