import "server-only";

import { startOfDay } from "date-fns";
import { prisma } from "@/lib/prisma";
import { generateVisitDates } from "@/lib/visit-dates";

const ACTIVE_VISIT_STATUSES = [
  "SCHEDULED",
  "CONFIRMED",
  "IN_PROGRESS",
] as const;

export const getCrewCapacity = async (crewId: string, date: Date) => {
  const availability = await prisma.crewAvailability.findUnique({
    where: { crewId_dayOfWeek: { crewId, dayOfWeek: date.getDay() } },
  });
  const maxJobs = availability?.maxJobs ?? 0;
  const booked = await prisma.visit.count({
    where: {
      crewId,
      scheduledDate: startOfDay(date),
      status: { in: [...ACTIVE_VISIT_STATUSES] },
    },
  });
  return { maxJobs, booked, available: Math.max(maxJobs - booked, 0) };
};

export const isDateAvailable = async (date: Date, crewId: string) => {
  const blocked = await prisma.blockedDate.findFirst({
    where: { date: startOfDay(date) },
  });
  if (blocked) return false;
  const { available } = await getCrewCapacity(crewId, date);
  return available > 0;
};

export const generateVisits = async (planId: string, count = 8) => {
  const plan = await prisma.plan.findUniqueOrThrow({ where: { id: planId } });
  if (plan.frequency === "ONE_TIME" || plan.status !== "ACTIVE") return [];

  const blocked = await prisma.blockedDate.findMany({
    where: { date: { gte: startOfDay(new Date()) } },
  });

  const dates = generateVisitDates({
    startDate: plan.nextVisitDate ?? plan.startDate,
    frequency: plan.frequency,
    count,
    preferredDay: plan.preferredDay,
    blockedDates: blocked.map((entry) => entry.date),
  });

  const totalPrice = plan.recurringPrice + plan.addOnTotal;

  await prisma.$transaction(
    dates.map((scheduledDate) =>
      prisma.visit.create({
        data: {
          planId: plan.id,
          clientId: plan.clientId,
          serviceTypeId: plan.serviceTypeId,
          crewId: plan.assignedCrewId,
          scheduledDate,
          timeWindow: plan.timeWindow,
          servicePrice: plan.recurringPrice,
          addOnSlugs: plan.addOnSlugs,
          addOnTotal: plan.addOnTotal,
          totalPrice,
        },
      }),
    ),
  );

  await prisma.plan.update({
    where: { id: plan.id },
    data: { nextVisitDate: dates[0] },
  });

  return dates;
};
