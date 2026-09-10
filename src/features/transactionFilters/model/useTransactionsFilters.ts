import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

export interface TransactionsFilters {
  q: string;
  categoryId: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  sortBy: SortField;
  sortOrder: SortOrder;
}

const DEFAULT_SORT_BY: SortField = "date";
const DEFAULT_SORT_ORDER: SortOrder = "desc";

export function useTransactionsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: TransactionsFilters = useMemo(() => {
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");
    return {
      q: searchParams.get("q") ?? "",
      categoryId: searchParams.get("category"),
      dateFrom: searchParams.get("from"),
      dateTo: searchParams.get("to"),
      sortBy: sortBy === "amount" ? "amount" : DEFAULT_SORT_BY,
      sortOrder: sortOrder === "asc" ? "asc" : DEFAULT_SORT_ORDER,
    };
  }, [searchParams]);

  const patch = useCallback(
    (next: Record<string, string | null>) => {
      setSearchParams(
        (prev) => {
          const updated = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(next)) {
            if (value === null || value === "") updated.delete(key);
            else updated.set(key, value);
          }
          return updated;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return {
    filters,
    setSearch: useCallback((q: string) => patch({ q: q || null }), [patch]),
    setCategory: useCallback((id: string | null) => patch({ category: id }), [patch]),
    setDateFrom: useCallback((d: string | null) => patch({ from: d }), [patch]),
    setDateTo: useCallback((d: string | null) => patch({ to: d }), [patch]),
    setSort: useCallback(
      (sortBy: SortField, sortOrder: SortOrder) =>
        patch({
          sortBy: sortBy === DEFAULT_SORT_BY ? null : sortBy,
          sortOrder: sortOrder === DEFAULT_SORT_ORDER ? null : sortOrder,
        }),
      [patch],
    ),
  };
}