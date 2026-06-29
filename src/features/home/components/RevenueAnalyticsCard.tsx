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
import {
  type DataPoint,
  type TimeRange,
  useRevenueData,
} from "../hooks/useRevenueData";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Filler,
);

const fmt = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(v);

function buildLabels(data: DataPoint[], days: number) {
  const step = Math.max(1, Math.floor(days / 5));
  return data.map((d, i) =>
    i === 0 || i % step === 0 || i === data.length - 1 ? d.key : "",
  );
}

interface Tooltip {
  x: number;
  y: number;
  date: string;
  value: number;
  prevValue?: number;
}

export default function RevenueAnalyticsCard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30");
  const [compare, setCompare] = useState(true);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const { currentData, previousData } = useRevenueData(timeRange);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const days = parseInt(timeRange);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();
    chartRef.current = null;

    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0, "rgba(57,255,20,0.32)");
    gradient.addColorStop(0.65, "rgba(57,255,20,0.06)");
    gradient.addColorStop(1, "rgba(57,255,20,0.00)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: buildLabels(currentData, days),
        datasets: [
          {
            data: currentData.map((d) => d.value),
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
                  data: previousData.map((d) => d.value),
                  borderColor: "rgba(57,255,20,0.28)",
                  borderWidth: 1.5,
                  borderDash: [5, 4],
                  backgroundColor: "transparent",
                  fill: false,
                  tension: 0.45,
                  pointRadius: 0,
                  pointHoverRadius: 0,
                },
              ]
            : []),
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: { tooltip: { enabled: false }, legend: { display: false } },
        onHover: (_, elements) => {
          if (!elements.length || !chartRef.current) {
            setTooltip(null);
            return;
          }
          const i = elements[0].index;
          const pt = chartRef.current.getDatasetMeta(0).data[i];
          setTooltip({
            x: pt.x,
            y: pt.y,
            date: currentData[i].label,
            value: currentData[i].value,
            prevValue: compare ? previousData[i]?.value : undefined,
          });
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: "#6b7280",
              font: { size: 12 },
              maxRotation: 0,
              autoSkip: false,
            },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.04)" },
            border: { display: false },
            ticks: { display: false },
            min: 0,
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [currentData, previousData, compare, days]);

  return (
    <div className="bg-[#111614] border border-[#1e2b1e] rounded-2xl p-6 w-full shadow-2xl">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-[#E5E1E4]">
            Revenue Analytics
          </h2>
          <p className="text-xs md:text-sm font-normal text-[#C7C4D7]">
            Daily transaction volume across all platforms
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-0.5 bg-[#1a1f1a] border border-[#2a3a2a] rounded-lg p-1">
            {(["30", "90"] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  timeRange === r
                    ? "bg-[#16CA2E] text-white shadow-[0_0_12px_rgba(57,255,20,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {r === "30" ? "Last 30 Days" : "90 Days"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              role="switch"
              aria-checked={compare}
              onClick={() => setCompare((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${compare ? "bg-[#39ff14]" : "bg-[#2a3a2a]"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${compare ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <span className="text-xs md:text-sm font-medium text-[#C7C4D7]">
              Compare to previous
            </span>
          </div>
        </div>
      </div>

      <div
        className="relative w-full h-80"
        onMouseLeave={() => setTooltip(null)}
      >
        <canvas ref={canvasRef} />

        {tooltip && (
          <div
            className="absolute pointer-events-none z-10"
            style={{
              left: tooltip.x > 500 ? tooltip.x - 185 : tooltip.x + 16,
              top: tooltip.y - 56,
            }}
          >
            <div className="bg-[#1a1f1a] border border-[#2a3a2a] rounded-lg px-3 py-2 shadow-xl min-w-37.5">
              <p className="text-xs text-gray-400 mb-0.5">{tooltip.date}</p>
              <p className="text-base font-semibold text-[#39ff14]">
                {fmt(tooltip.value)}
              </p>
              {tooltip.prevValue && (
                <p className="text-xs text-gray-500 mt-0.5">
                  Prev: {fmt(tooltip.prevValue)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
