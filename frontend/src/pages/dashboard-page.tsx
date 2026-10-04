import { ApplicationTable } from "@/components/application-table";
import { Navbar } from "@/components/navbar";
import { StatsCards } from "@/components/stats-card";

export function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="p-15 flex flex-col gap-6">
        <div>
          <h2 className="mb-2 font-extrabold">Dashboard</h2>
          <p className="text-gray-500">
            Track and manage your active job search.
          </p>
        </div>
        <div className="justify-center items-center flex">
          <StatsCards />
        </div>
        {/* <ApplicationTable /> */}
      </div>
    </>
  );
}
