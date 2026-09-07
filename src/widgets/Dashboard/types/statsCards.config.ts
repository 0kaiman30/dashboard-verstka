export interface StatCardConfig {
  title: string;
  subtitle: string;
  value: string;
}

export const STAT_CARDS: StatCardConfig[] = [
  { title: "Income", subtitle: "45% more this week", value: "$1200" },
  { title: "Expense", subtitle: "15% more this week", value: "$300" },
  { title: "Stocks", subtitle: "no investment this week", value: "$0" },
];

export const SPENDING_DATA = [
  { label: "JAN", value: 20 },
  { label: "FEB", value: 62 },
  { label: "MAR", value: 68 },
  { label: "APR", value: 74 },
  { label: "MAY", value: 42 },
  { label: "JUN", value: 38 },
  { label: "JUL", value: 60 },
];
