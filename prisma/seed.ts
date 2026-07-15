import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { subWeeks, startOfDay, isBefore, subDays } from "date-fns";
import { PrismaClient } from "@/generated/prisma/client";
import { generateVisitDates } from "@/lib/visit-dates";
import { generatePortalToken } from "@/lib/tokens";
import { auth } from "../lib/auth";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const ADDON_PRICES: Record<string, number> = {
  "inside-fridge": 2500,
  "inside-oven": 3000,
  "interior-windows": 3500,
  laundry: 2000,
  "garage-sweep": 4000,
  "patio-balcony": 3000,
};

const STANDARD_TIER_PRICE: Record<string, number> = {
  small: 13000,
  medium: 17000,
  large: 21000,
};

const DISCOUNT_PCT: Record<string, number> = {
  WEEKLY: 15,
  BIWEEKLY: 10,
  MONTHLY: 5,
  ONE_TIME: 0,
};

const sizeKey = (bedrooms: number) =>
  bedrooms <= 2 ? "small" : bedrooms === 3 ? "medium" : "large";

const addOnTotal = (slugs: string[]) =>
  slugs.reduce((sum, slug) => sum + (ADDON_PRICES[slug] ?? 0), 0);

const clean = async () => {
  await prisma.rating.deleteMany();
  await prisma.visit.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.client.deleteMany();
  await prisma.cleaner.deleteMany();
  await prisma.crewAvailability.deleteMany();
  await prisma.crew.deleteMany();
  await prisma.pricingTier.deleteMany();
  await prisma.serviceType.deleteMany();
  await prisma.addOn.deleteMany();
  await prisma.frequencyDiscount.deleteMany();
  await prisma.serviceArea.deleteMany();
  await prisma.blockedDate.deleteMany();
};

const main = async () => {
  await clean();

  await prisma.frequencyDiscount.createMany({
    data: [
      { frequency: "WEEKLY", percentage: 15 },
      { frequency: "BIWEEKLY", percentage: 10 },
      { frequency: "MONTHLY", percentage: 5 },
    ],
  });

  const standard = await prisma.serviceType.create({
    data: {
      slug: "standard-clean",
      name: "Standard Clean",
      description: "Keep your home consistently fresh.",
      displayOrder: 1,
      tiers: {
        create: [
          {
            label: "1–2 BR / 1 BA",
            bedrooms: 2,
            bathrooms: 1,
            basePrice: 13000,
          },
          { label: "3 BR / 2 BA", bedrooms: 3, bathrooms: 2, basePrice: 17000 },
          {
            label: "4+ BR / 3+ BA",
            bedrooms: 4,
            bathrooms: 3,
            basePrice: 21000,
          },
        ],
      },
    },
  });

  await prisma.serviceType.create({
    data: {
      slug: "deep-clean",
      name: "Deep Clean",
      description: "A thorough top-to-bottom scrub.",
      displayOrder: 2,
      tiers: {
        create: [
          {
            label: "1–2 BR / 1 BA",
            bedrooms: 2,
            bathrooms: 1,
            basePrice: 22000,
          },
          { label: "3 BR / 2 BA", bedrooms: 3, bathrooms: 2, basePrice: 29000 },
          {
            label: "4+ BR / 3+ BA",
            bedrooms: 4,
            bathrooms: 3,
            basePrice: 36000,
          },
        ],
      },
    },
  });

  await prisma.serviceType.create({
    data: {
      slug: "move-in-out",
      name: "Move-In / Move-Out",
      description: "Prepare a home for a fresh start.",
      displayOrder: 3,
      tiers: {
        create: [
          {
            label: "1–2 BR / 1 BA",
            bedrooms: 2,
            bathrooms: 1,
            basePrice: 28000,
          },
          { label: "3 BR / 2 BA", bedrooms: 3, bathrooms: 2, basePrice: 35000 },
          {
            label: "4+ BR / 3+ BA",
            bedrooms: 4,
            bathrooms: 3,
            basePrice: 43000,
          },
        ],
      },
    },
  });

  await prisma.addOn.createMany({
    data: [
      {
        slug: "inside-fridge",
        name: "Inside Refrigerator",
        price: 2500,
        displayOrder: 1,
      },
      {
        slug: "inside-oven",
        name: "Inside Oven",
        price: 3000,
        displayOrder: 2,
      },
      {
        slug: "interior-windows",
        name: "Interior Windows",
        price: 3500,
        displayOrder: 3,
      },
      {
        slug: "laundry",
        name: "Laundry (Wash + Fold)",
        price: 2000,
        displayOrder: 4,
      },
      {
        slug: "garage-sweep",
        name: "Garage Sweep",
        price: 4000,
        displayOrder: 5,
      },
      {
        slug: "patio-balcony",
        name: "Patio / Balcony",
        price: 3000,
        displayOrder: 6,
      },
    ],
  });

  await prisma.serviceArea.createMany({
    data: [
      { zipCode: "78702", name: "East Austin" },
      { zipCode: "78723", name: "Mueller" },
      { zipCode: "78704", name: "South Lamar" },
      { zipCode: "78745", name: "South Austin" },
      { zipCode: "78741", name: "Riverside" },
      { zipCode: "78751", name: "Hyde Park" },
      { zipCode: "78721", name: "East MLK" },
      { zipCode: "78722", name: "Cherrywood" },
    ],
  });

  const blockedDates = [new Date("2026-11-27"), new Date("2026-12-25")];
  await prisma.blockedDate.createMany({
    data: [
      { date: blockedDates[0], reason: "Thanksgiving" },
      { date: blockedDates[1], reason: "Christmas" },
    ],
  });

  const crewNames = ["Crew A", "Crew B", "Crew C"];
  const cleanerNames = [
    ["Elena Ramirez", "Marcus Tran"],
    ["Sofia Gomez", "David Lee"],
    ["Maria Robles", "Janelle Whitmore"],
  ];

  const crews = [];
  for (let i = 0; i < crewNames.length; i++) {
    const crew = await prisma.crew.create({
      data: {
        name: crewNames[i],
        cleaners: {
          create: cleanerNames[i].map((name, idx) => ({
            name,
            phone: `512-555-01${i}${idx}`,
          })),
        },
      },
      include: { cleaners: true },
    });
    await prisma.crewAvailability.createMany({
      data: [1, 2, 3, 4, 5].map((dayOfWeek) => ({
        crewId: crew.id,
        dayOfWeek,
        startTime: "08:00",
        endTime: "17:00",
        maxJobs: 4,
      })),
    });
    crews.push(crew);
  }

  const today = startOfDay(new Date());
  const comments = [
    "Spotless as always — thank you!",
    "The team is so careful with our things.",
    "Kitchen has never looked better.",
    "Reliable and friendly every time.",
    "Loved coming home to this.",
  ];

  type PlanSpec = {
    name: string;
    email: string;
    address: string;
    zip: string;
    bedrooms: number;
    bathrooms: number;
    frequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY";
    preferredDay: number;
    timeWindow: string;
    crewIdx: number;
    addOns: string[];
    status: "ACTIVE" | "PAUSED" | "CANCELLED";
    weeksAgo: number;
    preferredCleaner?: boolean;
  };

  const planSpecs: PlanSpec[] = [
    {
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      address: "123 Maple St",
      zip: "78702",
      bedrooms: 3,
      bathrooms: 2,
      frequency: "BIWEEKLY",
      preferredDay: 5,
      timeWindow: "morning",
      crewIdx: 0,
      addOns: ["inside-fridge"],
      status: "ACTIVE",
      weeksAgo: 12,
      preferredCleaner: true,
    },
    {
      name: "Devon Lee",
      email: "devon@example.com",
      address: "88 Cherrywood Rd",
      zip: "78722",
      bedrooms: 2,
      bathrooms: 1,
      frequency: "WEEKLY",
      preferredDay: 2,
      timeWindow: "morning",
      crewIdx: 1,
      addOns: [],
      status: "ACTIVE",
      weeksAgo: 6,
    },
    {
      name: "Priya Mehta",
      email: "priya@example.com",
      address: "410 Mueller Blvd",
      zip: "78723",
      bedrooms: 4,
      bathrooms: 3,
      frequency: "WEEKLY",
      preferredDay: 4,
      timeWindow: "afternoon",
      crewIdx: 2,
      addOns: ["interior-windows", "laundry"],
      status: "ACTIVE",
      weeksAgo: 7,
      preferredCleaner: true,
    },
    {
      name: "Tomas Alvarez",
      email: "tomas@example.com",
      address: "9 South Lamar Ct",
      zip: "78704",
      bedrooms: 3,
      bathrooms: 2,
      frequency: "MONTHLY",
      preferredDay: 3,
      timeWindow: "morning",
      crewIdx: 0,
      addOns: ["inside-oven"],
      status: "ACTIVE",
      weeksAgo: 20,
    },
    {
      name: "Hannah Cole",
      email: "hannah@example.com",
      address: "77 Hyde Park Ave",
      zip: "78751",
      bedrooms: 2,
      bathrooms: 1,
      frequency: "BIWEEKLY",
      preferredDay: 1,
      timeWindow: "afternoon",
      crewIdx: 1,
      addOns: [],
      status: "PAUSED",
      weeksAgo: 14,
    },
    {
      name: "Reggie Nash",
      email: "reggie@example.com",
      address: "202 Riverside Dr",
      zip: "78741",
      bedrooms: 4,
      bathrooms: 3,
      frequency: "BIWEEKLY",
      preferredDay: 4,
      timeWindow: "morning",
      crewIdx: 2,
      addOns: ["garage-sweep"],
      status: "CANCELLED",
      weeksAgo: 24,
    },
  ];

  let ratingsCreated = 0;
  const maxRatings = 15;
  const portalLinks: { name: string; token: string }[] = [];
  let scheduledTodayCount = 0;

  for (const [idx, spec] of planSpecs.entries()) {
    const crew = crews[spec.crewIdx];
    const portalToken = generatePortalToken();
    portalLinks.push({ name: spec.name, token: portalToken });
    const preferredCleanerId = spec.preferredCleaner
      ? crew.cleaners[0].id
      : null;
    const basePrice = STANDARD_TIER_PRICE[sizeKey(spec.bedrooms)];
    const discountPct = DISCOUNT_PCT[spec.frequency];
    const recurringPrice = Math.round(basePrice * (1 - discountPct / 100));
    const addOns = spec.addOns;
    const extras = addOnTotal(addOns);
    const startDate = subWeeks(today, spec.weeksAgo);

    const client = await prisma.client.create({
      data: {
        name: spec.name,
        email: spec.email,
        phone: `512-555-${9010 + idx}`,
        portalToken,
        address: spec.address,
        zipCode: spec.zip,
        bedrooms: spec.bedrooms,
        bathrooms: spec.bathrooms,
        squareFeet: 1200 + spec.bedrooms * 400,
        preferredCleanerId,
        accessNotes: "Side gate is unlocked. Please text on arrival.",
        petInfo: spec.crewIdx === 1 ? "One friendly dog, Biscuit." : null,
      },
    });

    const plan = await prisma.plan.create({
      data: {
        clientId: client.id,
        serviceTypeId: standard.id,
        frequency: spec.frequency,
        status: spec.status,
        basePrice,
        discountPct,
        recurringPrice,
        addOnSlugs: addOns,
        addOnTotal: extras,
        preferredDay: spec.preferredDay,
        timeWindow: spec.timeWindow,
        startDate,
        assignedCrewId: crew.id,
        pausedAt: spec.status === "PAUSED" ? subDays(today, 6) : null,
        resumeDate: spec.status === "PAUSED" ? subWeeks(today, -3) : null,
        cancelledAt: spec.status === "CANCELLED" ? subDays(today, 10) : null,
        cancellationReason:
          spec.status === "CANCELLED" ? "Moved out of service area" : null,
      },
    });

    const dates = generateVisitDates({
      startDate,
      frequency: spec.frequency,
      count: 12,
      preferredDay: spec.preferredDay,
      blockedDates,
    });

    let perPlanRatings = 0;
    for (let i = 0; i < dates.length; i++) {
      const scheduledDate = dates[i];
      const isPast = isBefore(scheduledDate, today);

      if (!isPast && spec.status !== "ACTIVE") continue;

      const isSkipped =
        spec.frequency === "WEEKLY" && spec.crewIdx === 1 && i === 2;
      const status = isSkipped ? "SKIPPED" : isPast ? "COMPLETED" : "SCHEDULED";

      const visit = await prisma.visit.create({
        data: {
          planId: plan.id,
          clientId: client.id,
          serviceTypeId: standard.id,
          crewId: crew.id,
          scheduledDate,
          timeWindow: spec.timeWindow,
          status,
          servicePrice: recurringPrice,
          addOnSlugs: addOns,
          addOnTotal: extras,
          totalPrice: recurringPrice + extras,
          paymentStatus:
            status === "COMPLETED"
              ? "CHARGED"
              : status === "SKIPPED"
                ? "WAIVED"
                : "PENDING",
          arrivedAt: status === "COMPLETED" ? scheduledDate : null,
          completedAt: status === "COMPLETED" ? scheduledDate : null,
          paidAt: status === "COMPLETED" ? scheduledDate : null,
          skipReason: isSkipped ? "Out of town" : null,
        },
      });

      if (
        status === "COMPLETED" &&
        perPlanRatings < 3 &&
        ratingsCreated < maxRatings
      ) {
        await prisma.rating.create({
          data: {
            visitId: visit.id,
            clientId: client.id,
            score: perPlanRatings === 0 ? 5 : 4,
            comment:
              perPlanRatings === 0
                ? comments[ratingsCreated % comments.length]
                : null,
          },
        });
        perPlanRatings++;
        ratingsCreated++;
      }
    }

    if (spec.status === "ACTIVE") {
      const nextVisit = await prisma.visit.findFirst({
        where: { planId: plan.id, status: "SCHEDULED" },
        orderBy: { scheduledDate: "asc" },
      });
      if (nextVisit) {
        const scheduleForToday = scheduledTodayCount < 3;
        if (scheduleForToday) {
          await prisma.visit.update({
            where: { id: nextVisit.id },
            data: { scheduledDate: today },
          });
          scheduledTodayCount++;
        }
        await prisma.plan.update({
          where: { id: plan.id },
          data: {
            nextVisitDate: scheduleForToday ? today : nextVisit.scheduledDate,
          },
        });
      }
    }
  }

  const graceToken = generatePortalToken();
  portalLinks.push({ name: "Grace Okafor", token: graceToken });
  await prisma.client.create({
    data: {
      name: "Grace Okafor",
      email: "grace@example.com",
      phone: "512-555-9100",
      portalToken: graceToken,
      address: "515 East MLK Blvd",
      zipCode: "78721",
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 950,
      visits: {
        create: {
          serviceTypeId: standard.id,
          scheduledDate: subWeeks(today, -1),
          timeWindow: "morning",
          servicePrice: 22000,
          addOnSlugs: [],
          addOnTotal: 0,
          totalPrice: 22000,
          crewId: crews[0].id,
        },
      },
    },
  });

  try {
    await auth.api.signUpEmail({
      body: {
        email: "maya@greenleafhome.co",
        password: "password123",
        name: "Maya Torres",
      },
    });
  } catch {
    console.log("Owner already exists or error seeding auth user");
  }

  console.log(`Seed complete — ${ratingsCreated} ratings created.`);
  console.log("\nClient portal links:");
  for (const link of portalLinks) {
    console.log(`  ${link.name.padEnd(16)} /my/${link.token}`);
  }
  console.log("\nOwner login: maya@greenleafhome.co / password123");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
