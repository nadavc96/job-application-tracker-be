import { useMemo } from "react";
import { Briefcase, Activity, CalendarCheck, CheckCircle2 } from "lucide-react";
import type { APPLICATION, STATS } from "@/types/application";

export function useDashboardStats(applications: APPLICATION[]) {
  return useMemo<STATS[]>(() => {
    const count = (status: string) =>
      applications.filter((a) => a.status === status).length;

    return [
      {
        label: "Total Applications",
        value: applications.length,
        icon: Briefcase,
      },
      {
        label: "Active",
        value: applications.length - count("rejected"),
        icon: Activity,
      },
      {
        label: "Interviews",
        value: count("interview"),
        icon: CalendarCheck,
        color: "text-indigo-600",
      },
      {
        label: "Offers",
        value: count("offer"),
        icon: CheckCircle2,
        color: "text-green-600",
      },
    ];
  }, applications);
}
