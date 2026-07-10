"use server";

import { revalidatePath } from "next/cache";
import {
  pausePlanSchema,
  resumePlanSchema,
  upgradePlanSchema,
  cancelPlanSchema,
} from "@/schemas/plan";
import { requirePortalClient, assertOwnsPlan } from "@/lib/portal-auth";
import { pausePlan, resumePlan, upgradePlan, cancelPlan } from "@/lib/plan";
import type { ActionResult } from "@/types/action-result";

const revalidatePortal = (token: string) => {
  revalidatePath(`/my/${token}`);
  revalidatePath(`/my/${token}/plan`);
  revalidatePath(`/my/${token}/schedule`);
};

const runPlanMutation = async (
  token: string,
  planId: string,
  run: () => Promise<unknown>,
): Promise<ActionResult<{ planId: string }>> => {
  const client = await requirePortalClient(token);
  if (!client) return { ok: false, error: "We couldn't find your portal." };

  try {
    await assertOwnsPlan(planId, client.id);
    await run();
    revalidatePortal(token);
    return { ok: true, data: { planId } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

const invalidInput = (
  issues: Record<string, string[] | undefined>,
): ActionResult<{ planId: string }> => ({
  ok: false,
  error: "Invalid input",
  issues,
});

export const pausePlanAction = async (token: string, input: unknown) => {
  const parsed = pausePlanSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error.flatten().fieldErrors);
  return runPlanMutation(token, parsed.data.planId, () =>
    pausePlan(parsed.data.planId, parsed.data.resumeDate),
  );
};

export const resumePlanAction = async (token: string, input: unknown) => {
  const parsed = resumePlanSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error.flatten().fieldErrors);
  return runPlanMutation(token, parsed.data.planId, () =>
    resumePlan(parsed.data.planId),
  );
};

export const upgradePlanAction = async (token: string, input: unknown) => {
  const parsed = upgradePlanSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error.flatten().fieldErrors);
  return runPlanMutation(token, parsed.data.planId, () =>
    upgradePlan(parsed.data.planId, parsed.data.newFrequency),
  );
};

export const cancelPlanAction = async (token: string, input: unknown) => {
  const parsed = cancelPlanSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error.flatten().fieldErrors);
  return runPlanMutation(token, parsed.data.planId, () =>
    cancelPlan(parsed.data.planId, parsed.data.reason),
  );
};
