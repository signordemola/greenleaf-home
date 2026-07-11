"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema } from "@/schemas/auth";
import { auth } from "@/lib/auth";
import type { ActionResult } from "@/types/action-result";

export const loginAction = async (
  input: unknown,
): Promise<ActionResult<never>> => {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid input",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await auth.api.signInEmail({
      body: { email: parsed.data.email, password: parsed.data.password },
      headers: await headers(),
    });
  } catch {
    return { ok: false, error: "Invalid email or password." };
  }

  redirect("/dashboard");
};

export const logoutAction = async () => {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
};
