import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Filler,
);

interface AcquisitionData {
  month: string;
  new_users: number;
  returning_users: number;
}

export default function AcquisitionChart({
  data,
}: {
  data: AcquisitionData[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();

    const gradientGreen = ctx.createLinearGradient(0, 0, 0, 300);
    gradientGreen.addColorStop(0, "rgba(57,255,20,0.25)");
    gradientGreen.addColorStop(1, "rgba(57,255,20,0.00)");

    const gradientPurple = ctx.createLinearGradient(0, 0, 0, 300);
    gradientPurple.addColorStop(0, "rgba(167,139,250,0.20)");
    gradientPurple.addColorStop(1, "rgba(167,139,250,0.00)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.month.toUpperCase()),
        datasets: [
          {
            label: "New",
            data: data.map((d) => d.new_users),
            borderColor: "#39ff14",
            borderWidth: 2.5,
            backgroundColor: gradientGreen,
            fill: true,
            tension: 0.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#39ff14",
          },
          {
            label: "Returning",
            data: data.map((d) => d.returning_users),
            borderColor: "#a78bfa",
            borderWidth: 2.5,
            backgroundColor: gradientPurple,
            fill: true,
            tension: 0.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#a78bfa",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: { tooltip: { enabled: true }, legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: "#6b7280", font: { size: 12 }, maxRotation: 0 },
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
  }, [data]);

  return (
    <div className="relative w-full h-65">
      <canvas ref={canvasRef} />
    </div>
  );
}
