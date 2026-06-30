import {
  CreditCard,
  Key,
  TriangleAlert,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { useGetActivity } from "../services/home.service";

export interface Activity {
  id: number;
  type: "payout" | "alert" | "api_key" | "organization";
  title: string;
  detail: string;
  timeAgo: string;
  highlight?: boolean;
}

export const ICON_MAP: Record<
  string,
  {
    icon: LucideIcon;
    bg: string;
    color: string;
  }
> = {
  payout: {
    icon: CreditCard,
    bg: "bg-[#0f2a1c]",
    color: "text-[#4ade80]",
  },
  alert: {
    icon: TriangleAlert,
    bg: "bg-[#7f1d1d]",
    color: "text-white",
  },
  api_key: {
    icon: Key,
    bg: "bg-[#2a2a3e]",
    color: "text-gray-300",
  },
  organization: {
    icon: UserPlus,
    bg: "bg-[#2a2a2e]",
    color: "text-gray-300",
  },
}

export function useActivityFeed() {
  const { data, isLoading } = useGetActivity();
  const activities = (data ?? []) as Activity[];
  const displayedActivities = activities.slice(0, 5);

  return {
    isLoading,
    displayedActivities,
  };
}
