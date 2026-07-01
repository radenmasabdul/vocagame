import type { DateRange } from "react-day-picker";

export function formatDateRange(range: DateRange | undefined): string {
  if (!range?.from) return "Select date";

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  if (!range.to) return fmt(range.from);

  return `${fmt(range.from)} - ${fmt(range.to)}, ${range.to.getFullYear()}`;
}

export function formatDate(iso: string) {
  const d = new Date(iso);

  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${date} • ${time}`;
}
