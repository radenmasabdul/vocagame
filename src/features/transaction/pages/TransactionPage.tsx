import TransactionFiltersBar from "../components/TransactionFiltersBar";
import TransactionsTable from "../components/TransactionsTable";
import { useTransactions } from "../hooks/useTransactions";

export default function TransactionPage() {
  const {
    transactions,
    isLoading,
    filters,
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
  } = useTransactions();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-sm md:text-base font-normal text-[#E5E1E4]">
          Transactions
        </h1>
        <p className="text-sm md:text-base font-normal text-[#C7C4D7] mt-1">
          Manage and monitor all platform financial activity.
        </p>
      </div>

      <div className="bg-[#18181BB2] border border-[#27272A] rounded-xl p-3 shadow-lg">
        <TransactionFiltersBar
          search={filters.search}
          status={filters.status}
          method={filters.method}
          dateRange={filters.dateRange}
          onSearchChange={updateSearch}
          onStatusChange={updateStatus}
          onMethodChange={updateMethod}
          onDateRangeChange={updateDateRange}
        />
      </div>

      <TransactionsTable
        transactions={transactions}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        startItem={startItem}
        endItem={endItem}
        onPageChange={setPage}
      />
    </div>
  );
}
