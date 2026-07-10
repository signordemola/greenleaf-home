"use server";

import { bookingSchema } from "@/schemas/booking";
import { createBooking } from "@/lib/dal/booking";
import { ActionResult } from "@/types/action-result";

export const createBookingAction = async (
  input: unknown,
): Promise<ActionResult<{ portalToken: string }>> => {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the details and try again.",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await createBooking(parsed.data);
    return { ok: true, data: result };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
};
