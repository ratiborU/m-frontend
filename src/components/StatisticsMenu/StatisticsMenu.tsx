import React from 'react';
import styles from './statisticsMenu.module.css'
import Link from 'next/link';

const StatisticsMenu = () => {
  return (
    <div>
      <div className={styles.menu}>
        <h1 className={styles.title}>Статистика</h1>
        <div className={styles.menuListWithExit}>
          <div className={styles.menuList}>
            <Link className={styles.link} href={'/admin/statistics/general'}>Общие продажи</Link>
            <Link className={styles.link} href={'/admin/statistics/products'}>Товары</Link>
            {/* <Link className={styles.link} href={'/admin/statistics/persons'}>Пользователи</Link>
            <Link className={styles.link} href={'/admin/statistics/comments'}>Отзывы</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsMenu;