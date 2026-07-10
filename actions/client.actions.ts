"use server";

import { revalidatePath } from "next/cache";
import { updateHomeAccessSchema } from "@/schemas/client";
import { requirePortalClient } from "@/lib/portal-auth";
import { updateHomeAccess } from "@/lib/client";
import type { ActionResult } from "@/types/action-result";

export const updateHomeAccessAction = async (
  token: string,
  input: unknown,
): Promise<ActionResult<{ ok: true }>> => {
  const client = await requirePortalClient(token);
  if (!client) return { ok: false, error: "We couldn't find your portal." };

  const parsed = updateHomeAccessSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid input",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateHomeAccess(client.id, parsed.data);
    revalidatePath(`/my/${token}/home`);
    return { ok: true, data: { ok: true } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
