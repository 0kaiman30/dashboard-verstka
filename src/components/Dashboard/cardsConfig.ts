export interface StatCardConfig {
  title: string;
  subtitle: string;
  value: string;
}

export const STAT_CARDS: StatCardConfig[] = [
  { title: "Доход", subtitle: "На этой неделе на 45% больше", value: "$1200" },
  { title: "Траты", subtitle: "На этой неделе на 15% больше", value: "$300" },
  { title: "Стоки", subtitle: "На этой неделе нет инвестиций", value: "$0" },
];

export const SPENDING_DATA = [
  { label: "", value: 1 },
  { label: "JAN", value: 15 },
  { label: "FEB", value: 62 },
  { label: "MAR", value: 68 },
  { label: "APR", value: 74 },
  { label: "MAY", value: 42 },
  { label: "JUN", value: 38 },
  { label: "JUL", value: 60 },
];
