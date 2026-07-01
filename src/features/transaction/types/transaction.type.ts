import type { DateRange } from "react-day-picker";
import { type Transaction } from "../services/transaction.service";

export interface TransactionFiltersBarProps {
  search: string;
  status: string;
  method: string;
  dateRange: DateRange | undefined;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMethodChange: (value: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
  onPageChange: (page: number) => void;
}