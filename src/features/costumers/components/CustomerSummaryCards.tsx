import StatCard from "./StatCard";
import type { CostumerSummary } from "../services/costumer.service";
import { ShieldCheck, UserRoundPlus, UserX } from "lucide-react";

interface CustomerSummaryCardsProps {
  summary?: CostumerSummary;
  loading: boolean;
}

export default function CustomerSummaryCards({
  summary,
  loading,
}: CustomerSummaryCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#15151f] border border-[#2a2a3e] rounded-2xl p-5 h-32 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        label="New Segments"
        current={summary?.new_segments?.current ?? 0}
        previous={summary?.new_segments?.previous ?? 0}
        description="Customers acquired in the last 7 days"
        icon={<UserRoundPlus size={50} />}
      />

      <StatCard
        label="Retaining"
        current={summary?.retaining?.current ?? 0}
        previous={summary?.retaining?.previous ?? 0}
        description="Loyal users with 3+ repeat actions"
        icon={<ShieldCheck size={50} />}
      />

      <StatCard
        label="Churned"
        current={summary?.churned?.current ?? 0}
        previous={summary?.churned?.previous ?? 0}
        description="Users inactive for over 30 days"
        isNegativeGood
        icon={<UserX size={50} />}
      />
    </div>
  );
}
