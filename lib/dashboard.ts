import "server-only";

import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";
import { prisma } from "@/lib/prisma";

export const getDashboardKpis = async () => {
  const now = new Date();
  const today = startOfDay(now);

  const [revenue, activePlans, cleansToday, rating] = await Promise.all([
    prisma.visit.aggregate({
      _sum: { totalPrice: true },
      where: {
        paymentStatus: "CHARGED",
        paidAt: { gte: startOfMonth(now), lte: endOfMonth(now) },
      },
    }),
    prisma.plan.count({ where: { status: "ACTIVE" } }),
    prisma.visit.count({
      where: {
        scheduledDate: { gte: today, lte: endOfDay(now) },
        status: { in: ["SCHEDULED", "CONFIRMED", "IN_PROGRESS", "COMPLETED"] },
      },
    }),
    prisma.rating.aggregate({ _avg: { score: true } }),
  ]);

  return {
    revenueMtd: revenue._sum.totalPrice ?? 0,
    activePlans,
    cleansToday,
    avgRating: rating._avg.score ?? 0,
  };
};

export const getTodaySchedule = () => {
  const now = new Date();
  return prisma.visit.findMany({
    where: { scheduledDate: { gte: startOfDay(now), lte: endOfDay(now) } },
    include: {
      client: true,
      crew: { include: { cleaners: true } },
      serviceType: true,
    },
    orderBy: [{ timeWindow: "asc" }, { crewId: "asc" }],
  });
};

export const getClientsOverview = () =>
  prisma.client.findMany({
    include: {
      plans: { include: { serviceType: true }, orderBy: { createdAt: "desc" } },
      ratings: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { name: "asc" },
  });

export const getPlansHealth = () =>
  prisma.plan.findMany({
    include: {
      client: { include: { ratings: true } },
      serviceType: true,
      assignedCrew: true,
    },
    orderBy: { createdAt: "desc" },
  });
