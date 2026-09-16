import { useState, useEffect } from "react";
import cls from "./TransactionForm.module.scss";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { Loader } from "@/shared/ui/Loader/Loader";
import { useTransactionsUiStore } from "@/store/transactionsUiStore";
import { useCategories } from "@/api/categories";
import {
  useCreateTransaction,
  useTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/api/transactions";
import { useHistoryStore } from "@/store/historyStore";
import {
  createTransactionCreateAction,
  createTransactionDeleteAction,
  createTransactionUpdateAction,
} from "@/store/historyActions";

export function TransactionForm() {
  const { isFormOpen, editingTransactionId, closeForm } =
    useTransactionsUiStore();
  const { data: categories } = useCategories();
  const { data: existing, isLoading: isLoadingExisting } = useTransaction(
    editingTransactionId ?? "",
  );

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();
  const activeMutation = editingTransactionId ? updateMutation : createMutation;
  const pushHistory = useHistoryStore((s) => s.push);

  useEffect(() => {
    if (!editingTransactionId) {
      setTitle("");
      setAmount("");
      setCategoryId(categories?.[0]?.id ?? "");
      return;
    }
    if (existing) {
      setTitle(existing.title);
      setAmount(String(existing.amount));
      setCategoryId(existing.categoryId);
    }
  }, [existing, editingTransactionId, categories]);

  if (!isFormOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dto = {
      title,
      amount: Number(amount),
      categoryId,
      date: new Date().toISOString(),
    };

    if (editingTransactionId && existing) {
      const prev = {
        title: existing.title,
        amount: existing.amount,
        categoryId: existing.categoryId,
        date: existing.date,
      };
      updateMutation.mutate(
        { id: editingTransactionId, dto },
        {
          onSuccess: () => {
            pushHistory(createTransactionUpdateAction(editingTransactionId, prev, dto));
            closeForm();
          },
        },
      );
    } else {
      createMutation.mutate(dto, {
        onSuccess: (created) => {
          pushHistory(createTransactionCreateAction(dto, created));
          closeForm();
        },
      });
    }
  };

  const handleDelete = () => {
    if (!editingTransactionId || !existing) return;
    deleteMutation.mutate(editingTransactionId, {
      onSuccess: () => {
        pushHistory(createTransactionDeleteAction(existing));
        closeForm();
      },
    });
  };

  const isLoadingContent = Boolean(editingTransactionId) && isLoadingExisting;

  return (
    <div className={cls.overlay} onClick={closeForm}>
      <div className={cls.form} onClick={(e) => e.stopPropagation()}>
        {isLoadingContent ? (
          <Loader label="Загружаем транзакцию…" />
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>
              {editingTransactionId ? "Редактировать" : "Новая"} транзакция
            </h3>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название"
              required
            />
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Сумма"
              required
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {activeMutation.isError && (
              <p className={cls.error}>
                {getErrorMessage(activeMutation.error)}
              </p>
            )}

            <div className={cls.actions}>
              {editingTransactionId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? <Loader variant="inline" size="sm" /> : "Удалить"}
                </button>
              )}
              <button type="button" onClick={closeForm}>
                Отмена
              </button>
              <button type="submit" disabled={activeMutation.isPending}>
                {activeMutation.isPending ? (
                  <Loader variant="inline" size="sm" />
                ) : (
                  "Сохранить"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}