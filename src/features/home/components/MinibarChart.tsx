import { type TrendDirection } from "../types/summary.type";

interface MiniBarChartProps {
  data: number[];
  trend: TrendDirection;
}

export function MiniBarChart({ data, trend }: MiniBarChartProps) {
  const max = Math.max(...data);
  const activeColor = trend === "up" ? "#16a34a" : "#7f1d1d";
  const dimColor = trend === "up" ? "#14532d" : "#3b0d0d";

  return (
    <div className="flex items-end gap-0.75 h-10 w-full">
      {data.map((value, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${(value / max) * 100}%`,
            backgroundColor: i === data.length - 1 ? activeColor : dimColor,
          }}
        />
      ))}
    </div>
  );
}
