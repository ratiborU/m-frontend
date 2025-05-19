'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCoupon as createCouponApi } from '@/services/api/coupons/couponService';
import { TCouponCreate } from '@/services/api/coupons/couponType';

interface CreateCouponMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateCouponMutation = (args: CreateCouponMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createCoupon,
  } = useMutation({
    mutationFn: async (data: TCouponCreate) => await createCouponApi(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['coupons'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, createCoupon };
};