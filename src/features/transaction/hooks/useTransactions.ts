import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { useGetTransaction } from "../services/transaction.service";

const PAGE_SIZE = 10;

export function useTransactions() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>();

  const { data, isLoading } = useGetTransaction({
    status: status || undefined,
    method: method || undefined,
  });

  const transactions = data ?? [];

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      !search ||
      tx.transaction_id.toLowerCase().includes(search.toLowerCase()) ||
      tx.customer_name.toLowerCase().includes(search.toLowerCase());

    const txDate = new Date(tx.date);

    const matchesDateRange =
      !dateRange?.from ||
      (txDate >= dateRange.from && (!dateRange.to || txDate <= dateRange.to));

    return matchesSearch && matchesDateRange;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const paginatedTransactions = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const startItem = totalItems === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;

  const endItem = Math.min(page * PAGE_SIZE, totalItems);

  const updateStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const updateMethod = (value: string) => {
    setMethod(value);
    setPage(1);
  };

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateDateRange = (range: DateRange | undefined) => {
    setDateRange(range);
    setPage(1);
  };

  return {
    transactions: paginatedTransactions,
    isLoading,
    filters: { search, status, method, dateRange },
    updateSearch,
    updateStatus,
    updateMethod,
    updateDateRange,
    page,
    setPage,
    totalPages,
    totalItems,
    startItem,
    endItem,
  };
}
