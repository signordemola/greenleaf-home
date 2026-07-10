import {
  AddOn,
  HomeSize,
  PlanFrequency,
  ServiceTypeSlug,
} from "@/types/booking";

export const SIZE_LABELS: Record<HomeSize, string> = {
  small: "1–2 BR · 1 BA",
  medium: "3 BR · 2 BA",
  large: "4+ BR · 3+ BA",
};

export const SERVICE_LABELS: Record<ServiceTypeSlug, string> = {
  standard: "Standard clean",
  deep: "Deep clean",
  moveout: "Move-in / move-out",
};

export const FREQUENCY_LABELS: Record<PlanFrequency, string> = {
  weekly: "Every week",
  biweekly: "Every other week",
  monthly: "Once a month",
  once: "Just once",
};

export const ADDONS: AddOn[] = [
  { id: "inside-fridge", name: "Inside refrigerator", price: 2500 },
  { id: "inside-oven", name: "Inside oven", price: 3000 },
  { id: "interior-windows", name: "Interior windows", price: 3500 },
  { id: "laundry", name: "Laundry · 1 load", price: 2000 },
  { id: "garage-sweep", name: "Garage sweep", price: 4000 },
  { id: "patio-balcony", name: "Patio / balcony", price: 3000 },
];

export const ADDON_IDS = ADDONS.map((addon) => addon.id) as [
  string,
  ...string[],
];

export const SERVICE_PRICES: Record<
  ServiceTypeSlug,
  Record<HomeSize, number>
> = {
  standard: { small: 13000, medium: 17000, large: 21000 },
  deep: { small: 22000, medium: 29000, large: 36000 },
  moveout: { small: 28000, medium: 35000, large: 43000 },
};

export const FREQUENCY_DISCOUNTS: Record<PlanFrequency, number> = {
  weekly: 0.15,
  biweekly: 0.1,
  monthly: 0.05,
  once: 0,
};

export const SERVICE_DB_SLUGS: Record<ServiceTypeSlug, string> = {
  standard: "standard-clean",
  deep: "deep-clean",
  moveout: "move-in-out",
};

export const SIZE_ROOMS: Record<
  HomeSize,
  { bedrooms: number; bathrooms: number }
> = {
  small: { bedrooms: 2, bathrooms: 1 },
  medium: { bedrooms: 3, bathrooms: 2 },
  large: { bedrooms: 4, bathrooms: 3 },
};

export const PLAN_FREQUENCY_DB: Record<
  PlanFrequency,
  "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "ONE_TIME"
> = {
  weekly: "WEEKLY",
  biweekly: "BIWEEKLY",
  monthly: "MONTHLY",
  once: "ONE_TIME",
};
