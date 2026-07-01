import AcquisitionChart from "./AcquisitionChart";
import { type CostumerAcquisition } from "../services/costumer.service";

interface Props {
  data: CostumerAcquisition[];
  loading: boolean;
}

export default function AcquisitionSection({ data, loading }: Props) {
  return (
    <div className="col-span-2 bg-[#15151f] border border-[#2a2a3e] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          User Acquisition & Retention
        </h2>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-300">
            <span className="w-3 h-3 rounded-sm bg-[#39ff14]" />
            New
          </span>

          <span className="flex items-center gap-1.5 text-sm text-gray-300">
            <span className="w-3 h-3 rounded-sm bg-[#a78bfa]" />
            Returning
          </span>
        </div>
      </div>

      {loading ? (
        <div className="h-65 bg-[#1f1f2e] rounded-xl animate-pulse" />
      ) : (
        <AcquisitionChart data={data} />
      )}
    </div>
  );
}
