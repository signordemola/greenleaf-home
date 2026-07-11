"use client";

import { Button } from "@/components/ui/button";

const AppError = ({ reset }: { error: Error; reset: () => void }) => (
  <div className="rounded-sm border border-border bg-background p-10 text-center">
    <h2 className="font-display text-2xl">Something went wrong.</h2>
    <p className="mt-3 text-muted-foreground">
      We couldn&apos;t load this view.
    </p>
    <Button
      onClick={reset}
      className="mt-6 rounded-full bg-forest text-white hover:opacity-90"
    >
      Try again
    </Button>
  </div>
);

export default AppError;
