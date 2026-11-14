import type { LucideIcon } from "lucide-react";

export type APPLICATION = {
  appID: string;
  companyName: string;
  role: string;
  status: string;
  url: string | null;
};

export const STATUSES = ["applied", "interview", "offer", "rejected"];

export type STATS = {
  label: string;
  value: number;
  icon: LucideIcon;
  color?: string;
};
