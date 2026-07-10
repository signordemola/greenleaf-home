import { addMonths, addWeeks, isBefore, setDay, startOfDay } from "date-fns";
import type { PlanFrequency } from "@/generated/prisma/enums";

export const stepVisitDate = (date: Date, frequency: PlanFrequency) => {
  if (frequency === "WEEKLY") return addWeeks(date, 1);
  if (frequency === "BIWEEKLY") return addWeeks(date, 2);
  return addMonths(date, 1);
};

export const alignToPreferredDay = (from: Date, preferredDay: number) => {
  const aligned = setDay(startOfDay(from), preferredDay);
  return isBefore(aligned, startOfDay(from)) ? addWeeks(aligned, 1) : aligned;
};

export const generateVisitDates = ({
  startDate,
  frequency,
  count,
  preferredDay,
  blockedDates,
}: {
  startDate: Date;
  frequency: PlanFrequency;
  count: number;
  preferredDay: number;
  blockedDates: Date[];
}): Date[] => {
  const blocked = new Set(
    blockedDates.map((date) => startOfDay(date).getTime()),
  );
  const dates: Date[] = [];
  let cursor = alignToPreferredDay(startDate, preferredDay);

  while (dates.length < count) {
    let candidate = cursor;
    while (blocked.has(startOfDay(candidate).getTime())) {
      candidate = addWeeks(candidate, 1);
    }
    dates.push(candidate);
    cursor = stepVisitDate(candidate, frequency);
  }

  return dates;
};
