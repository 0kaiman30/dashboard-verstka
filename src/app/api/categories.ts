import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./client";
import { Category } from "@/entities/category/model/types";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"] as const,
    queryFn: () => apiFetch<Category[]>("/api/categories"),
    staleTime: Infinity,
  });
}

