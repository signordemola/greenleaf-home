"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { markJobStatusAction } from "@/actions/owner.actions";

export const JobStatusControls = ({
  visitId,
  status,
}: {
  visitId: string;
  status: string;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const advance = (next: "IN_PROGRESS" | "COMPLETED") =>
    startTransition(async () => {
      setError("");
      const result = await markJobStatusAction({ visitId, status: next });
      if (result.ok) router.refresh();
      else setError(result.error);
    });

  if (status === "COMPLETED") {
    return <span className="text-xs font-medium text-forest">Completed</span>;
  }
  if (status === "SKIPPED" || status === "CANCELLED") {
    return (
      <span className="text-xs text-muted-foreground">
        {status.toLowerCase()}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {status === "IN_PROGRESS" ? (
        <Button
          onClick={() => advance("COMPLETED")}
          disabled={pending}
          className="h-8 rounded-full bg-forest px-4 text-xs text-white hover:opacity-90"
        >
          Mark complete
        </Button>
      ) : (
        <Button
          onClick={() => advance("IN_PROGRESS")}
          disabled={pending}
          variant="outline"
          className="h-8 rounded-full px-4 text-xs"
        >
          Start clean
        </Button>
      )}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
