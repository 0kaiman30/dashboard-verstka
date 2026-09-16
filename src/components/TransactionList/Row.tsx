import { type RowComponentProps } from "react-window";
import { TransactionRow } from "@/components/TransactionRow/TransactionRow";
import { Transaction } from "@/types/TransactionType";
import { Category } from "@/types/CategoryType";

export interface RowProps {
  items: Transaction[];
  categoriesById: Map<string, Category>;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

export function Row({
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