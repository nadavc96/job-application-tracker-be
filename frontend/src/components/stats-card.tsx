import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type STATS } from "@/types/application";

interface StatCardProps {
  stat: STATS;
  loading: boolean;
}

export function StatsCards({ stat, loading }: StatCardProps) {
  const Icon = stat.icon;
  const color = stat.color ?? "text-foreground";
  return (
    <Card className="relative aspect-square w-28 p-3 gap-1 items-center justify-center">
      <Icon className={`absolute bottom-2 right-2 h-3.5 w-3.5 ${color}`} />
      <CardContent className="p-0 flex flex-col items-center justify-center gap-1">
        <span className="text-xs font-medium text-muted-foreground text-center">
          {stat.label}
        </span>
        {loading ? (
          <Skeleton className="h-7 w-8" />
        ) : (
          <span className={`text-2xl font-semibold ${color}`}>
            {stat.value}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
