"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/book", label: "Services" },
  { href: "/#studio", label: "Studio" },
  { href: "/login", label: "Dashboard" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "transition-colors hover:text-foreground",
                pathname === n.href && "text-foreground",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className="hidden h-10 items-center rounded-full bg-forest px-5 text-sm font-medium text-forest-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Get your quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            {open ? (
              <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
            ) : (
              <HugeiconsIcon icon={Menu01Icon} className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-[88rem] flex-col px-4 py-3 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-foreground/80 hover:text-forest"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-forest text-sm font-medium text-forest-foreground"
            >
              Get your quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
