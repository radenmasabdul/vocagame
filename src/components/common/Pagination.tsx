import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildPageList } from "@/utils/build-page-list";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  startItem,
  endItem,
  onPageChange,
}: PaginationProps) {
  const pages = buildPageList(page, totalPages);

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t border-[#2a2a3e]">
      <span className="text-sm text-gray-500">
        Showing {startItem}-{endItem} of {totalItems.toLocaleString()}{" "}
        transactions
      </span>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a3e] text-gray-400 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-1 text-sm text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-sm ${
                p === page ? "bg-[#6d5fde] text-white" : "text-gray-400"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a3e] text-gray-400 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
