import { z } from "zod";

export const rescheduleVisitSchema = z.object({
  visitId: z.string().min(1),
  newDate: z.coerce.date().refine((date) => date.getTime() > Date.now(), {
    message: "Pick a future date",
  }),
});

export const skipVisitSchema = z.object({
  visitId: z.string().min(1),
  reason: z.string().trim().max(300).optional(),
});

export const rateVisitSchema = z.object({
  visitId: z.string().min(1),
  score: z.number().int().min(1).max(5),
  comment: z.string().trim().max(500).optional(),
});

export type RescheduleVisitInput = z.infer<typeof rescheduleVisitSchema>;
export type SkipVisitInput = z.infer<typeof skipVisitSchema>;
export type RateVisitInput = z.infer<typeof rateVisitSchema>;
