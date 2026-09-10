import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { apiFetch, ApiError } from './client';
import { Transaction } from '@/entities/transaction/model/types';

export type CreateTransactionDto = Omit<Transaction, 'id'>;
export type UpdateTransactionDto = Partial<Omit<Transaction, 'id'>>;

export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  detail: (id: string) => [...transactionKeys.all, 'detail', id] as const,
};

function retryOnServerErrorOnly(failureCount: number, error: unknown) {
  if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
    return false;
  }
  return failureCount < 2;
}

export function useTransactions() {
  return useQuery<Transaction[], ApiError>({
    queryKey: transactionKeys.lists(),
    queryFn: () => apiFetch<Transaction[]>('/api/transactions'),
    staleTime: 30_000,
    retry: retryOnServerErrorOnly,
    placeholderData: keepPreviousData,
  });
}

export function useTransaction(id: string) {
  return useQuery<Transaction, ApiError>({
    queryKey: transactionKeys.detail(id),
    queryFn: () => apiFetch<Transaction>(`/api/transactions/${id}`),
    staleTime: 30_000,
    retry: retryOnServerErrorOnly,
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation<Transaction, ApiError, CreateTransactionDto>({
    mutationFn: (dto: CreateTransactionDto) =>
      apiFetch<Transaction>('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    retry: retryOnServerErrorOnly,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTransactionDto }) =>
      apiFetch<Transaction>(`/api/transactions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(dto),
      }),
    retry: retryOnServerErrorOnly,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.setQueryData(transactionKeys.detail(updated.id), updated);
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<void>(`/api/transactions/${id}`, { method: 'DELETE' }),
    retry: retryOnServerErrorOnly,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}