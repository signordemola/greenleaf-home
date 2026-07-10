import { z } from "zod";

export const pausePlanSchema = z.object({
  planId: z.string().min(1),
  resumeDate: z.coerce.date().optional(),
});

export const resumePlanSchema = z.object({
  planId: z.string().min(1),
});

export const upgradePlanSchema = z.object({
  planId: z.string().min(1),
  newFrequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"]),
});

export const cancelPlanSchema = z.object({
  planId: z.string().min(1),
  reason: z.string().trim().max(300).optional(),
});

export type PausePlanInput = z.infer<typeof pausePlanSchema>;
export type ResumePlanInput = z.infer<typeof resumePlanSchema>;
export type UpgradePlanInput = z.infer<typeof upgradePlanSchema>;
export type CancelPlanInput = z.infer<typeof cancelPlanSchema>;
