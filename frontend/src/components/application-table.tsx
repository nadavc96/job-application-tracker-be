import { ApplicationTableSkeleton } from "@/components/application-table-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type APPLICATION } from "@/types/application";
import { ApplicationRow } from "./application-row";

const COLUMNS = ["Company", "Role", "Status", "Job URL", "Edit"];

interface ApplicationTableProps {
  applications: APPLICATION[];
  loading: boolean;
  onUpdate: (appID: string, changes: Partial<APPLICATION>) => void;
  onDelete: (appID: string) => void;
  searchTerm: string;
}

export function ApplicationTable({
  applications,
  loading,
  onUpdate,
  onDelete,
  searchTerm,
}: ApplicationTableProps) {
  return (
    <div className="flex items-center justify-center pt-5">
      <div className="w-full max-w-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableHead key={col} className="text-center">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <ApplicationTableSkeleton rows={10} columns={5} />
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  {searchTerm?.trim()
                    ? `No applications match "${searchTerm}".`
                    : "No applications yet"}
                  {/* No applications yet. */}
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <ApplicationRow
                  key={app.appID}
                  app={app}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
