import DataTable from "@/components/common/DataTable";
import TransactionRow from "./TransactionRow";
import type { TransactionsTableProps } from "../types/transaction.type";

export default function TransactionsTable({
  transactions,
  isLoading,
  page,
  totalPages,
  totalItems,
  startItem,
  endItem,
  onPageChange,
}: TransactionsTableProps) {
  return (
    <DataTable
      data={transactions}
      isLoading={isLoading}
      columns={[
        "Transaction ID",
        "Date",
        "Customer",
        "Amount",
        "Method",
        "Status",
        "",
      ]}
      renderRow={(tx) => <TransactionRow key={tx.id} transaction={tx} />}
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      startItem={startItem}
      endItem={endItem}
      onPageChange={onPageChange}
    />
  );
}
