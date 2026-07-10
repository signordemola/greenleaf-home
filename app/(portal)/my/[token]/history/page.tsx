import { notFound } from "next/navigation";
import { loadPortalClient } from "@/lib/portal-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingForm } from "@/components/portal/rating-form";
import { formatShortDate, formatUsd } from "@/lib/utils";

const PortalHistory = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const client = await loadPortalClient(token);
  if (!client) notFound();

  const past = client.visits.filter(
    (v) => v.status === "COMPLETED" || v.status === "SKIPPED",
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl leading-tight">Clean history</h1>
        <p className="mt-2 text-muted-foreground">
          Past visits, receipts, and your ratings.
        </p>
      </div>

      {past.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-10 text-center text-muted-foreground">
            No past visits yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {past.map((visit) => (
            <Card key={visit.id} className="border-border">
              <CardContent className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-lg">
                    {formatShortDate(visit.scheduledDate)}
                  </p>
                  <div className="flex items-center gap-3">
                    {visit.status === "SKIPPED" ? (
                      <Badge className="bg-muted text-muted-foreground">
                        skipped
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {formatUsd(visit.totalPrice)} ·{" "}
                        {visit.paymentStatus.toLowerCase()}
                      </span>
                    )}
                  </div>
                </div>
                {visit.crew && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {visit.crew.name}
                  </p>
                )}
                {visit.status === "COMPLETED" &&
                  (visit.rating ? (
                    <p className="mt-2 text-sm text-forest">
                      {"★".repeat(visit.rating.score)}
                      <span className="text-border">
                        {"★".repeat(5 - visit.rating.score)}
                      </span>
                      {visit.rating.comment && (
                        <span className="ml-2 text-muted-foreground">
                          “{visit.rating.comment}”
                        </span>
                      )}
                    </p>
                  ) : (
                    <RatingForm token={token} visitId={visit.id} />
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortalHistory;
