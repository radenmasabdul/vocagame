export type TrendDirection = "up" | "down";

export interface StatCardData {
  label: string;
  value: string;
  trend: TrendDirection;
  trendValue: string;
  chartData: number[];
}
