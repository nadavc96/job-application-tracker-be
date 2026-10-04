import { Table } from "@/components/ui/table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { getApplications } from "@/lib/api/applications";
type app = {
  appID: string;
  company: string;
  role: string;
  status: string;
  url: string | null;
};
export function ApplicationTable() {
  const [applications, setApplications] = useState<app[]>([]);
  useEffect(() => {
    const fetchApplications = async () => {
      const apps = await getApplications();
      setApplications(apps);
    };
    fetchApplications();
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Job URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.appID}>
            <TableCell>{app.company}</TableCell>
            <TableCell>{app.role}</TableCell>
            <TableCell>
              <Badge>{app.status}</Badge>
            </TableCell>
            <TableCell>{app.url}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
