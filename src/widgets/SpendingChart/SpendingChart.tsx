import React from "react";
import cls from "./SpendingChart.module.scss";
import { DEFAULT_DATA, SpendingChartProps } from "./types/chartTypes";
import { buildSmoothPath } from "./helper/buildSmoothPath";

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
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerH}
          className={cls.axis}
        />
        <line
          x1={padding.left}
          y1={padding.top + innerH}
          x2={width - padding.right}
          y2={padding.top + innerH}
          className={cls.axis}
        />

        <path d={linePath} className={cls.line} fill="none" />

        {points.map((p, i) => (
          <circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r={2.5}
            className={cls.dot}
          />
        ))}

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
