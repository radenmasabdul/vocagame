import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export function useGetCostumerSummary(){
  return useQuery({
    queryKey: ["costumer-summary"],
    queryFn: () => apiClient("/costumers/summary"),
  })
}

export function useGetCostumerTopSpender(){
  return useQuery({
    queryKey: ["costumer-top-spender"],
    queryFn: () => apiClient("/costumers/top-spender"),
  })
}

export function useGetCostumerAcquisition(){
  return useQuery({
    queryKey: ["costumer-acquisition"],
    queryFn: () => apiClient("/costumers/acquisition"),
  })
}

export function useGetCostumerGeographicalDistribution(){
  return useQuery({
    queryKey: ["costumer-geographical-distribution"],
    queryFn: () => apiClient("/costumers/geo"),
  })
}