export const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Success", value: "success" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

export const METHOD_OPTIONS = [
  { label: "All Methods", value: "" },
  { label: "PayPal", value: "PayPal" },
  { label: "QRIS", value: "QRIS" },
  { label: "Wire Transfer", value: "Wire Transfer" },
  { label: "Visa Card", value: "Visa Card" },
  { label: "Credit Card", value: "Credit Card" },
];

export const STATUS_STYLES: Record<string, string> = {
  success: "bg-[#0f2a1c] text-[#4ade80] border border-[#1d4d33]",
  pending: "bg-[#2a2a2e] text-gray-300 border border-[#3a3a3e]",
  failed: "bg-[#3d1d1d] text-[#f87171] border border-[#5c2929]",
};

export const STATUS_LABELS: Record<string, string> = {
  success: "Success",
  pending: "Pending",
  failed: "Failed",
};

export const AVATAR_COLORS = [
  "bg-[#dc2626]",
  "bg-[#16a34a]",
  "bg-[#2563eb]",
  "bg-[#9333ea]",
  "bg-[#ca8a04]",
  "bg-[#0891b2]",
];