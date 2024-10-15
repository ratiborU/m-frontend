'use client'
import React from 'react';
import styles from './header.module.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// в lib/helpers
const isActive = (path: string, currentPath: string) => {
    if (currentPath.split('/')[2] === path) {
        return styles.activeLink
    }
    return styles.link
}

const Header = () => {
    const pathName = usePathname();
    // console.log(isActive('products', pathName));
    return (
        <header className={styles.header}>
            {/* <nav className={styles.nav}>
                <Link className={styles.activeLink} href={'/admin/products'}>Товары</Link>
                <Link className={styles.link} href={'/admin/orders'}>Заказы</Link>
                <Link className={styles.link} href={'/admin/persons'}>Пользователи</Link>
                <Link className={styles.link} href={'/admin/comments'}>Комментарии</Link>
                
                <Link className={styles.link} href={'/admin/products'}>Статистика</Link>
                <Link className={styles.link} href={'/admin/products'}>Другое</Link>
                <Link className={styles.link} href={'/'}>Сайт</Link>
            </nav> */}
            <nav className={styles.nav}>
                <Link className={isActive('products', pathName)} href={'/admin/products'}>Товары</Link>
                <Link className={isActive('orders', pathName)} href={'/admin/orders'}>Заказы</Link>
                <Link className={isActive('persons', pathName)} href={'/admin/persons'}>Пользователи</Link>
                <Link className={isActive('comments', pathName)} href={'/admin/comments'}>Комментарии</Link>
                
                <Link className={isActive('statistics', pathName)} href={'/admin/statistics'}>Статистика</Link>
                <Link className={isActive('other', pathName)} href={'/admin/other'}>Другое</Link>
                <Link className={styles.link} href={'/'}>Сайт</Link>
            </nav>
        </header>
    );
};

export default Header;