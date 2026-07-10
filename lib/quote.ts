import {
  HomeSize,
  PlanFrequency,
  QuoteBreakdown,
  ServiceTypeSlug,
} from "@/types/booking";
import {
  ADDONS,
  FREQUENCY_DISCOUNTS,
  SERVICE_PRICES,
} from "@/lib/booking-constants";

export const calculateQuote = (
  service: ServiceTypeSlug,
  size: HomeSize,
  frequency: PlanFrequency,
  selectedAddonIds: string[],
): QuoteBreakdown => {
  const basePrice = SERVICE_PRICES[service][size];
  const addonTotal = ADDONS.filter((addon) =>
    selectedAddonIds.includes(addon.id),
  ).reduce((sum, addon) => sum + addon.price, 0);

  const discount = FREQUENCY_DISCOUNTS[frequency];
  const firstVisitTotal = basePrice + addonTotal;

  const recurringTotal =
    service === "standard" && frequency !== "once"
      ? Math.round(basePrice * (1 - discount)) + addonTotal
      : null;

  return {
    basePrice,
    addonTotal,
    discountPercentage: Math.round(discount * 100),
    firstVisitTotal,
    recurringTotal,
  };
};
