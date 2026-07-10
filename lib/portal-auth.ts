import "server-only";

import { prisma } from "@/lib/prisma";

export const requirePortalClient = (token: string) =>
  prisma.client.findUnique({ where: { portalToken: token } });

export const assertOwnsVisit = async (visitId: string, clientId: string) => {
  const visit = await prisma.visit.findUnique({
    where: { id: visitId },
    select: { clientId: true },
  });
  if (!visit || visit.clientId !== clientId) {
    throw new Error("Visit not found");
  }
};

export const assertOwnsPlan = async (planId: string, clientId: string) => {
  const plan = await prisma.plan.findUnique({
    where: { id: planId },
    select: { clientId: true },
  });
  if (!plan || plan.clientId !== clientId) {
    throw new Error("Plan not found");
  }
};
