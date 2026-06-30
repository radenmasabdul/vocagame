import { useRevenueAnalytics } from "../hooks/useRevenueAnalytics";
import { formatCurrency } from "../utils/revenue.utils";
import { type TimeRange } from "../hooks/useRevenueData";

export default function RevenueAnalyticsCard() {
  const {
    timeRange,
    compare,
    tooltip,
    canvasRef,
    setTimeRange,
    setCompare,
    setTooltip,
  } = useRevenueAnalytics();

  return (
    <div className="bg-[#201F22] border border-[#1e2b1e] rounded-2xl p-6 w-full shadow-2xl">
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
                {formatCurrency(tooltip.value)}
              </p>
              {tooltip.prevValue && (
                <p className="text-xs text-gray-500 mt-0.5">
                  Prev: {formatCurrency(tooltip.prevValue)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
