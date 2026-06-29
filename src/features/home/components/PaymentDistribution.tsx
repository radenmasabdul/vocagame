import { useEffect, useMemo, useRef } from "react";
import { ArcElement, Chart, DoughnutController, Tooltip } from "chart.js";
import { SlidersHorizontal } from "lucide-react";
import { useGetPaymentDistribution } from "../services/home.service";

Chart.register(DoughnutController, ArcElement, Tooltip);

const COLORS = ["#a78bfa", "#4ade80", "#f0abfc", "#6b7280"];

interface PaymentItem {
  method: string;
  percentage: number;
}

export default function PaymentDistribution() {
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
          (top, p) => (p.percentage > top.percentage ? p : top),
          payments[0],
        )
      : null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || payments.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();
    chartRef.current = null;

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: payments.map((p) => p.method),
        datasets: [
          {
            data: payments.map((p) => p.percentage),
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
          tooltip: { enabled: false },
          legend: { display: false },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [payments]);

  return (
    <div className="bg-[#201F22] border border-[#2a2a3e] rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="ttext-base md:text-xl font-semibold text-[#E5E1E4]">
          Payment Distribution
        </h2>
        <button className="text-gray-400 hover:text-white transition-colors">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-48 animate-pulse">
          <div className="w-40 h-40 rounded-full border-12 border-[#2a2a3e]" />
        </div>
      ) : (
        <div className="flex items-center gap-8 pt-10">
          <div className="relative w-44 h-44 shrink-0">
            <canvas ref={canvasRef} />
            {topMethod && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-400 mb-1">Top Method</span>
                <span className="text-base font-bold text-[#a78bfa] text-center leading-tight">
                  {topMethod.method}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {payments.map((p, i) => (
              <div key={p.method} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-sm text-gray-300">{p.method}</span>
                </div>
                <span className="text-sm text-gray-300 font-medium">
                  {p.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
