import { useMemo } from "react";

export type TimeRange = "30" | "90";

export interface DataPoint {
  key: string;
  label: string;
  value: number;
}

function generateData(days: number, seed: number): DataPoint[] {
  let rng = seed;
  const rand = () => {
    rng = (rng * 1664525 + 1013904223) & 0xffffffff;
    return (rng >>> 0) / 4294967296;
  };
  const base = new Date("2023-11-01");

  return Array.from({ length: days }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() - (days - 1 - i));
    const t = i / days;
    const value = Math.max(
      5000,
      Math.round(
        20000 +
          t * 30000 +
          Math.sin(t * Math.PI * 2.5) * 15000 +
          Math.sin(t * Math.PI * 1.2 + 1) * 8000 +
          (rand() - 0.5) * 5000,
      ),
    );
    return {
      key: d.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      label: d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      value,
    };
  });
}

export function useRevenueData(timeRange: TimeRange) {
  const days = parseInt(timeRange);
  const currentData = useMemo(() => generateData(days, 42), [days]);
  const previousData = useMemo(
    () =>
      generateData(days, 99).map((d) => ({
        ...d,
        value: Math.round(d.value * 0.72),
      })),
    [days],
  );
  return { currentData, previousData };
}
