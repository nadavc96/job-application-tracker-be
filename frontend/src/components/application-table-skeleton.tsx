import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function ApplicationTableSkeleton({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) {
  return Array.from({ length: rows }).map((_, i) => (
    <TableRow key={i}>
      {Array.from({ length: columns }).map((_, j) => (
        <TableCell key={j}>
          <Skeleton className="mx-auto h-5 w-24" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
