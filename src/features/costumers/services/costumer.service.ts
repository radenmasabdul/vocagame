import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface TopSpender {
  id: number;
  customer_name: string;
  email: string;
  avatar: string;
  ltv: number;
  last_active: string;
  segment: string;
}

export interface SummaryMetric {
  current: number;
  previous: number;
}

export interface CostumerSummary {
  active_users_online: SummaryMetric;
  new_segments: SummaryMetric;
  retaining: SummaryMetric;
  churned: SummaryMetric;
}

export interface CostumerAcquisition {
  id: number;
  month: string;
  month_index: number;
  new_users: number;
  returning_users: number;
}

export interface CostumerGeographicalDistribution {
  id: number;
  region: string;
  user_count: number;
  percentage: number;
  color: string;
}

interface TopSpenderParams {
  page?: number;
  limit?: number;
  segment?: string;
}

export function useGetCostumerSummary(){
  return useQuery<CostumerSummary>({
    queryKey: ["customers-summary"],
    queryFn: () => apiClient("/customers/summary"),
  });
}

export function useGetCostumerTopSpender(params?: TopSpenderParams){
  return useQuery<TopSpender[]>({
    queryKey: ["customer-top-spenders", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params?.page) searchParams.set("_page", params.page.toString());

      if (params?.limit) searchParams.set("_limit", params.limit.toString());

      if (params?.segment) searchParams.set("status", params.segment);

      return apiClient(`/customers/top-spenders?${searchParams.toString()}`);
    },
  });
}

export function useGetCostumerAcquisition(){
  return useQuery<CostumerAcquisition[]>({
    queryKey: ["customer-acquisition"],
    queryFn: () => apiClient("/customers/acquisition"),
  });
}

export function useGetCostumerGeographicalDistribution(){
  return useQuery<CostumerGeographicalDistribution[]>({
    queryKey: ["customer-geographical-distribution"],
    queryFn: () => apiClient("/customers/geo"),
  });
}