import cls from "./StatCard.module.scss";
import { KebabIcon } from "../../../../assets/icons";

interface StatCardProps {
  title: string;
  subtitle: string;
  value: string;
}

export const StatCard = ({
  title,
  subtitle,
  value,
}: StatCardProps) => {
  return (
    <div
      className={`${cls.card}`}
    >
      <div className={cls.head}>
        <div>
          <p className={cls.title}>{title}</p>
          <p className={cls.subtitle}>{subtitle}</p>
        </div>
        <button className={cls.menuBtn} aria-label="More options">
          <KebabIcon className={cls.menuIcon} />
        </button>
      </div>
      <p className={cls.value}>{value}</p>
    </div>
  );
};
