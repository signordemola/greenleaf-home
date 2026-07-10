import "server-only";

import { prisma } from "@/lib/prisma";

export const assignCrew = async (planId: string) => {
  const plan = await prisma.plan.findUniqueOrThrow({
    where: { id: planId },
    include: { client: true },
  });

  let preferredCrewId: string | null = null;
  if (plan.client.preferredCleanerId) {
    const cleaner = await prisma.cleaner.findUnique({
      where: { id: plan.client.preferredCleanerId },
    });
    preferredCrewId = cleaner?.crewId ?? null;
  }

  const crews = await prisma.crew.findMany({
    where: { isActive: true },
    include: { _count: { select: { plans: true } } },
  });

  if (crews.length === 0) {
    throw new Error("No active crew available");
  }

  const chosen =
    crews.find((crew) => crew.id === preferredCrewId) ??
    [...crews].sort((a, b) => a._count.plans - b._count.plans)[0];

  await prisma.plan.update({
    where: { id: planId },
    data: { assignedCrewId: chosen.id },
  });

  return chosen.id;
};

export const reassignVisit = (visitId: string, newCrewId: string) =>
  prisma.visit.update({
    where: { id: visitId },
    data: { crewId: newCrewId },
  });
