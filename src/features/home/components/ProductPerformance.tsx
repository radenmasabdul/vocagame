import { MoreHorizontal } from "lucide-react";
import { formatRevenue, useProductPerformance } from "../hooks/useProductPerformance";

export default function ProductPerformance() {
  const { isLoading, products, maxRevenue } = useProductPerformance();

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
                  {formatRevenue(p.revenue)}
                </span>
              </div>
              <div className="w-full h-2 bg-[#2a2a3e] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#39ff14] transition-all duration-500"
                  style={{
                    width: `${
                      maxRevenue ? (p.revenue / maxRevenue) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
