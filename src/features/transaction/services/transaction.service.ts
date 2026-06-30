import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export function useGetTransaction(){
  return useQuery({
    queryKey: ["transaction"],
    queryFn: () => apiClient("/transactions"),
  })
}