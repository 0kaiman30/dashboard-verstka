import cls from "./Dashboard.module.scss";
import { StatCard } from "../../../shared/ui/StatCard";
import { SpendingChart } from "../../SpendingChart";
import { FilterIcon } from "../../../assets/icons";
import { STAT_CARDS } from "../types/statsCards.config";
import { SPENDING_DATA } from "../types/statsCards.config"

export const Dashboard = () => {
  return (
    <div className={cls.page}>
      <div className={cls.pageHead}>
        <h1>Dashboard</h1>
        <button className={cls.filtersBtn}>
          <span>Filters</span>
          <FilterIcon className={cls.filtersIcon} />
        </button>
      </div>

      <div className={cls.cards}>
        {STAT_CARDS.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <section className={cls.chartSection}>
        <h2>Spending Overview</h2>
        <p className={cls.chartSubtitle}>Monthly review</p>
        <div className={cls.chartWrapper}>
          <SpendingChart data={SPENDING_DATA} />
        </div>
      </section>
    </div>
  );
};