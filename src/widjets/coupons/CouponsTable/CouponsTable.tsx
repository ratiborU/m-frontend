import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { productColumns } from './columns';
// import { getAllComments } from '@/services/api/comments/commentService';
import { getAllCoupons } from '@/services/api/coupons/couponService';

const CouponsTable = async () => {
  const coupons = await getAllCoupons();

  return (
    <div>
      <BaseGrid columns={productColumns} data={coupons} />
    </div>
  );
};

export default CouponsTable;