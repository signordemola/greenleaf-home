export type ServiceTypeSlug = "standard" | "deep" | "moveout";
export type HomeSize = "small" | "medium" | "large";
export type PlanFrequency = "weekly" | "biweekly" | "monthly" | "once";

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface QuoteBreakdown {
  basePrice: number;
  addonTotal: number;
  discountPercentage: number;
  firstVisitTotal: number;
  recurringTotal: number | null;
}
