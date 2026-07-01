import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface Transaction {
  id: number;
  transaction_id: string;
  customer_name: string;
  customer_email: string;
  avatar: string;
  amount: number;
  method: string;
  status: "success" | "pending" | "failed";
  date: string;
}

interface TransactionParams {
  page?: number;
  limit?: number;
  status?: string;
  method?: string;
}

export function useGetTransaction(params?: TransactionParams) {
  return useQuery<Transaction[]>({
    queryKey: ["transaction", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params?.page) searchParams.set("_page", params.page.toString());

      if (params?.limit) searchParams.set("_limit", params.limit.toString());

      if (params?.status) searchParams.set("status", params.status);

      if (params?.method) searchParams.set("method", params.method);

      return apiClient(`/transactions?${searchParams.toString()}`);
    },
  });
}