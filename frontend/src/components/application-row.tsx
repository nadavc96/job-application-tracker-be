import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editApplication } from "@/lib/api/applications";
import { type APPLICATION, STATUSES } from "@/types/application";
import { normalizeUrl } from "@/lib/utils";

interface ApplicationRowProps {
  app: APPLICATION;
  onUpdate: (appID: string, changes: Partial<APPLICATION>) => void;
}

export function ApplicationRow({ app, onUpdate }: ApplicationRowProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<{ status: string; url: string | null }>({
    status: "",
    url: null,
  });
  const [saving, setSaving] = useState(false);

  const startEdit = (a: APPLICATION) => {
    setIsEditing(true);
    setDraft({ status: a.status, url: a.url ?? null });
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
            className="inline-block border-2 rounded-md px-3 py-1 transition hover:opacity-100 hover:bg-gray-300 dark:hover:bg-gray-800"
          >
            application url
          </a>
        ) : null}
      </TableCell>

      <TableCell className="text-center whitespace-nowrap">
        {isEditing ? (
          <>
            <Button size="sm" disabled={saving} onClick={() => save(app.appID)}>
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={cancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline" onClick={() => startEdit(app)}>
            Edit
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
