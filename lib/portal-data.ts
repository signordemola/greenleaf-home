import { cache } from "react";
import { getClientByPortalToken } from "@/lib/dal";

export const loadPortalClient = cache((token: string) =>
  getClientByPortalToken(token),
);

export type PortalClient = NonNullable<
  Awaited<ReturnType<typeof loadPortalClient>>
>;
