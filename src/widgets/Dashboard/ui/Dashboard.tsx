import styles from "./Dashboard.module.scss";
import { StatCard } from "../../../shared/ui/StatCard";
import { SpendingChart } from "../../SpendingChart";
import { FilterIcon } from "../../../assets/icons";

const SPENDING_DATA = [
  { label: "JAN", value: 20 },
  { label: "FEB", value: 62 },
  { label: "MAR", value: 68 },
  { label: "APR", value: 74 },
  { label: "MAY", value: 42 },
  { label: "JUN", value: 38 },
  { label: "JUL", value: 60 },
];

export const Dashboard = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1>Dashboard</h1>
        <button className={styles.filtersBtn}>
          <span>Filters</span>
          <FilterIcon className={styles.filtersIcon} />
        </button>
      </div>

      <div className={styles.cards}>
        <StatCard title="Income" subtitle="45% more this week" value="$1200" />
        <StatCard title="Expense" subtitle="15% more this week" value="$300" />
        <StatCard
          title="Stocks"
          subtitle="no investment this week"
          value="$0"
        />
      </div>

      <section className={styles.chartSection}>
        <h2>Spending Overview</h2>
        <p className={styles.chartSubtitle}>Monthly review</p>
        <div className={styles.chartWrapper}>
          <SpendingChart data={SPENDING_DATA} />
        </div>
      </section>
    </div>
  );
};