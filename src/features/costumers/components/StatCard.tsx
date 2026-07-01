import { TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  current: number;
  previous: number;
  description: string;
  isNegativeGood?: boolean;
  icon?: ReactNode;
}

export default function StatCard({
  label,
  current,
  previous,
  description,
  isNegativeGood = false,
  icon,
}: StatCardProps) {
  const pct = previous ? ((current - previous) / previous) * 100 : 0;

  const isPositive = pct >= 0;
  const isGood = isNegativeGood ? !isPositive : isPositive;

  return (
    <div className="bg-[#15151f] border border-[#2a2a3e] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-sm md:text-xs font-medium text-[#C7C4D7] uppercase">
          {label}
        </span>

        {icon && <div className="text-gray-500">{icon}</div>}
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-4xl font-bold ${
            isNegativeGood ? "text-[#f87171]" : "text-white"
          }`}
        >
          {current.toLocaleString()}
        </span>

        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            isNegativeGood
              ? "bg-[#3d1d1d] text-[#f87171]"
              : isGood
                ? "bg-[#0f2a1c] text-[#4ade80]"
                : "bg-[#3d1d1d] text-[#f87171]"
          }`}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositive ? "+" : ""}
          {pct.toFixed(1)}%
        </span>
      </div>

      <p className="text-xs md:text-sm font-normal text-[#C7C4D7]">
        {description}
      </p>
    </div>
  );
}
