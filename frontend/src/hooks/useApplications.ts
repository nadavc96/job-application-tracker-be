import { useCallback, useEffect, useState } from "react";
import { getApplications } from "@/lib/api/applications";
import type { APPLICATION } from "@/types/application";

export function useApplications() {
  const [applications, setApplications] = useState<APPLICATION[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setError(null);
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateApplication = useCallback(
    (appID: string, changes: Partial<APPLICATION>) =>
      setApplications((prev) =>
        prev.map((a) => (a.appID === appID ? { ...a, ...changes } : a)),
      ),
    [],
  );

  const addApplication = useCallback(
    (app: APPLICATION) => setApplications((prev) => [app, ...prev]),
    [],
  );

  return {
    applications,
    loading,
    error,
    updateApplication,
    addApplication,
    refetch: fetchApplications,
  };
}
