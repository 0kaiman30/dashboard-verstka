import { useMemo } from "react";
import type { TransactionsFilters } from "@/features/transactionFilters/model/useTransactionsFilters";
import { Transaction } from "@/entities/transaction/model/types";

export function useFilteredTransactions(
  transactions: Transaction[] | undefined,
  filters: TransactionsFilters,
) {
  return useMemo(() => {
    if (!transactions) return [];

    const q = filters.q.trim().toLowerCase();
    const fromTime = filters.dateFrom
      ? new Date(filters.dateFrom).getTime()
      : null;
    const toTime = filters.dateTo
      ? new Date(filters.dateTo).getTime() + 24 * 60 * 60 * 1000 - 1
      : null;

    const hasFilter =
      q || filters.categoryId || fromTime !== null || toTime !== null;

    const result = hasFilter
      ? transactions.filter((tx) => {
          if (q && !tx.title.toLowerCase().includes(q)) return false;
          if (filters.categoryId && tx.categoryId !== filters.categoryId)
            return false;
          const t = new Date(tx.date).getTime();
          if (fromTime !== null && t < fromTime) return false;
          if (toTime !== null && t > toTime) return false;
          return true;
        })
      : transactions;

    const dir = filters.sortOrder === "asc" ? 1 : -1;
    return [...result].sort((a, b) =>
      filters.sortBy === "amount"
        ? (a.amount - b.amount) * dir
        : (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir,
    );
  }, [
    transactions,
    filters.q,
    filters.categoryId,
    filters.dateFrom,
    filters.dateTo,
    filters.sortBy,
    filters.sortOrder,
  ]);
}
