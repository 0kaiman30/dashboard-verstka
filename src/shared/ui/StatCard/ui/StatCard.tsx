import styles from "./StatCard.module.scss";
import { KebabIcon } from "../../../../assets/icons";

interface StatCardProps {
  title: string;
  subtitle: string;
  value: string;
  variant?: "active" | "muted";
}

export const StatCard = ({ title, subtitle, value, variant = "active" }: StatCardProps) => {
  return (
    <div className={`${styles.card} ${variant === "muted" ? styles.muted : ""}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <button className={styles.menuBtn} aria-label="More options">
          <KebabIcon className={styles.menuIcon} />
        </button>
      </div>
      <p className={styles.value}>{value}</p>
    </div>
  );
};
