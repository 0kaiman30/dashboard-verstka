import { useMemo } from "react";
import { List } from "react-window";
import { useTransactionsFilters } from "@/shared/hooks/useTransactionsFilters";
import { TransactionFilters } from "@/components/TransactionFilters/TransactionFilters";
import { computeStats } from "@/shared/utils/computeStats";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { useFilteredTransactions } from "@/shared/hooks/useFilteredTransactions";
import { Loader } from "@/shared/ui/Loader/Loader";
import { TransactionSummary } from "./TransactionSummary";
import { TransactionsError } from "./TransactionsError";
import { Row, RowProps } from "./Row";
import cls from "./TransactionList.module.scss";
import { useDeleteTransaction, useTransactions } from "@/api/transactions";
import { useCategories } from "@/api/categories";
import { useTransactionsUiStore } from "@/store/transactionsUiStore";
import { useHistoryStore } from "@/store/historyStore";
import { createTransactionDeleteAction } from "@/store/historyActions";

const ROW_HEIGHT = 70;
const LIST_HEIGHT = 320;

export function TransactionsList() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useTransactions();
  const { data: categories } = useCategories();
  const { openForm } = useTransactionsUiStore();
  const deleteMutation = useDeleteTransaction();
  const pushHistory = useHistoryStore((s) => s.push);
  const { filters, setCategory } = useTransactionsFilters();

  const categoriesById = useMemo(
    () => new Map((categories ?? []).map((c) => [c.id, c])),
    [categories],
  );

  const filtered = useFilteredTransactions(data, filters);

  const stats = useMemo(
    () => computeStats(filtered, categories ?? []),
    [filtered, categories],
  );

  if (isLoading) return <Loader label="Загрузка транзакций…" />;

  if (isError) {
    if (isFetching) return <Loader label="Повторная попытка…" />;
    return <TransactionsError error={error} isFetching={isFetching} onRetry={() => refetch()} />;
  }

  const handleDelete = (id: string) => {
    // берём транзакцию ДО удаления — после mutate её уже не будет в data
    const toDelete = data?.find((t) => t.id === id);
    deleteMutation.mutate(id, {
      onSuccess: () => {
        if (toDelete) {
          pushHistory(createTransactionDeleteAction(toDelete));
        }
      },
    });
  };

  const rowProps: RowProps = {
    items: filtered,
    categoriesById,
    onOpen: openForm,
    onDelete: handleDelete,
    deletingId: deleteMutation.isPending
      ? (deleteMutation.variables as string)
      : null,
  };

  return (
    <div className={cls.list}>
      <button onClick={() => openForm()}>+ Добавить транзакцию</button>

      <TransactionFilters categories={categories} />

      <TransactionSummary
        stats={stats}
        filters={filters}
        setCategory={setCategory}
      />

      {isFetching && <Loader label="Обновление…" />}
      <p className={cls.resultsCount}>{filtered.length} транзакций</p>

      {filtered.length === 0 ? (
        <p className={cls.state}>Ничего не найдено</p>
      ) : (
        <List
          rowComponent={Row}
          rowCount={filtered.length}
          rowHeight={ROW_HEIGHT}
          rowProps={rowProps}
          rowKey={(index, { items }) => items[index].id}
          style={{ height: LIST_HEIGHT, width: "100%" }}
        />
      )}

      {deleteMutation.isError && (
        <p className={cls.error}>
          Не удалось удалить: {getErrorMessage(deleteMutation.error)}
        </p>
      )}
    </div>
  );
}