import { Briefcase, Activity, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type APPLICATION } from "@/types/application";

interface StatCardProps {
  applications: APPLICATION[];
  loading: boolean;
}

export function StatsCards({ applications, loading }: StatCardProps) {
  const count = (status: string) =>
    applications.filter((a) => a.status === status).length;

  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      color: "text-foreground",
      icon: Briefcase,
    },
    {
      label: "Active",
      value: applications.filter((a) => a.status !== "Rejected").length,
      color: "text-foreground",
      icon: Activity,
    },
    {
      label: "Interviews",
      value: count("interview"),
      color: "text-indigo-600",
      icon: CalendarCheck,
    },
    {
      label: "Offers",
      value: count("offer"),
      color: "text-green-600",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 max-w-full md:flex md:flex-wrap md:gap-20">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="relative p-3 gap-1 md:flex-1 md:min-w-35"
          >
            <Icon
              className={`absolute bottom-3 right-3 h-3.5 w-3.5 ${stat.color}`}
            />
            <CardContent className="p-0">
              <span className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </span>
              <div className="flex justify-center">
                {loading ? (
                  <Skeleton className="h-7 w-8" />
                ) : (
                  <span className={`text-xl font-semibold ${stat.color}`}>
                    {stat.value}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
