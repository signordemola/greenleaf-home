import { notFound } from "next/navigation";
import { loadPortalClient } from "@/lib/portal-data";
import { Card, CardContent } from "@/components/ui/card";
import { VisitActions } from "@/components/portal/visit-actions";
import { formatDate, getTimeWindowLabel } from "@/lib/utils";

const PortalSchedule = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const client = await loadPortalClient(token);
  if (!client) notFound();

  const upcoming = [...client.visits]
    .filter((v) => v.status === "SCHEDULED" || v.status === "CONFIRMED")
    .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl leading-tight">Upcoming cleans</h1>
        <p className="mt-2 text-muted-foreground">
          Reschedule or skip any visit — free up to 48 hours before.
        </p>
      </div>

      {upcoming.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-10 text-center text-muted-foreground">
            No upcoming visits scheduled.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {upcoming.map((visit) => (
            <Card key={visit.id} className="border-border">
              <CardContent className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-lg">
                    {formatDate(visit.scheduledDate)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getTimeWindowLabel(visit.timeWindow)}
                  </p>
                </div>
                {visit.crew && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {visit.crew.name} ·{" "}
                    {visit.crew.cleaners.map((c) => c.name).join(" & ")}
                  </p>
                )}
                <VisitActions token={token} visitId={visit.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortalSchedule;
