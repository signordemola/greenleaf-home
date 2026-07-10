import { z } from "zod";

export const updateHomeAccessSchema = z.object({
  entryMethod: z.string().trim().max(120).optional(),
  accessNotes: z.string().trim().max(500).optional(),
  alarmCode: z.string().trim().max(60).optional(),
  petInfo: z.string().trim().max(300).optional(),
  specialInstructions: z.string().trim().max(500).optional(),
});

export type UpdateHomeAccessInput = z.infer<typeof updateHomeAccessSchema>;
