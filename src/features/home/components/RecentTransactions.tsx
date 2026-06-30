import {
  useRecentTransaction,
  STATUS_STYLES,
  AVATAR_COLORS,
  initials,
} from "../hooks/useRecentTransaction";

export default function RecentTransactions() {
  const { isLoading, showAll, displayedTransactions, toggleShowAll } = useRecentTransaction();

  return (
    <div className="bg-[#201F22] border border-[#2a2a3e] rounded-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-xl font-medium text-[#E5E1E4]">
          Recent Transactions
        </h2>

        <button
          onClick={toggleShowAll}
          className="text-sm font-medium text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#2a2a3e]">
              <th className="py-3 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Transaction ID
              </th>

              <th className="py-3 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Customer
              </th>

              <th className="py-3 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Amount
              </th>

              <th className="py-3 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Method
              </th>

              <th className="py-3 text-xs font-medium text-gray-500 tracking-wider uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-[#2a2a3e]">
                    <td colSpan={5} className="py-5">
                      <div className="h-4 w-full bg-[#2a2a3e] rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              : displayedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-[#2a2a3e] last:border-0"
                  >
                    <td className="py-4 font-mono text-sm text-gray-300">
                      {tx.transaction_id}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0 ${
                            AVATAR_COLORS[
                              tx.customer_name.charCodeAt(0) %
                                AVATAR_COLORS.length
                            ]
                          }`}
                        >
                          {tx.avatar || initials(tx.customer_name)}
                        </span>

                        <div>
                          <div className="text-sm text-gray-200">
                            {tx.customer_name}
                          </div>

                          <div className="text-xs text-gray-500">
                            {tx.customer_email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 font-mono text-sm text-gray-200">
                      $
                      {tx.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>

                    <td className="py-4 text-sm text-gray-300">{tx.method}</td>

                    <td className="py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          STATUS_STYLES[tx.status]
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
