import { Briefcase, Activity, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Total Applications",
    value: 24,
    color: "text-foreground",
    icon: Briefcase,
  },
  {
    label: "Active",
    value: 17,
    color: "text-foreground",
    icon: Activity,
  },
  {
    label: "Interviews",
    value: 5,
    color: "text-indigo-600",
    icon: CalendarCheck,
  },
  {
    label: "Offers",
    value: 2,
    color: "text-green-600",
    icon: CheckCircle2,
  },
];

export function StatsCards() {
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
              <div
                className={`justify-center flex text-xl font-semibold ${stat.color}`}
              >
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
