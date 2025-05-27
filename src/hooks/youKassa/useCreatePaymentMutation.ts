'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPayment as createPaymentApi } from '@/services/api/youKassa/youKassaService';
import { youKassaSend } from '@/services/api/youKassa/youKassaType';

interface CreatePaymentMutationArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useCreatePaymentMutation = (args: CreatePaymentMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createPayment,
  } = useMutation({
    mutationFn: async (data: youKassaSend) => await createPaymentApi(data),
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ['payments'],
      });
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError,
    retry: 2
  });

  return { isPending, isError, createPayment };
};