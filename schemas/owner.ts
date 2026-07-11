import { z } from "zod";

export const markJobStatusSchema = z.object({
  visitId: z.string().min(1),
  status: z.enum(["IN_PROGRESS", "COMPLETED"]),
});

export const reassignVisitSchema = z.object({
  visitId: z.string().min(1),
  crewId: z.string().min(1),
});

export type MarkJobStatusInput = z.infer<typeof markJobStatusSchema>;
export type ReassignVisitInput = z.infer<typeof reassignVisitSchema>;
