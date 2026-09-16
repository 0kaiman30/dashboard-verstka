export interface DataPoint {
  label?: string;
  value: number;
}

export interface SpendingChartProps {
  data?: DataPoint[];
  width?: number;
  height?: number;
}

export const DEFAULT_DATA: DataPoint[] = [
  { label: "JAN", value: 20 },
  { label: "", value: 50 },
  { label: "FEB", value: 72 },
  { label: "MAR", value: 66 },
  { label: "APR", value: 78 },
  { label: "", value: 38 },
  { label: "MAY", value: 45 },
  { label: "", value: 26 },
  { label: "", value: 22 },
  { label: "JUN", value: 32 },
  { label: "JUL", value: 52 },
];
