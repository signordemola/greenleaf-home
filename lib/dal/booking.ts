import { prisma } from "@/lib/prisma";
import { calculateQuote } from "@/lib/quote";
import { generatePortalToken } from "@/lib/tokens";
import {
  PLAN_FREQUENCY_DB,
  SERVICE_DB_SLUGS,
  SIZE_ROOMS,
} from "@/lib/booking-constants";
import { BookingInput } from "@/schemas/booking";

export const createBooking = async (
  input: BookingInput,
): Promise<{ portalToken: string }> => {
  const serviceType = await prisma.serviceType.findUnique({
    where: { slug: SERVICE_DB_SLUGS[input.service] },
  });

  if (!serviceType) {
    throw new Error(`Unknown service: ${input.service}`);
  }

  const quote = calculateQuote(
    input.service,
    input.size,
    input.frequency,
    input.addons,
  );
  const rooms = SIZE_ROOMS[input.size];
  const frequency = PLAN_FREQUENCY_DB[input.frequency];
  const startDate = new Date();

  return prisma.$transaction(async (tx) => {
    const client = await tx.client.upsert({
      where: { email: input.email },
      update: {
        name: input.name,
        phone: input.phone,
        address: input.address,
        zipCode: input.zipCode,
        bedrooms: rooms.bedrooms,
        bathrooms: rooms.bathrooms,
      },
      create: {
        email: input.email,
        name: input.name,
        phone: input.phone,
        address: input.address,
        zipCode: input.zipCode,
        bedrooms: rooms.bedrooms,
        bathrooms: rooms.bathrooms,
        portalToken: generatePortalToken(),
      },
    });

    if (frequency === "ONE_TIME") {
      await tx.visit.create({
        data: {
          clientId: client.id,
          serviceTypeId: serviceType.id,
          scheduledDate: startDate,
          servicePrice: quote.basePrice,
          addOnSlugs: input.addons,
          addOnTotal: quote.addonTotal,
          totalPrice: quote.firstVisitTotal,
          ownerNotes: input.notes,
        },
      });
    } else {
      await tx.plan.create({
        data: {
          clientId: client.id,
          serviceTypeId: serviceType.id,
          frequency,
          basePrice: quote.basePrice,
          discountPct: quote.discountPercentage,
          recurringPrice: quote.recurringTotal ?? quote.firstVisitTotal,
          addOnSlugs: input.addons,
          addOnTotal: quote.addonTotal,
          preferredDay: startDate.getDay(),
          startDate,
        },
      });
    }

    return { portalToken: client.portalToken };
  });
};

export const getClientByEmail = (email: string) =>
  prisma.client.findUnique({
    where: { email },
    include: { plans: true, visits: true },
  });
