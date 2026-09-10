import { useEffect, useState } from "react";
import cls from "./TransactionFilters.module.scss";
import { useDebouncedValue } from "@/shared/lib/hooks/useDebouncedValue";
import { useTransactionsFilters } from "../model/useTransactionsFilters";
import { Category } from "@/entities/category/model/types";

export function TransactionFilters({
  categories,
}: {
  categories: Category[] | undefined;
}) {
  const { filters, setSearch, setCategory, setDateFrom, setDateTo, setSort } =
    useTransactionsFilters();

  const [inputValue, setInputValue] = useState(filters.q);
  const debounced = useDebouncedValue(inputValue, 500);

  useEffect(() => setInputValue(filters.q), [filters.q]);

  useEffect(() => {
    if (debounced !== filters.q) setSearch(debounced);
  }, [debounced]);

  return (
    <div className={cls.filters}>
      <input
        className={cls.search}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Поиск по названию…"
      />

      <select
        className={cls.select}
        value={filters.categoryId ?? ""}
        onChange={(e) => setCategory(e.target.value || null)}
      >
        <option value="">Все категории</option>
        {categories?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        className={cls.date}
        value={filters.dateFrom ?? ""}
        onChange={(e) => setDateFrom(e.target.value || null)}
      />
      <input
        type="date"
        className={cls.date}
        value={filters.dateTo ?? ""}
        onChange={(e) => setDateTo(e.target.value || null)}
      />

      <select
        className={`${cls.select} ${cls.sortSelect}`}
        value={`${filters.sortBy}_${filters.sortOrder}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split("_") as [
            "date" | "amount",
            "asc" | "desc",
          ];
          setSort(sortBy, sortOrder);
        }}
      >
        <option value="date_desc">Дата(сначала новые)</option>
        <option value="date_asc">Дата(сначала старые)</option>
        <option value="amount_desc">Сумма(сначала больше)</option>
        <option value="amount_asc">Сумма(сначала меньше)</option>
      </select>
    </div>
  );
}
