import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { type StatCardData } from "../types/summary.type";
import { MiniBarChart } from "./MinibarChart";

export function StatCardSkeleton() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 bg-neutral-700 rounded" />
        <div className="h-5 w-14 bg-neutral-700 rounded-full" />
      </div>
      <div className="h-7 w-32 bg-neutral-700 rounded" />
      <div className="h-10 w-full bg-neutral-700 rounded" />
    </div>
  );
}

export function StatCard({ data }: { data: StatCardData }) {
  const { label, value, trend, trendValue, chartData } = data;
  const isUp = trend === "up";

  return (
    <div className="bg-[#201F22] rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs md:text-sm font-medium uppercase text-[#C7C4D7]">
          {label}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-sm",
            isUp
              ? "bg-green-900/60 text-green-400"
              : "bg-red-900/60 text-red-400",
          )}
        >
          {isUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {trendValue}
        </span>
      </div>
      <p className="text-xl md:text-2xl font-medium text-[#E5E1E4]">{value}</p>
      <MiniBarChart data={chartData} trend={trend} />
    </div>
  );
}
