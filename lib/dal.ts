import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getSession = async () =>
  auth.api.getSession({ headers: await headers() });

export const getClientByPortalToken = (token: string) =>
  prisma.client.findUnique({
    where: { portalToken: token },
    include: {
      preferredCleaner: { include: { crew: true } },
      plans: {
        include: {
          serviceType: true,
          assignedCrew: { include: { cleaners: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      visits: {
        include: {
          crew: { include: { cleaners: true } },
          serviceType: true,
          rating: true,
        },
        orderBy: { scheduledDate: "desc" },
      },
    },
  });

export const requireOwner = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
};
