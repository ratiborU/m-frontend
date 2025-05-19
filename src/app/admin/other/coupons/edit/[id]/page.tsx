import React from 'react';
import EditCoupon from '@/widjets/coupons/EditCoupon/EditCoupon';
import { getOneCoupon } from '@/services/api/coupons/couponService';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const coupon = await getOneCoupon(id);

  return (
    <div>
      <EditCoupon coupon={coupon} />
    </div>
  );
};

export default page;