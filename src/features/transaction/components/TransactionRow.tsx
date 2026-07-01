import { MoreVertical } from "lucide-react";
import { type Transaction } from "../services/transaction.service";
import { AVATAR_COLORS, STATUS_LABELS, STATUS_STYLES } from "../constants/constants";
import { formatDate } from "@/utils/format-date";

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <tr className="border-b border-[#1f1f2e] last:border-0 hover:bg-[#1a1a2e] transition-colors">
      <td className="py-4 px-4 font-mono text-sm text-[#a78bfa]">
        #{transaction.transaction_id}
      </td>

      <td className="py-4 px-4 text-sm text-gray-300 whitespace-nowrap">
        {formatDate(transaction.date)}
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0 ${
              AVATAR_COLORS[transaction.id % AVATAR_COLORS.length]
            }`}
          >
            {transaction.avatar}
          </span>

          <span className="text-sm text-gray-200">
            {transaction.customer_name}
          </span>
        </div>
      </td>

      <td className="py-4 px-4 font-mono text-sm font-semibold text-gray-100">
        $
        {transaction.amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </td>

      <td className="py-4 px-4 text-sm text-gray-300">{transaction.method}</td>

      <td className="py-4 px-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            STATUS_STYLES[transaction.status]
          }`}
        >
          {STATUS_LABELS[transaction.status]}
        </span>
      </td>

      <td className="py-4 px-4">
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}
