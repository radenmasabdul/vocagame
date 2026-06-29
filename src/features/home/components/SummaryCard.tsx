import { useSummaryData } from "../hooks/useSummaryData";
import { StatCard, StatCardSkeleton } from "./StatCard";

export default function SummaryCards() {
  const { cards, isLoading } = useSummaryData();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <StatCard key={i} data={card} />
      ))}
    </div>
  );
}
