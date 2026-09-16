import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiError } from "./client";
import { Category } from "@/types/CategoryType";

export const categoryKeys = {
  all: ["categories"] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => apiFetch<Category[]>("/api/categories"),
    staleTime: Infinity,
  });
}

export function useReorderCategories() {
  const queryClient = useQueryClient();
  return useMutation<Category[], ApiError, Category[]>({
    mutationFn: (next) =>
      apiFetch<Category[]>("/api/categories", {
        method: "PUT",
        body: JSON.stringify(next),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(categoryKeys.all, data);
    },
  });
}