import { ApplicationTable } from "@/components/application-table";
import { Navbar } from "@/components/navbar";
import { StatsCards } from "@/components/stats-card";
import { useApplications } from "@/hooks/useApplications";

export function DashboardPage() {
  const {
    applications,
    loading,
    error,
    updateApplication,
    addApplication,
    removeApplication,
  } = useApplications();
  return (
    <>
      <Navbar addApplication={addApplication} />
      <div className="p-15 flex flex-col gap-6">
        <div>
          <h2 className="mb-2 font-extrabold">Dashboard</h2>
          <p className="text-gray-500">
            Track and manage your active job search.
          </p>
        </div>
        <div className="justify-center items-center flex">
          <StatsCards applications={applications} loading={loading} />
        </div>
        {error ? (
          <p className="text-center text-red-500">
            Failed to load applications.
          </p>
        ) : (
          <ApplicationTable
            applications={applications}
            loading={loading}
            onUpdate={updateApplication}
            onDelete={removeApplication}
          />
        )}
      </div>
    </>
  );
}
