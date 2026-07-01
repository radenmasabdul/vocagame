import { type CostumerGeographicalDistribution } from "../services/costumer.service";

interface Props {
  geo: CostumerGeographicalDistribution[];
}

export default function GeoDistributionSection({ geo }: Props) {
  return (
    <div className="bg-[#15151f] border border-[#2a2a3e] rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-white">Geographical Map</h2>

      <div className="w-full h-40 bg-[#1a1a2e] rounded-xl overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full opacity-40">
          <rect width="800" height="400" fill="#0f0f1a" />
          <text
            x="400"
            y="200"
            textAnchor="middle"
            fill="#3a3a4e"
            fontSize="14"
          >
            World Map
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {geo.map((region) => (
          <div key={region.id} className="flex items-center justify-between">
            <span className="text-sm text-gray-300 w-28">{region.region}</span>

            <div className="flex-1 mx-3 h-1 rounded-full bg-[#2a2a3e] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${region.percentage}%`,
                  backgroundColor: region.color,
                }}
              />
            </div>

            <span className="text-sm text-gray-400 w-8 text-right">
              {region.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
