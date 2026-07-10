"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { rateVisitAction } from "@/actions/portal.actions";

export const RatingForm = ({
  token,
  visitId,
}: {
  token: string;
  visitId: string;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const submit = () =>
    startTransition(async () => {
      setError("");
      const result = await rateVisitAction(token, {
        visitId,
        score,
        comment: comment || undefined,
      });
      if (result.ok) router.refresh();
      else setError(result.error);
    });

  return (
    <div className="mt-3 space-y-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setScore(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className={n <= score ? "text-forest" : "text-border"}
          >
            <span className="text-xl">★</span>
          </button>
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Anything you'd like the crew to know? (optional)"
        rows={2}
        className="rounded-sm text-sm"
      />
      <div className="flex items-center gap-3">
        <Button
          onClick={submit}
          disabled={pending || score === 0}
          className="h-9 rounded-full bg-forest px-5 text-xs text-white hover:opacity-90"
        >
          {pending ? "Sending..." : "Submit rating"}
        </Button>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
};
