import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export function useGetSummary(){
  return useQuery({
    queryKey: ["summary"],
    queryFn: () => apiClient("/dashboard/summary"),
  });
}

export function useGetProductPerformance(){
  return useQuery({
    queryKey: ["product-performance"],
    queryFn: () => apiClient("/product-performance"),
  })
}

export function useGetPaymentDistribution(){
  return useQuery({
    queryKey: ["payment-distribution"],
    queryFn: () => apiClient("/payment-distribution"),
  })
}

export function useGetActivity(){
  return useQuery({
    queryKey: ["activity"],
    queryFn: () => apiClient("/activity-feed"),
  })
}