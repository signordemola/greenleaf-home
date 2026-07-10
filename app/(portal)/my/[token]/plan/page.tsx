import { notFound } from "next/navigation";
import { loadPortalClient } from "@/lib/portal-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlanControls } from "@/components/portal/plan-controls";
import { formatShortDate, formatUsd } from "@/lib/utils";

const PortalPlan = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const client = await loadPortalClient(token);
  if (!client) notFound();

  const plan =
    client.plans.find((p) => p.status !== "CANCELLED") ?? client.plans[0];

  if (!plan) {
    return (
      <Card className="border-border">
        <CardContent className="py-10 text-center text-muted-foreground">
          You don&apos;t have a plan yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl leading-tight">
          Manage your plan
        </h1>
        <p className="mt-2 text-muted-foreground">
          Pause, resume, change frequency, or cancel.
        </p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Details
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Detail
            label="Per visit"
            value={formatUsd(plan.recurringPrice + plan.addOnTotal)}
          />
          <Detail label="Discount" value={`${plan.discountPct}% recurring`} />
          <Detail label="Started" value={formatShortDate(plan.startDate)} />
          {plan.status === "PAUSED" && plan.resumeDate && (
            <Detail label="Resumes" value={formatShortDate(plan.resumeDate)} />
          )}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardContent className="p-6">
          <PlanControls
            token={token}
            planId={plan.id}
            status={plan.status}
            frequency={plan.frequency}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
      {label}
    </p>
    <p className="mt-1 font-medium text-foreground">{value}</p>
  </div>
);

export default PortalPlan;
