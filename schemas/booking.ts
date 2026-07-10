import { z } from "zod";
import { ADDON_IDS } from "@/lib/booking-constants";

export const bookingSchema = z.object({
  service: z.enum(["standard", "deep", "moveout"]),
  size: z.enum(["small", "medium", "large"]),
  frequency: z.enum(["weekly", "biweekly", "monthly", "once"]),
  addons: z.array(z.enum(ADDON_IDS)).default([]),
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(7, "Phone is required"),
  address: z.string().trim().min(5, "Address is required"),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Enter a 5-digit ZIP"),
  notes: z.string().trim().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
