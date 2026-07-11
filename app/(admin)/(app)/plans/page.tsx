import { connection } from "next/server";
import { getPlansHealth } from "@/lib/dashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatUsd } from "@/lib/utils";

const avgScore = (ratings: { score: number }[]) =>
  ratings.length === 0
    ? null
    : ratings.reduce((s, r) => s + r.score, 0) / ratings.length;

const PlansPage = async () => {
  await connection();
  const plans = await getPlansHealth();

  const active = plans.filter((p) => p.status === "ACTIVE");
  const paused = plans.filter((p) => p.status === "PAUSED");
  const cancelled = plans.filter((p) => p.status === "CANCELLED");

  const mrr = active.reduce(
    (sum, p) => sum + p.recurringPrice + p.addOnTotal,
    0,
  );
  const atRisk = active.filter((p) => {
    const avg = avgScore(p.client.ratings);
    return avg !== null && avg < 4;
  });

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl leading-tight">Plans</h1>

      <div className="grid gap-4 sm:grid-cols-4">
        <Kpi label="Active" value={String(active.length)} />
        <Kpi label="Paused" value={String(paused.length)} />
        <Kpi label="Cancelled" value={String(cancelled.length)} />
        <Kpi label="Est. recurring / cycle" value={formatUsd(mrr)} />
      </div>

      {atRisk.length > 0 && (
        <Section title="Churn risk (low ratings)">
          {atRisk.map((p) => (
            <Row
              key={p.id}
              name={p.client.name}
              detail={p.serviceType.name}
              tag="at risk"
              tone="risk"
            />
          ))}
        </Section>
      )}

      <Section title="Active plans">
        {active.map((p) => (
          <Row
            key={p.id}
            name={p.client.name}
            detail={`${p.serviceType.name} · ${formatUsd(p.recurringPrice + p.addOnTotal)}/visit`}
            tag={p.assignedCrew?.name ?? "Unassigned"}
          />
        ))}
      </Section>

      {paused.length > 0 && (
        <Section title="Paused">
          {paused.map((p) => (
            <Row
              key={p.id}
              name={p.client.name}
              detail={p.serviceType.name}
              tag="paused"
            />
          ))}
        </Section>
      )}
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

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="border-border">
    <CardHeader className="pb-2">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
    </CardHeader>
    <CardContent className="divide-y divide-border/50 p-0">
      {children}
    </CardContent>
  </Card>
);

const Row = ({
  name,
  detail,
  tag,
  tone,
}: {
  name: string;
  detail: string;
  tag: string;
  tone?: "risk";
}) => (
  <div className="flex items-center justify-between px-5 py-3">
    <div>
      <p className="font-medium text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
    <Badge
      className={
        tone === "risk"
          ? "bg-red-100 text-red-700"
          : "bg-muted text-muted-foreground"
      }
    >
      {tag}
    </Badge>
  </div>
);

export default PlansPage;
