'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCoupon as deleteCouponApi } from '@/services/api/coupons/couponService';

interface DeleteCouponMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteCouponMutation = (args: DeleteCouponMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteCoupon,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteCouponApi(id),
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

  return { isPending, isError, deleteCoupon };
};