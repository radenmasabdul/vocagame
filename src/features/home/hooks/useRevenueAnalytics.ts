import { useEffect, useRef, useState } from "react";
import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { useRevenueData, type TimeRange } from "./useRevenueData";
import { buildLabels, type TooltipData } from "../utils/revenue.utils";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Filler,
);

export function useRevenueAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30");
  const [compare, setCompare] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const { currentData, previousData } = useRevenueData(timeRange);

  const days = Number(timeRange);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    Chart.getChart(canvas)?.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 320);

    gradient.addColorStop(0, "rgba(57,255,20,0.32)");

    gradient.addColorStop(0.65, "rgba(57,255,20,0.06)");

    gradient.addColorStop(1, "rgba(57,255,20,0)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: buildLabels(currentData, days),
        datasets: [
          {
            data: currentData.map((item) => item.value),
            borderColor: "#39ff14",
            borderWidth: 2,
            backgroundColor: gradient,
            fill: true,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#39ff14",
            pointHoverBorderColor: "#111614",
            pointHoverBorderWidth: 2,
          },
          ...(compare
            ? [
                {
                  data: previousData.map((item) => item.value),
                  borderColor: "rgba(57,255,20,0.28)",
                  borderWidth: 1.5,
                  borderDash: [5, 4],
                  fill: false,
                  tension: 0.45,
                  pointRadius: 0,
                },
              ]
            : []),
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
        onHover: (_, elements) => {
          if (!elements.length || !chartRef.current) {
            setTooltip(null);
            return;
          }

          const index = elements[0].index;

          const point = chartRef.current.getDatasetMeta(0).data[index];

          setTooltip({
            x: point.x,
            y: point.y,
            date: currentData[index].label,
            value: currentData[index].value,
            prevValue: compare ? previousData[index]?.value : undefined,
          });
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [currentData, previousData, compare, days]);

  return {
    timeRange,
    compare,
    tooltip,
    canvasRef,
    setTimeRange,
    setCompare,
    setTooltip,
  };
}
