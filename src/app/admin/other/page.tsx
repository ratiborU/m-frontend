import React from 'react';
import Link from 'next/link';
import styles from './page.module.css'

const page = () => {
  return (
    <div className={styles.links}>
      <Link href={'/admin/other/categories'} style={{ color: '#222222' }}>Категории</Link>
      <Link href={'/admin/other/coupons'} style={{ color: '#222222' }}>Купоны</Link>
      <Link href={'/admin/other/loyalty'} style={{ color: '#222222' }}>Программа лояльности</Link>
      {/* что-нибудь другое, в разработке... */}
    </div>
  );
};

export default page;