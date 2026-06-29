import SummaryCards from "../components/SummaryCard";
import RevenueAnalyticsCard from "../components/RevenueAnalyticsCard";
import ProductPerformance from "../components/ProductPerformance";
import PaymentDistribution from "../components/PaymentDistribution";

export default function Homepage() {
  return (
    <>
      <div>
        <SummaryCards />
      </div>

      <div className="py-4">
        <RevenueAnalyticsCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductPerformance />
        <PaymentDistribution />
      </div>
    </>
  );
}
