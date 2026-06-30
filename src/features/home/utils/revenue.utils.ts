export interface TooltipData {
  x: number;
  y: number;
  date: string;
  value: number;
  prevValue?: number;
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

export function buildLabels(data: { key: string }[], days: number) {
  const step = Math.max(1, Math.floor(days / 5));

  return data.map((item, index) =>
    index === 0 || index % step === 0 || index === data.length - 1
      ? item.key
      : "",
  );
}
