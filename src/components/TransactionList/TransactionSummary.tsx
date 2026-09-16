import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import cls from "./TransactionList.module.scss";
import { useCategories, useReorderCategories, categoryKeys } from "@/api/categories";
import { useHistoryStore } from "@/store/historyStore";
import { createReorderCategoriesAction } from "@/store/historyActions";

interface CategoryStat {
  id: string;
  name: string;
  color?: string;
  amount: number;
}

interface TransactionSummaryProps {
  stats: { total: number; byCategory: CategoryStat[] };
  filters: { categoryId: string | null };
  setCategory: (id: string | null) => void;
}

function CategoryChip({
  category,
  isActive,
  onClick,
}: {
  category: CategoryStat;
  isActive: boolean;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: category.id });

  const style = {
    "--chip-color": category.color,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  } as React.CSSProperties;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${cls.categoryChip} ${isActive ? cls.categoryChipActive : ""}`}
      onClick={onClick}
    >
      <span className={cls.dot} />
      {category.name}
      <span className={cls.chipAmount}>
        {category.amount.toLocaleString("ru-RU")} С
      </span>
    </button>
  );
}

export function TransactionSummary({ stats, filters, setCategory }: TransactionSummaryProps) {
  const queryClient = useQueryClient();
  const { data: allCategories = [] } = useCategories();
  const reorderMutation = useReorderCategories();
  const pushHistory = useHistoryStore((s) => s.push);

  const byCategoryMap = useMemo(
    () => new Map(stats.byCategory.map((c) => [c.id, c])),
    [stats.byCategory],
  );

  // единственный источник порядка — кэш useCategories(), никакого своего state
  const orderedItems = allCategories
    .map((c) => byCategoryMap.get(c.id))
    .filter((c): c is CategoryStat => Boolean(c));
  const orderedIds = orderedItems.map((c) => c.id);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = allCategories.findIndex((c) => c.id === active.id);
    const newIndex = allCategories.findIndex((c) => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const prevOrder = allCategories;
    const nextOrder = arrayMove(allCategories, oldIndex, newIndex);

    // мгновенный визуальный отклик — прямо в кэш
    queryClient.setQueryData(categoryKeys.all, nextOrder);

    reorderMutation.mutate(nextOrder, {
      onError: () => queryClient.setQueryData(categoryKeys.all, prevOrder),
      onSuccess: () => {
        pushHistory(createReorderCategoriesAction(prevOrder, nextOrder));
      },
    });
  }

  return (
    <div className={cls.summary}>
      <div className={cls.total}>
        <span>Всего потрачено</span>
        <strong>{stats.total.toLocaleString("ru-RU")} С</strong>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedIds} strategy={rectSortingStrategy}>
          <div className={cls.byCategory}>
            {orderedItems.map((c) => (
              <CategoryChip
                key={c.id}
                category={c}
                isActive={filters.categoryId === c.id}
                onClick={() => setCategory(filters.categoryId === c.id ? null : c.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}