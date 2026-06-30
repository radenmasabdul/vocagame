import { useGetProductPerformance } from "../services/home.service";

export interface Product {
  name: string;
  revenue: number;
}

export function formatRevenue(value: number) {
  return value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value}`;
}

export function useProductPerformance() {
  const { data, isLoading } = useGetProductPerformance();
  const products = (data ?? []) as Product[];
  const maxRevenue =
    products.length > 0 ? Math.max(...products.map((p) => p.revenue)) : 0;

  return {
    isLoading,
    products,
    maxRevenue,
  };
}
