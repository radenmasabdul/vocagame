import { Filter } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import SelectFilter from "@/components/common/SelectFilter";
import DateRangeFilter from "@/components/common/DateRangeFilter";
import { METHOD_OPTIONS, STATUS_OPTIONS } from "../constants/constants";
import { type TransactionFiltersBarProps } from "../types/transaction.type";

export default function TransactionFiltersBar({
  search,
  status,
  method,
  dateRange,
  onSearchChange,
  onStatusChange,
  onMethodChange,
  onDateRangeChange,
}: TransactionFiltersBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <SearchInput value={search} onChange={onSearchChange} />

      <SelectFilter
        value={status}
        options={STATUS_OPTIONS}
        onChange={onStatusChange}
      />

      <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />

      <SelectFilter
        value={method}
        options={METHOD_OPTIONS}
        onChange={onMethodChange}
      />

      <button className="bg-[#15151f] border border-[#2a2a3e] rounded-lg p-2.5 text-gray-400 hover:text-white transition-colors">
        <Filter size={16} />
      </button>
    </div>
  );
}
