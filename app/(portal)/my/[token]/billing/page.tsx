import { notFound } from "next/navigation";
import { loadPortalClient } from "@/lib/portal-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatShortDate, formatUsd } from "@/lib/utils";

const PortalBilling = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const client = await loadPortalClient(token);
  if (!client) notFound();

  const charged = client.visits
    .filter((v) => v.paymentStatus === "CHARGED")
    .sort((a, b) => b.scheduledDate.getTime() - a.scheduledDate.getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl leading-tight">Billing</h1>
        <p className="mt-2 text-muted-foreground">
          Your card on file and payment history.
        </p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Card on file
          </p>
        </CardHeader>
        <CardContent>
          {client.stripePaymentMethodId ? (
            <p className="text-foreground">
              A card is securely saved for auto-charge after each clean.
            </p>
          ) : (
            <p className="text-muted-foreground">
              No card on file yet. You&apos;ll add one when you book.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Payment history
          </p>
        </CardHeader>
        <CardContent>
          {charged.length === 0 ? (
            <p className="text-muted-foreground">No charges yet.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {charged.map((visit) => (
                <li
                  key={visit.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-muted-foreground">
                    {formatShortDate(visit.paidAt ?? visit.scheduledDate)}
                  </span>
                  <span className="font-medium text-foreground">
                    {formatUsd(visit.totalPrice)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalBilling;
