import { FilterIcon } from "@/shared/ui/icons";
import cls from "./Dashboard.module.scss";
import { SPENDING_DATA, STAT_CARDS } from "./cardsConfig";
import { StatCard } from "@/shared/ui/StatCard/StatCard";
import { SpendingChart } from "../SpendingChart/SpendingChart";

export const Dashboard = () => {
  return (
    <div className={cls.page}>
      <div className={cls.pageHead}>
        <h1>Дашборд</h1>
        <button className={cls.filtersBtn}>
          <span>Фильтры</span>
          <FilterIcon className={cls.filtersIcon} />
        </button>
      </div>

      <div className={cls.cards}>
        {STAT_CARDS.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <section className={cls.chartSection}>
        <h2>Траты</h2>
        <p className={cls.chartSubtitle}>Обзор трат за месяц</p>
        <div className={cls.chartWrapper}>
          <SpendingChart data={SPENDING_DATA} />
        </div>
      </section>
    </div>
  );
};
