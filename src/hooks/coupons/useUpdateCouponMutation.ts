'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCoupon as updateCouponApi } from '@/services/api/coupons/couponService';
import { TCoupon } from '@/services/api/coupons/couponType';

interface UpdateCouponMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateCouponMutation = (args: UpdateCouponMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateCoupon,
  } = useMutation({
    mutationFn: async (data: TCoupon) => await updateCouponApi(data),
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

  return { isPending, isError, updateCoupon };
};