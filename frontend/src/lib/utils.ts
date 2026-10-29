import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeUrl = (raw?: string | null) => {
  const url = raw?.trim();
  if (!url) return null;

  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};
