"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  QuoteBreakdown,
  HomeSize,
  ServiceTypeSlug,
  PlanFrequency,
} from "@/types/booking";
import {
  SIZE_LABELS,
  SERVICE_LABELS,
  FREQUENCY_LABELS,
} from "@/lib/booking-constants";
import { formatUsd } from "@/lib/utils";

interface Props {
  quote: QuoteBreakdown;
  size: HomeSize;
  service: ServiceTypeSlug;
  frequency: PlanFrequency;
}

export const InstantQuoteDisplay = ({
  quote,
  size,
  service,
  frequency,
}: Props) => {
  return (
    <Card className="sticky top-8 border-border bg-background shadow-xl">
      <CardHeader className="pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Your estimate
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-border/60 pb-5">
          <div>
            <p className="font-display text-5xl text-foreground">
              {formatUsd(quote.recurringTotal ?? quote.firstVisitTotal)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {quote.recurringTotal !== null
                ? "per recurring visit"
                : "first visit"}
            </p>
          </div>
          {quote.recurringTotal !== null && (
            <Badge
              variant="secondary"
              className="bg-forest/10 text-forest hover:bg-forest/10 font-normal"
            >
              {quote.discountPercentage}% off recurring
            </Badge>
          )}
        </div>

        <dl className="space-y-3 text-sm">
          <SummaryRow label="Home size" value={SIZE_LABELS[size as HomeSize]} />
          <SummaryRow
            label="Service"
            value={SERVICE_LABELS[service as ServiceTypeSlug]}
          />
          <SummaryRow
            label="Frequency"
            value={FREQUENCY_LABELS[frequency as PlanFrequency]}
          />
          <Separator className="my-2" />
          <SummaryRow label="Base price" value={formatUsd(quote.basePrice)} />
          {quote.addonTotal > 0 && (
            <SummaryRow
              label="Add-ons"
              value={`+${formatUsd(quote.addonTotal)}`}
            />
          )}
          {quote.recurringTotal !== null && (
            <SummaryRow
              label="First visit"
              value={formatUsd(quote.firstVisitTotal)}
              hint="Initial deep clean"
            />
          )}
        </dl>

        <div className="rounded-sm bg-linen/60 p-4 text-xs leading-relaxed text-muted-foreground">
          Cancellation: free up to 48 hrs before. Pause your plan anytime — we
          hold your slot for up to four weeks.
        </div>
      </CardContent>
    </Card>
  );
};

const SummaryRow = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) => {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-muted-foreground">{label}</span>
      <div className="text-right">
        <span className="block text-foreground font-medium">{value}</span>
        {hint && (
          <span className="text-[10px] text-muted-foreground">{hint}</span>
        )}
      </div>
    </div>
  );
};
