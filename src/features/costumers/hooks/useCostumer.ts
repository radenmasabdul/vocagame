import { useState } from "react";
import { useGetCostumerSummary, useGetCostumerTopSpender, useGetCostumerAcquisition, useGetCostumerGeographicalDistribution } from "../services/costumer.service";

const LIMIT = 4;

export function useCustomers() {
  const [page, setPage] = useState(1);

  const summary = useGetCostumerSummary();
  const topSpenders = useGetCostumerTopSpender({ page, limit: LIMIT });
  const acquisition = useGetCostumerAcquisition();
  const geo = useGetCostumerGeographicalDistribution();
  
  const totalUsers = summary.data?.active_users_online.current ?? 0;

  function calcChange(current: number, previous: number) {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  }

  return {
    summary: summary.data,
    summaryLoading: summary.isLoading,
    topSpenders: topSpenders.data ?? [],
    topSpendersLoading: topSpenders.isLoading,
    acquisition: acquisition.data ?? [],
    acquisitionLoading: acquisition.isLoading,
    geo: geo.data ?? [],
    geoLoading: geo.isLoading,
    page,
    setPage,
    totalUsers,
    calcChange,
  };
}
