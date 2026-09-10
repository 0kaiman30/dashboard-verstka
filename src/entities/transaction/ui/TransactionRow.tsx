import { memo, type CSSProperties } from "react";
import type { Transaction } from "../model/types"
import cls from "./TransactionRow.module.scss";
import { Category } from "@/entities/category/model/types";

interface Props {
  transaction: Transaction;
  category: Category | undefined;
  style: CSSProperties;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function TransactionRowInner({ transaction, category, style, onOpen, onDelete, isDeleting }: Props) {
  return (
    <div style={style} className={cls.item} onClick={() => onOpen(transaction.id)}>
      <div className={cls.main}>
        <span className={cls.title}>{transaction.title}</span>
        <div className={cls.meta}>
          {category && (
            <span className={cls.category} style={{ "--chip-color": category.color } as CSSProperties}>
              <span className={cls.dot} />
              {category.name}
            </span>
          )}
          <span className={cls.date}>{formatDate(transaction.date)}</span>
        </div>
      </div>
      <div className={cls.right}>
        <span className={cls.amount}>{transaction.amount} С</span>
        <button
          className={cls.deleteBtn}
          disabled={isDeleting}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(transaction.id);
          }}
        >
          {isDeleting ? "…" : "✕"}
        </button>
      </div>
    </div>
  );
}

export const TransactionRow = memo(TransactionRowInner);