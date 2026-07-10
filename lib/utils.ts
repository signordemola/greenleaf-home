import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatInTimeZone } from "date-fns-tz";

export const TIME_ZONE = "America/Chicago";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDate = (date: Date) =>
  formatInTimeZone(date, TIME_ZONE, "EEEE, MMMM d, yyyy");

export const formatShortDate = (date: Date) =>
  formatInTimeZone(date, TIME_ZONE, "MMM d, yyyy");

export const formatTime = (date: Date) =>
  formatInTimeZone(date, TIME_ZONE, "h:mm a");

export const getTimeWindowLabel = (window: string) =>
  window === "afternoon" ? "12:00 PM – 5:00 PM" : "8:00 AM – 12:00 PM";

export const formatUsd = (cents: number) =>
  (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
