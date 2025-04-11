'use client'
import { useQuery } from "@tanstack/react-query";
import { checkOneCoupon } from "@/services/api/coupons/couponService";

export const useGetCheckOneCouponQuery = (value: string) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await checkOneCoupon(value),
    queryKey: ['coupons', 'check', value],
    staleTime: 0,
  });

  return { data, isFetching, error };
};

