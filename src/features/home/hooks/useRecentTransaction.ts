import { useState } from "react";
import { useGetTransaction } from "@/features/transaction/services/transaction.service";

export interface Transaction {
  id: number;
  transaction_id: string;
  customer_name: string;
  customer_email: string;
  avatar: string;
  amount: number;
  method: string;
  status: "success" | "pending" | "failed";
  date: string;
}

export const STATUS_STYLES: Record<string, string> = {
  success: "bg-[#0f2a1c] text-[#4ade80] border border-[#1d4d33]",
  pending: "bg-[#2a2a2e] text-gray-300 border border-[#3a3a3e]",
  failed: "bg-[#7f1d1d] text-white border border-[#991b1b]",
}

export const AVATAR_COLORS = [
  "bg-[#4338ca]",
  "bg-[#15803d]",
  "bg-[#7e22ce]",
  "bg-[#9a3412]",
  "bg-[#3730a3]",
]

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function useRecentTransaction() {
  const { data, isLoading } = useGetTransaction();
  const [showAll, setShowAll] = useState(false);

  const transactions = (data ?? []) as Transaction[];

  const displayedTransactions = showAll
    ? transactions
    : transactions.slice(0, 5);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return {
    isLoading,
    showAll,
    transactions,
    displayedTransactions,
    toggleShowAll,
  };
}