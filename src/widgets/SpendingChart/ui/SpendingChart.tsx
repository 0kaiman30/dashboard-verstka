import React from "react";
import cls from "./SpendingChart.module.scss";

export interface DataPoint {
  label?: string;
  value: number;
}

interface SpendingChartProps {
  data?: DataPoint[];
  width?: number;
  height?: number;
}

// Расширенный набор точек для точного повторения изгибов с дизайнера
const DEFAULT_DATA: DataPoint[] = [
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

/**
 * Построение гладкой сглаженной кривой через Catmull-Rom -> Сubic Bezier
 */
function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  data = DEFAULT_DATA,
  width = 700,
  height = 260,
}) => {
  const padding = { top: 20, bottom: 40, left: 40, right: 30 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * innerW,
    y: padding.top + innerH - ((d.value - min) / range) * innerH,
  }));

  const linePath = buildSmoothPath(points);

  return (
    <div className={cls.chartContainer}>
      <svg
        className={cls.chart}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Spending overview chart"
      >
        {/* Ось Y (Вертикальная слева) */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerH}
          className={cls.axis}
        />

        {/* Ось X (Горизонтальная снизу) */}
        <line
          x1={padding.left}
          y1={padding.top + innerH}
          x2={width - padding.right}
          y2={padding.top + innerH}
          className={cls.axis}
        />

        {/* Гладкая белая линия */}
        <path d={linePath} className={cls.line} fill="none" />

        {/* Белые точки на местах переломов */}
        {points.map((p, i) => (
          <circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r={2.5}
            className={cls.dot}
          />
        ))}

        {/* Подписи месяцев под графиком */}
        {data.map((d, i) =>
          d.label ? (
            <text
              key={`label-${i}`}
              x={points[i].x}
              y={padding.top + innerH + 24}
              textAnchor="middle"
              className={cls.label}
            >
              {d.label}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
};
