import { useState, useEffect } from "react";
import cls from "./TransactionForm.module.scss";
import { useTransactionsUiStore } from "@/app/store/transactionsUiStore";
import { useCategories } from "@/app/api/categories";
import {
  useCreateTransaction,
  useTransaction,
  useUpdateTransaction,
} from "@/app/api/transactions";
import { getErrorMessage } from "@/shared/lib/helpers/getErrorMessage";
import { Loader } from "@/shared/ui/Loader/Loader";

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
  const activeMutation = editingTransactionId ? updateMutation : createMutation;

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
    if (editingTransactionId) {
      updateMutation.mutate(
        { id: editingTransactionId, dto },
        { onSuccess: closeForm },
      );
    } else {
      createMutation.mutate(dto, { onSuccess: closeForm });
    }
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
