import { useActivityFeed, ICON_MAP } from "../hooks/useActivityFeed";

export default function ActivityFeed() {
  const { isLoading, displayedActivities } = useActivityFeed();

  return (
    <div className="bg-[#201F22] border border-[#2a2a3e] rounded-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Activity Feed</h2>
        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#2a2a3e] text-gray-300 tracking-wide">
          LIVE
        </span>
      </div>

      <div className="flex flex-col flex-1">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3 pb-6 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-[#2a2a3e] shrink-0" />
                <div className="flex-1 flex flex-col gap-2 pt-1">
                  <div className="h-3.5 w-3/4 bg-[#2a2a3e] rounded" />
                  <div className="h-3 w-1/2 bg-[#2a2a3e] rounded" />
                </div>
              </div>
            ))
          : displayedActivities.map((item, i) => {
              const config = ICON_MAP[item.type] ?? ICON_MAP.organization;
              const Icon = config.icon;
              const isLast = i === displayedActivities.length - 1;

              return (
                <div key={item.id ?? i} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${config.bg} ${config.color}`}
                    >
                      <Icon size={16} />
                    </span>
                    {!isLast && (
                      <span className="w-px flex-1 bg-[#2a2a3e] my-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`text-sm ${
                        item.highlight
                          ? "font-semibold text-white"
                          : "text-gray-200"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.detail} • {item.timeAgo}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>

      <button className="mt-2 w-full py-2.5 rounded-lg border border-[#2a2a3e] text-sm text-gray-300 hover:bg-[#1f1f2e] transition-colors">
        Clear All History
      </button>
    </div>
  );
}
