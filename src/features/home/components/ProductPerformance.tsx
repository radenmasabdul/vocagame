import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { MoreHorizontal } from "lucide-react";
import { useGetProductPerformance } from "../services/home.service";

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

const fmt = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`);

type Product = {
  name: string;
  revenue: number;
};

export default function ProductPerformance() {
  const { data, isLoading } = useGetProductPerformance();
  const products: Product[] = (data as Product[]) ?? [];

  const max = Math.max(...products.map((p) => p.revenue));

  return (
    <div className="bg-[#201F22] border border-[#2a2a3e] rounded-2xl p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-xl font-semibold text-[#E5E1E4]">
          Product Performance
        </h2>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 animate-pulse">
              <div className="h-4 w-40 bg-[#2a2a3e] rounded" />
              <div className="h-2 w-full bg-[#2a2a3e] rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {products.map((p) => (
            <div key={p.name} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-medium text-[#E5E1E4]">
                  {p.name}
                </span>
                <span className="text-xs md:text-sm font-medium text-[#E5E1E4]">
                  {fmt(p.revenue)}
                </span>
              </div>
              <div className="w-full h-2 bg-[#2a2a3e] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#39ff14] transition-all duration-500"
                  style={{ width: `${(p.revenue / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
