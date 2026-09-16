import { queryClient } from "@/providers/queryClient";
import { apiFetch } from "@/api/client";
import { transactionKeys } from "@/api/transactions";
import { categoryKeys } from "@/api/categories";
import { Category } from "@/types/CategoryType";
import { Transaction } from "@/types/TransactionType";
import { HistoryAction } from "./historyStore";

const invalidateCategories = () =>
  queryClient.invalidateQueries({ queryKey: categoryKeys.all });

const invalidateTransactions = () =>
  queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });

export function createReorderCategoriesAction(
  prevOrder: Category[],
  nextOrder: Category[],
): HistoryAction {
  return {
    id: `reorder-${Date.now()}`,
    label: "Изменение порядка категорий",
    undo: async () => {
      await apiFetch<Category[]>("/api/categories", {
        method: "PUT",
        body: JSON.stringify(prevOrder),
      });
      await invalidateCategories();
    },
    redo: async () => {
      await apiFetch<Category[]>("/api/categories", {
        method: "PUT",
        body: JSON.stringify(nextOrder),
      });
      await invalidateCategories();
    },
  };
}

export function createTransactionCreateAction(
  dto: Omit<Transaction, "id">,
  created: Transaction,
): HistoryAction {
  const ref = { id: created.id };
  return {
    id: `create-${created.id}`,
    label: `Создание транзакции "${dto.title}"`,
    undo: async () => {
      await apiFetch<void>(`/api/transactions/${ref.id}`, { method: "DELETE" });
      await invalidateTransactions();
    },
    redo: async () => {
      const recreated = await apiFetch<Transaction>("/api/transactions", {
        method: "POST",
        body: JSON.stringify(dto),
      });
      ref.id = recreated.id;
      await invalidateTransactions();
    },
  };
}

export function createTransactionUpdateAction(
  id: string,
  prev: Omit<Transaction, "id">,
  next: Omit<Transaction, "id">,
): HistoryAction {
  return {
    id: `update-${id}-${Date.now()}`,
    label: "Изменение транзакции",
    undo: async () => {
      await apiFetch<Transaction>(`/api/transactions/${id}`, {
        method: "PATCH",
        body: JSON.stringify(prev),
      });
      await invalidateTransactions();
    },
    redo: async () => {
      await apiFetch<Transaction>(`/api/transactions/${id}`, {
        method: "PATCH",
        body: JSON.stringify(next),
      });
      await invalidateTransactions();
    },
  };
}

export function createTransactionDeleteAction(deleted: Transaction): HistoryAction {
  const { id: _id, ...dto } = deleted;
  const ref = { id: deleted.id };
  return {
    id: `delete-${deleted.id}`,
    label: `Удаление транзакции "${deleted.title}"`,
    undo: async () => {
      const recreated = await apiFetch<Transaction>("/api/transactions", {
        method: "POST",
        body: JSON.stringify(dto),
      });
      ref.id = recreated.id;
      await invalidateTransactions();
    },
    redo: async () => {
      await apiFetch<void>(`/api/transactions/${ref.id}`, { method: "DELETE" });
      await invalidateTransactions();
    },
  };
}