import { connection } from "next/server";
import { getDashboardKpis, getTodaySchedule } from "@/lib/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { JobStatusControls } from "@/components/dashboard/job-status-controls";
import { formatUsd, getTimeWindowLabel } from "@/lib/utils";

const PortalDashboard = async () => {
  await connection();
  const [kpis, schedule] = await Promise.all([
    getDashboardKpis(),
    getTodaySchedule(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl leading-tight">Today</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Revenue (MTD)" value={formatUsd(kpis.revenueMtd)} />
        <Kpi label="Active plans" value={String(kpis.activePlans)} />
        <Kpi label="Cleans today" value={String(kpis.cleansToday)} />
        <Kpi
          label="Avg rating"
          value={kpis.avgRating ? `${kpis.avgRating.toFixed(2)}★` : "—"}
        />
      </div>

      <div>
        <h2 className="mb-4 font-display text-2xl">Today&apos;s schedule</h2>
        {schedule.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-10 text-center text-muted-foreground">
              No cleans scheduled today.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {schedule.map((visit) => (
              <Card key={visit.id} className="border-border">
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-medium text-foreground">
                      {visit.client.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {visit.client.address} ·{" "}
                      {getTimeWindowLabel(visit.timeWindow)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {visit.crew
                        ? `${visit.crew.name} · ${visit.crew.cleaners.map((c) => c.name).join(" & ")}`
                        : "Unassigned"}
                    </p>
                  </div>
                  <JobStatusControls visitId={visit.id} status={visit.status} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Kpi = ({ label, value }: { label: string; value: string }) => (
  <Card className="border-border">
    <CardContent className="p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-foreground">{value}</p>
    </CardContent>
  </Card>
);

export default PortalDashboard;
