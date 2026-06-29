import { useGetSummary } from "../services/home.service";
import type { StatCardData, TrendDirection } from "../types/summary.type";

interface MetricItem {
  current: number;
  previous: number;
}

export interface SummaryResponse {
  total_revenue: MetricItem;
  total_orders: MetricItem;
  active_users: MetricItem;
  conversion_rate: MetricItem;
}

function calcTrend(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function toTrend(pct: number): TrendDirection {
  return pct >= 0 ? "up" : "down";
}

function formatTrend(pct: number): string {
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
}

function generateChartData(
  previous: number,
  current: number,
  bars = 8,
): number[] {
  const min = Math.min(previous, current) * 0.85;
  const max = Math.max(previous, current) * 1.1;
  const middle = Array.from({ length: bars - 2 }, () =>
    Math.round(min + Math.random() * (max - min)),
  );
  return [previous, ...middle, current];
}

function mapToCards(data: SummaryResponse): StatCardData[] {
  const revenueTrend = calcTrend(
    data.total_revenue.current,
    data.total_revenue.previous,
  );

  const ordersTrend = calcTrend(
    data.total_orders.current,
    data.total_orders.previous,
  );

  const usersTrend = calcTrend(
    data.active_users.current,
    data.active_users.previous,
  );

  const conversionTrend = calcTrend(
    data.conversion_rate.current,
    data.conversion_rate.previous,
  );

  return [
    {
      label: "Total Revenue",
      value: `$${data.total_revenue.current.toLocaleString()}`,
      trend: toTrend(revenueTrend),
      trendValue: formatTrend(revenueTrend),
      chartData: generateChartData(
        data.total_revenue.previous,
        data.total_revenue.current,
      ),
    },
    {
      label: "Total Orders",
      value: data.total_orders.current.toLocaleString(),
      trend: toTrend(ordersTrend),
      trendValue: formatTrend(ordersTrend),
      chartData: generateChartData(
        data.total_orders.previous,
        data.total_orders.current,
      ),
    },
    {
      label: "Active Users",
      value: data.active_users.current.toLocaleString(),
      trend: toTrend(usersTrend),
      trendValue: formatTrend(usersTrend),
      chartData: generateChartData(
        data.active_users.previous,
        data.active_users.current,
      ),
    },
    {
      label: "Conversion",
      value: `${data.conversion_rate.current.toFixed(2)}%`,
      trend: toTrend(conversionTrend),
      trendValue: formatTrend(conversionTrend),
      chartData: generateChartData(
        data.conversion_rate.previous,
        data.conversion_rate.current,
      ),
    },
  ];
}

export function useHomepage() {
  const { data, isLoading } = useGetSummary();

  return {
    isLoading,
    cards: data ? mapToCards(data as SummaryResponse) : [],
  };
}
