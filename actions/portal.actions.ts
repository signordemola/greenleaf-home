"use server";

import { revalidatePath } from "next/cache";
import {
  rescheduleVisitSchema,
  skipVisitSchema,
  rateVisitSchema,
} from "@/schemas/portal";
import { requirePortalClient, assertOwnsVisit } from "@/lib/portal-auth";
import { rescheduleVisit, skipVisit, rateVisit } from "@/lib/visit";
import type { ActionResult } from "@/types/action-result";

const revalidatePortal = (token: string) => {
  revalidatePath(`/my/${token}`);
  revalidatePath(`/my/${token}/schedule`);
  revalidatePath(`/my/${token}/history`);
};

export const rescheduleVisitAction = async (
  token: string,
  input: unknown,
): Promise<ActionResult<{ visitId: string }>> => {
  const client = await requirePortalClient(token);
  if (!client) return { ok: false, error: "We couldn't find your portal." };

  const parsed = rescheduleVisitSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid input",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await assertOwnsVisit(parsed.data.visitId, client.id);
    await rescheduleVisit(parsed.data.visitId, parsed.data.newDate);
    revalidatePortal(token);
    return { ok: true, data: { visitId: parsed.data.visitId } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const skipVisitAction = async (
  token: string,
  input: unknown,
): Promise<ActionResult<{ visitId: string; fee: number }>> => {
  const client = await requirePortalClient(token);
  if (!client) return { ok: false, error: "We couldn't find your portal." };

  const parsed = skipVisitSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid input",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await assertOwnsVisit(parsed.data.visitId, client.id);
    const { fee } = await skipVisit(parsed.data.visitId, parsed.data.reason);
    revalidatePortal(token);
    return { ok: true, data: { visitId: parsed.data.visitId, fee } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const rateVisitAction = async (
  token: string,
  input: unknown,
): Promise<ActionResult<{ visitId: string }>> => {
  const client = await requirePortalClient(token);
  if (!client) return { ok: false, error: "We couldn't find your portal." };

  const parsed = rateVisitSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid input",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await assertOwnsVisit(parsed.data.visitId, client.id);
    await rateVisit(
      parsed.data.visitId,
      client.id,
      parsed.data.score,
      parsed.data.comment,
    );
    revalidatePortal(token);
    return { ok: true, data: { visitId: parsed.data.visitId } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
