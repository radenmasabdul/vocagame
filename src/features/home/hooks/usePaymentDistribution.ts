import { useEffect, useMemo, useRef } from "react";
import { ArcElement, Chart, DoughnutController, Tooltip } from "chart.js";
import { useGetPaymentDistribution } from "../services/home.service";

Chart.register(DoughnutController, ArcElement, Tooltip);

export const COLORS = ["#a78bfa", "#4ade80", "#f0abfc", "#6b7280"];

export interface PaymentItem {
  method: string;
  percentage: number;
}

export function usePaymentDistribution() {
  const { data, isLoading } = useGetPaymentDistribution();

  const payments = useMemo<PaymentItem[]>(
    () => (data as PaymentItem[]) ?? [],
    [data],
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const topMethod =
    payments.length > 0
      ? payments.reduce(
          (top, item) => (item.percentage > top.percentage ? item : top),
          payments[0],
        )
      : null;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || payments.length === 0) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    Chart.getChart(canvas)?.destroy();

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: payments.map((item) => item.method),
        datasets: [
          {
            data: payments.map((item) => item.percentage),
            backgroundColor: COLORS,
            borderWidth: 3,
            borderColor: "#1a1a2e",
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [payments]);

  return {
    isLoading,
    payments,
    topMethod,
    canvasRef,
  };
}
