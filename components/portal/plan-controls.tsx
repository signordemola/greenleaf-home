"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  pausePlanAction,
  resumePlanAction,
  upgradePlanAction,
  cancelPlanAction,
} from "@/actions/plan.actions";
import type { ActionResult } from "@/types/action-result";

type Frequency = "WEEKLY" | "BIWEEKLY" | "MONTHLY";

export const PlanControls = ({
  token,
  planId,
  status,
  frequency,
}: {
  token: string;
  planId: string;
  status: string;
  frequency: string;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [newFrequency, setNewFrequency] = useState<Frequency>(
    frequency === "WEEKLY" ? "BIWEEKLY" : "WEEKLY",
  );

  const run = (fn: () => Promise<ActionResult<unknown>>) =>
    startTransition(async () => {
      setError("");
      const result = await fn();
      if (result.ok) router.refresh();
      else setError(result.error);
    });

  if (status === "CANCELLED") {
    return (
      <p className="text-sm text-muted-foreground">
        This plan has been cancelled.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {status === "ACTIVE" && (
          <Button
            onClick={() => run(() => pausePlanAction(token, { planId }))}
            disabled={pending}
            variant="outline"
            className="rounded-full"
          >
            Pause plan
          </Button>
        )}
        {status === "PAUSED" && (
          <Button
            onClick={() => run(() => resumePlanAction(token, { planId }))}
            disabled={pending}
            className="rounded-full bg-forest text-white hover:opacity-90"
          >
            Resume plan
          </Button>
        )}
        <Button
          onClick={() => run(() => cancelPlanAction(token, { planId }))}
          disabled={pending}
          variant="ghost"
          className="rounded-full text-muted-foreground"
        >
          Cancel plan
        </Button>
      </div>

      {status === "ACTIVE" && (
        <div className="flex flex-wrap items-center gap-3 border-t border-border/60 pt-5">
          <span className="text-sm text-muted-foreground">
            Change frequency
          </span>
          <select
            value={newFrequency}
            onChange={(e) => setNewFrequency(e.target.value as Frequency)}
            className="h-9 rounded-sm border border-border bg-background px-3 text-sm"
          >
            <option value="WEEKLY">Weekly</option>
            <option value="BIWEEKLY">Bi-weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
          <Button
            onClick={() =>
              run(() => upgradePlanAction(token, { planId, newFrequency }))
            }
            disabled={pending || newFrequency === frequency}
            className="h-9 rounded-full bg-forest px-5 text-xs text-white hover:opacity-90"
          >
            Update
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
