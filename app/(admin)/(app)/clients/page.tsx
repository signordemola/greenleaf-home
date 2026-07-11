import { connection } from "next/server";
import { getClientsOverview } from "@/lib/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FREQUENCY_LABELS } from "@/lib/booking-constants";

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

const ClientsPage = async () => {
  await connection();
  const clients = await getClientsOverview();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl leading-tight">Clients</h1>

      <Card className="border-border">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Last rating</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const plan =
                  client.plans.find((p) => p.status !== "CANCELLED") ??
                  client.plans[0];
                const lastRating = client.ratings[0];
                return (
                  <tr
                    key={client.id}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">
                        {client.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {client.city}, {client.state} {client.zipCode}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {plan
                        ? FREQUENCY_LABELS[DB_TO_FREQUENCY[plan.frequency]]
                        : "One-time"}
                    </td>
                    <td className="px-5 py-4">
                      {plan ? (
                        <Badge className={STATUS_STYLE[plan.status]}>
                          {plan.status.toLowerCase()}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {lastRating ? `${lastRating.score}★` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;
