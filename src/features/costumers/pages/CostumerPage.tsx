import CustomerHeader from "../components/CostumerHeader";
import CustomerSummaryCards from "../components/CustomerSummaryCards";
import AcquisitionSection from "../components/AcquisitionSection";
import GeoDistributionSection from "../components/GeoDistributionSection";
import TopSpendersTable from "../components/TopSpendersTable";
import { useCustomers } from "../hooks/useCostumer";

export default function CustomersPage() {
  const {
    summary,
    summaryLoading,
    topSpenders,
    topSpendersLoading,
    acquisition,
    acquisitionLoading,
    geo,
    page,
    setPage,
    totalUsers,
  } = useCustomers();

  return (
    <div className="flex flex-col gap-6 p-6">
      <CustomerHeader totalUsers={totalUsers} />

      <CustomerSummaryCards summary={summary} loading={summaryLoading} />

      <div className="grid grid-cols-3 gap-4">
        <AcquisitionSection data={acquisition} loading={acquisitionLoading} />

        <GeoDistributionSection geo={geo} />
      </div>

      <TopSpendersTable
        data={topSpenders}
        loading={topSpendersLoading}
        page={page}
        setPage={setPage}
        totalUsers={totalUsers}
      />
    </div>
  );
}
