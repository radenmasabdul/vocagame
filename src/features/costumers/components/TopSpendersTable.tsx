import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { type TopSpender } from "../services/costumer.service";
import {
  AVATAR_COLORS,
  SEGMENT_STYLES,
} from "../constants/costumers.constants";

interface TopSpendersTableProps {
  data: TopSpender[];
  loading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalUsers: number;
}

export default function TopSpendersTable({
  data,
  loading,
  page,
  setPage,
  totalUsers,
}: TopSpendersTableProps) {
  return (
    <div className="bg-[#15151f] border border-[#2a2a3e] rounded-2xl overflow-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-5">
        <h2 className="text-lg font-semibold text-white">Top Spenders</h2>

        <button className="text-sm text-[#a78bfa] hover:text-[#c4b5fd] transition-colors text-left sm:text-right">
          View all customers
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 text-left border-collapse">
          <thead>
            <tr className="border-y border-[#2a2a3e]">
              <th className="py-3 px-6 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Customer
              </th>

              <th className="py-3 px-6 text-xs font-medium text-gray-500 tracking-wider uppercase">
                LTV (Lifetime Value)
              </th>

              <th className="py-3 px-6 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Last Active
              </th>

              <th className="py-3 px-6 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Segment
              </th>

              <th className="py-3 px-6 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index} className="border-b border-[#1f1f2e]">
                    <td colSpan={5} className="py-6 px-6">
                      <div className="h-4 w-full bg-[#1f1f2e] rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              : data.map((spender) => (
                  <tr
                    key={spender.id}
                    className="border-b border-[#1f1f2e] last:border-0 hover:bg-[#1a1a2e] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0 ${
                            AVATAR_COLORS[spender.id % AVATAR_COLORS.length]
                          }`}
                        >
                          {spender.avatar}
                        </span>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {spender.customer_name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {spender.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-sm font-semibold text-[#39ff14]">
                      $
                      {spender.ltv.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>

                    <td className="py-4 px-6 text-sm text-gray-300">
                      {spender.last_active}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          SEGMENT_STYLES[spender.segment] ??
                          "bg-[#2a2a3e] text-gray-300"
                        }`}
                      >
                        {spender.segment}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-t border-[#2a2a3e]">
        <span className="text-sm text-gray-500">
          Showing {data.length} of {totalUsers.toLocaleString()} users
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a3e] text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1f1f2e] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={data.length < 4}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a3e] text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1f1f2e] transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
