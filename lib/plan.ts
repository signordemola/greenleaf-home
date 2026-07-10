import "server-only";

import { addWeeks, startOfDay } from "date-fns";
import { prisma } from "@/lib/prisma";
import { generateVisits } from "@/lib/scheduling";
import type { PlanFrequency, PlanStatus } from "@/generated/prisma/enums";

export const PLAN_TRANSITIONS: Record<PlanStatus, PlanStatus[]> = {
  ACTIVE: ["PAUSED", "CANCELLED"],
  PAUSED: ["ACTIVE", "CANCELLED"],
  CANCELLED: [],
};

export const getMaxPauseDate = () => addWeeks(startOfDay(new Date()), 4);

const assertTransition = (from: PlanStatus, to: PlanStatus) => {
  if (!PLAN_TRANSITIONS[from].includes(to)) {
    throw new Error(`Invalid plan transition: ${from} → ${to}`);
  }
};

const deleteFutureVisits = (planId: string) =>
  prisma.visit.deleteMany({
    where: {
      planId,
      scheduledDate: { gte: startOfDay(new Date()) },
      status: { in: ["SCHEDULED", "CONFIRMED"] },
    },
  });

export const pausePlan = async (planId: string, resumeDate?: Date) => {
  const plan = await prisma.plan.findUniqueOrThrow({ where: { id: planId } });
  assertTransition(plan.status, "PAUSED");

  await deleteFutureVisits(planId);

  return prisma.plan.update({
    where: { id: planId },
    data: {
      status: "PAUSED",
      pausedAt: new Date(),
      resumeDate: resumeDate ?? getMaxPauseDate(),
      nextVisitDate: null,
    },
  });
};

export const resumePlan = async (planId: string) => {
  const plan = await prisma.plan.findUniqueOrThrow({ where: { id: planId } });
  assertTransition(plan.status, "ACTIVE");

  await prisma.plan.update({
    where: { id: planId },
    data: {
      status: "ACTIVE",
      pausedAt: null,
      resumeDate: null,
      nextVisitDate: startOfDay(new Date()),
    },
  });

  await generateVisits(planId);
  return prisma.plan.findUniqueOrThrow({ where: { id: planId } });
};

export const cancelPlan = async (planId: string, reason?: string) => {
  const plan = await prisma.plan.findUniqueOrThrow({ where: { id: planId } });
  assertTransition(plan.status, "CANCELLED");

  await deleteFutureVisits(planId);

  return prisma.plan.update({
    where: { id: planId },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
      cancellationReason: reason,
      nextVisitDate: null,
    },
  });
};

export const upgradePlan = async (
  planId: string,
  newFrequency: PlanFrequency,
) => {
  const plan = await prisma.plan.findUniqueOrThrow({ where: { id: planId } });
  if (plan.status !== "ACTIVE") {
    throw new Error("Only active plans can be changed");
  }

  const discount = await prisma.frequencyDiscount.findUnique({
    where: { frequency: newFrequency },
  });
  const discountPct = discount?.percentage ?? 0;
  const recurringPrice = Math.round(plan.basePrice * (1 - discountPct / 100));

  await deleteFutureVisits(planId);

  await prisma.plan.update({
    where: { id: planId },
    data: {
      frequency: newFrequency,
      discountPct,
      recurringPrice,
      nextVisitDate: startOfDay(new Date()),
    },
  });

  await generateVisits(planId);
  return prisma.plan.findUniqueOrThrow({ where: { id: planId } });
};
