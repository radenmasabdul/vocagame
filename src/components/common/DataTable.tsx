import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import type { ReactNode } from "react";

interface DataTableProps<T> {
  data: T[];
  columns: string[];
  isLoading?: boolean;
  renderRow: (item: T) => ReactNode;
  page: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
  onPageChange: (page: number) => void;
}

export default function DataTable<T>({
  data,
  columns,
  renderRow,
  isLoading = false,
  page,
  totalPages,
  totalItems,
  startItem,
  endItem,
  onPageChange,
}: DataTableProps<T>) {
  return (
    <div className="bg-[#18181BB2] border border-[#2a2a3e] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-sm md:text-base text-[#C7C4D7] font-bold">
            <tr className="border-b border-[#2a2a3e]">
              {columns.map((column) => (
                <th key={column} className="py-4 px-4">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <TableSkeleton colSpan={columns.length} />
            ) : (
              data.map(renderRow)
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        startItem={startItem}
        endItem={endItem}
        onPageChange={onPageChange}
      />
    </div>
  );
}
