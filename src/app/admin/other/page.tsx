import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <div>
      <Link href={'/admin/other/categories'} >Категории</Link>
      <Link href={'/admin/other/coupons'} >Купоны</Link>
      <Link href={'/admin/other/loyalty'} >Программа лояльности</Link>
      {/* что-нибудь другое, в разработке... */}
    </div>
  );
};

export default page;