"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const PortalNav = ({ token }: { token: string }) => {
  const pathname = usePathname();
  const base = `/my/${token}`;

  const items = [
    { href: base, label: "Overview" },
    { href: `${base}/schedule`, label: "Schedule" },
    { href: `${base}/plan`, label: "Plan" },
    { href: `${base}/history`, label: "History" },
    { href: `${base}/home`, label: "Home" },
    { href: `${base}/billing`, label: "Billing" },
  ];

  return (
    <nav className="flex flex-wrap gap-1 border-b border-border/60">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-t-sm px-4 py-3 text-sm transition-colors",
              active
                ? "border-b-2 border-forest font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
