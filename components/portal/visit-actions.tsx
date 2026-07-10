"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  rescheduleVisitAction,
  skipVisitAction,
} from "@/actions/portal.actions";

export const VisitActions = ({
  token,
  visitId,
}: {
  token: string;
  visitId: string;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [mode, setMode] = useState<"idle" | "reschedule">("idle");
  const [newDate, setNewDate] = useState("");
  const [error, setError] = useState("");

  const onReschedule = () =>
    startTransition(async () => {
      setError("");
      const result = await rescheduleVisitAction(token, { visitId, newDate });
      if (result.ok) {
        setMode("idle");
        router.refresh();
      } else {
        setError(result.error);
      }
    });

  const onSkip = () =>
    startTransition(async () => {
      setError("");
      const result = await skipVisitAction(token, { visitId });
      if (result.ok) {
        router.refresh();
      } else {
        setError(result.error);
      }
    });

  return (
    <div className="mt-3 space-y-2">
      {mode === "idle" ? (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setMode("reschedule")}
            disabled={pending}
            className="h-8 rounded-full px-4 text-xs"
          >
            Reschedule
          </Button>
          <Button
            variant="ghost"
            onClick={onSkip}
            disabled={pending}
            className="h-8 rounded-full px-4 text-xs text-muted-foreground"
          >
            Skip
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="h-9 w-40 rounded-sm"
          />
          <Button
            onClick={onReschedule}
            disabled={pending || !newDate}
            className="h-9 rounded-full bg-forest px-4 text-xs text-white hover:opacity-90"
          >
            {pending ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setMode("idle")}
            disabled={pending}
            className="h-9 rounded-full px-4 text-xs"
          >
            Cancel
          </Button>
        </div>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
