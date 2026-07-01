interface TableSkeletonProps {
  rows?: number;
  colSpan?: number;
}

export default function TableSkeleton({
  rows = 8,
  colSpan = 1,
}: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          <td colSpan={colSpan} className="py-6 px-4">
            <div className="h-4 w-full bg-[#1f1f2e] rounded animate-pulse" />
          </td>
        </tr>
      ))}
    </>
  );
}
