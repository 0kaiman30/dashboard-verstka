import { useMemo } from "react";
import { List, type RowComponentProps } from "react-window";
import {
  useDeleteTransaction,
  useTransactions,
} from "../../app/api/transactions";
import { useCategories } from "../../app/api/categories";
import { useTransactionsUiStore } from "../../app/store/transactionsUiStore";
import { useTransactionsFilters } from "@/features/transactionFilters/model/useTransactionsFilters";
import { TransactionFilters } from "@/features/transactionFilters/ui/TransactionFilters";
import { TransactionRow } from "@/entities/transaction/ui/TransactionRow";
import cls from "./TransactionList.module.scss";
import { computeStats } from "@/shared/lib/helpers/computeStats";
import { getErrorMessage } from "@/shared/lib/helpers/getErrorMessage";
import { Transaction } from "@/entities/transaction/model/types";
import { Category } from "@/entities/category/model/types";
import { useFilteredTransactions } from "@/features/transactionFilters/lib/useFilteredTransactions";
import { Loader } from "@/shared/ui/Loader/Loader";

const ROW_HEIGHT = 70;
const LIST_HEIGHT = 320;

interface RowProps {
  items: Transaction[];
  categoriesById: Map<string, Category>;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

function Row({
  index,
  style,
  items,
  categoriesById,
  onOpen,
  onDelete,
  deletingId,
}: RowComponentProps<RowProps>) {
  const tx = items[index];
  return (
    <TransactionRow
      transaction={tx}
      category={categoriesById.get(tx.categoryId)}
      style={style}
      onOpen={onOpen}
      onDelete={onDelete}
      isDeleting={deletingId === tx.id}
    />
  );
}
export function TransactionsList() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useTransactions();
  const { data: categories } = useCategories();
  const { openForm } = useTransactionsUiStore();
  const deleteMutation = useDeleteTransaction();
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
    if (isFetching) {
      return <Loader label="Повторная попытка…" />;
    }

    const isServerError =
      typeof error?.status === "number" && error.status >= 500;
    return (
      <div className={cls.stateError}>
        <p>
          {isServerError
            ? "Сервер временно недоступен (500). Попробуйте ещё раз."
            : `Не удалось загрузить транзакции: ${getErrorMessage(error)}`}
        </p>
        <button onClick={() => refetch()} disabled={isFetching}>
          Повторить
        </button>
      </div>
    );
  }

  const rowProps: RowProps = {
    items: filtered,
    categoriesById,
    onOpen: openForm,
    onDelete: (id: string) => deleteMutation.mutate(id),
    deletingId: deleteMutation.isPending
      ? (deleteMutation.variables as string)
      : null,
  };

  return (
    <div className={cls.list}>
      <button onClick={() => openForm()}>+ Добавить транзакцию</button>

      <TransactionFilters categories={categories} />

      <div className={cls.summary}>
        <div className={cls.total}>
          <span>Всего потрачено</span>
          <strong>{stats.total.toLocaleString("ru-RU")} С</strong>
        </div>
        <div className={cls.byCategory}>
          {stats.byCategory.map((c) => (
            <button
              key={c.id}
              className={`${cls.categoryChip} ${filters.categoryId === c.id ? cls.categoryChipActive : ""}`}
              style={{ "--chip-color": c.color } as React.CSSProperties}
              onClick={() =>
                setCategory(filters.categoryId === c.id ? null : c.id)
              }
            >
              <span className={cls.dot} />
              {c.name}
              <span className={cls.chipAmount}>
                {c.amount.toLocaleString("ru-RU")} С
              </span>
            </button>
          ))}
        </div>
      </div>

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
