import "server-only";

import { prisma } from "@/lib/prisma";
import type { UpdateHomeAccessInput } from "@/schemas/client";

export const updateHomeAccess = (
  clientId: string,
  data: UpdateHomeAccessInput,
) =>
  prisma.client.update({
    where: { id: clientId },
    data: {
      entryMethod: data.entryMethod,
      accessNotes: data.accessNotes,
      alarmCode: data.alarmCode,
      petInfo: data.petInfo,
      specialInstructions: data.specialInstructions,
    },
  });
