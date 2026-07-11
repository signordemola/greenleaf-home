"use server";

import { revalidatePath } from "next/cache";
import { markJobStatusSchema, reassignVisitSchema } from "@/schemas/owner";
import { requireOwner } from "@/lib/dal";
import { markJobStatus } from "@/lib/visit";
import { reassignVisit } from "@/lib/assignment";
import type { ActionResult } from "@/types/action-result";

export const markJobStatusAction = async (
  input: unknown,
): Promise<ActionResult<{ visitId: string }>> => {
  await requireOwner();

  const parsed = markJobStatusSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid input",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await markJobStatus(parsed.data.visitId, parsed.data.status);
    revalidatePath("/dashboard");
    return { ok: true, data: { visitId: parsed.data.visitId } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const reassignVisitAction = async (
  input: unknown,
): Promise<ActionResult<{ visitId: string }>> => {
  await requireOwner();

  const parsed = reassignVisitSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid input",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await reassignVisit(parsed.data.visitId, parsed.data.crewId);
    revalidatePath("/dashboard");
    return { ok: true, data: { visitId: parsed.data.visitId } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
