import { useState } from "react";
import { Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  deleteApplicationFromDB,
  editApplication,
} from "@/lib/api/applications";
import { type APPLICATION, STATUSES } from "@/types/application";
import { normalizeUrl } from "@/lib/utils";
import { toast } from "sonner";

interface ApplicationRowProps {
  app: APPLICATION;
  onUpdate: (appID: string, changes: Partial<APPLICATION>) => void;
  onDelete: (appID: string) => void;
}

export function ApplicationRow({
  app,
  onUpdate,
  onDelete,
}: ApplicationRowProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [draft, setDraft] = useState<{ status: string; url: string | null }>({
    status: "",
    url: null,
  });
  const [saving, setSaving] = useState(false);

  const startEdit = (a: APPLICATION) => {
    setIsEditing(true);
    setDraft({ status: a.status, url: a.url ?? null });
  };

  const handleDelete = async (app: APPLICATION) => {
    try {
      setDeleting(true);
      await deleteApplicationFromDB(app.appID);
      onDelete(app.appID);
      toast.success("Application deleted");
    } catch (err) {
      toast.error("Couldn't delete application", {
        description: "Something went wrong. Please try again",
      });
    } finally {
      setDeleting(false);
    }
  };

  const cancel = () => {
    setIsEditing(false);
  };

  const save = async (appID: string) => {
    const normalizedUrl = normalizeUrl(draft.url);

    try {
      setSaving(true);
      await editApplication(appID, draft.status, normalizedUrl);
      onUpdate(appID, { status: draft.status, url: normalizedUrl });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update application", err);
      toast.error("Couldn't save changes", { description: "Please try again" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <TableRow className="text-center">
      <TableCell>{app.companyName}</TableCell>
      <TableCell>{app.role}</TableCell>
      <TableCell>
        {isEditing ? (
          <select
            value={draft.status}
            onChange={(e) => setDraft({ ...draft, status: e.target.value })}
            className="h-9 rounded-md border bg-transparent px-2 text-sm"
          >
            {STATUSES.map((s) => (
              <option
                key={s}
                value={s}
                className="bg-background text-foreground"
              >
                {s}
              </option>
            ))}
          </select>
        ) : (
          <Badge>{app.status}</Badge>
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            type="url"
            value={draft.url ?? ""}
            placeholder="https://..."
            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
          />
        ) : app.url ? (
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 rounded-md px-3 py-1 transition hover:opacity-100 hover:bg-gray-300 dark:hover:bg-gray-800"
          >
            application url
          </a>
        ) : null}
      </TableCell>

      <TableCell className="text-center whitespace-nowrap">
        {isEditing ? (
          <div className="flex items-center justify-center gap-2">
            <Button size="sm" disabled={saving} onClick={() => save(app.appID)}>
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={saving}
              onClick={cancel}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Button size="sm" variant="outline" onClick={() => startEdit(app)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={deleting}
              onClick={() => handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
