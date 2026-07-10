import { loadPortalClient } from "@/lib/portal-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatUsd, getTimeWindowLabel } from "@/lib/utils";
import { FREQUENCY_LABELS } from "@/lib/booking-constants";
import { notFound } from "next/navigation";

const DB_TO_FREQUENCY = {
  WEEKLY: "weekly",
  BIWEEKLY: "biweekly",
  MONTHLY: "monthly",
  ONE_TIME: "once",
} as const;

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-forest/10 text-forest",
  PAUSED: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-muted text-muted-foreground",
};

const PortalOverview = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const client = await loadPortalClient(token);
  if (!client) notFound();

  const plan =
    client.plans.find((p) => p.status !== "CANCELLED") ?? client.plans[0];
  const nextVisit = [...client.visits]
    .filter((v) => v.status === "SCHEDULED")
    .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())[0];
  const cleaners = plan?.assignedCrew?.cleaners ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl leading-tight">Welcome back.</h1>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s your plan at a glance.
        </p>
      </div>

      {plan ? (
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Your plan
            </p>
            <Badge className={STATUS_STYLE[plan.status]}>
              {plan.status.toLowerCase()}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <Stat label="Service" value={plan.serviceType.name} />
            <Stat
              label="Frequency"
              value={FREQUENCY_LABELS[DB_TO_FREQUENCY[plan.frequency]]}
            />
            <Stat
              label="Per visit"
              value={formatUsd(plan.recurringPrice + plan.addOnTotal)}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border">
          <CardContent className="py-8 text-center text-muted-foreground">
            You don&apos;t have an active plan yet.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Next clean
            </p>
          </CardHeader>
          <CardContent>
            {nextVisit ? (
              <>
                <p className="font-display text-xl">
                  {formatDate(nextVisit.scheduledDate)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {getTimeWindowLabel(nextVisit.timeWindow)}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">No visit scheduled.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Your crew
            </p>
          </CardHeader>
          <CardContent>
            {cleaners.length > 0 ? (
              <>
                <p className="font-display text-xl">
                  {plan?.assignedCrew?.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cleaners.map((c) => c.name).join(" & ")}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">
                Crew assigned before your first visit.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
      {label}
    </p>
    <p className="mt-1 font-medium text-foreground">{value}</p>
  </div>
);

export default PortalOverview;
