import "server-only";

import { prisma } from "@/lib/prisma";

const HOURS_48 = 48 * 60 * 60 * 1000;
const HOURS_24 = 24 * 60 * 60 * 1000;

export const hoursUntil = (date: Date) => date.getTime() - Date.now();

export const rescheduleVisit = async (visitId: string, newDate: Date) => {
  const visit = await prisma.visit.findUniqueOrThrow({
    where: { id: visitId },
  });
  if (visit.status !== "SCHEDULED" && visit.status !== "CONFIRMED") {
    throw new Error("Only upcoming visits can be rescheduled");
  }
  if (hoursUntil(visit.scheduledDate) < HOURS_48) {
    throw new Error("Reschedule at least 48 hours ahead");
  }
  return prisma.visit.update({
    where: { id: visitId },
    data: { scheduledDate: newDate, status: "SCHEDULED" },
  });
};

export const skipVisit = async (visitId: string, reason?: string) => {
  const visit = await prisma.visit.findUniqueOrThrow({
    where: { id: visitId },
  });
  if (visit.status !== "SCHEDULED" && visit.status !== "CONFIRMED") {
    throw new Error("Only upcoming visits can be skipped");
  }

  const remaining = hoursUntil(visit.scheduledDate);
  const feeRatio = remaining >= HOURS_48 ? 0 : remaining >= HOURS_24 ? 0.5 : 1;
  const fee = Math.round(visit.totalPrice * feeRatio);

  const updated = await prisma.visit.update({
    where: { id: visitId },
    data: {
      status: "SKIPPED",
      skipReason: reason,
      paymentStatus: fee > 0 ? "PENDING" : "WAIVED",
    },
  });

  return { visit: updated, fee };
};

export const rateVisit = async (
  visitId: string,
  clientId: string,
  score: number,
  comment?: string,
) => {
  const visit = await prisma.visit.findUniqueOrThrow({
    where: { id: visitId },
    include: { rating: true },
  });
  if (visit.status !== "COMPLETED") {
    throw new Error("Only completed visits can be rated");
  }
  if (visit.rating) {
    throw new Error("This visit has already been rated");
  }

  return prisma.rating.create({
    data: { visitId, clientId, score, comment },
  });
};
