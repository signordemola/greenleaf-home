"use client";

import { useTransition } from "react";
import { logoutAction } from "@/actions/auth.actions";

export const LogoutButton = () => {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      onClick={() => startTransition(() => logoutAction())}
      disabled={pending}
      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      {pending ? "Signing out..." : "Sign out"}
    </button>
  );
};
