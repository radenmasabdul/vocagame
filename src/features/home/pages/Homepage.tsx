import SummaryCards from "../components/SummaryCard";
import RevenueAnalyticsCard from "../components/RevenueAnalyticsCard";

export default function Homepage() {
  return (
    <>
      <div>
        <SummaryCards />
      </div>

      <div className="py-4">
        <RevenueAnalyticsCard />
      </div>
    </>
  );
}
